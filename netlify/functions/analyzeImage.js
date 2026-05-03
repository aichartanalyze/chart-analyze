const OPENAI_RESPONSES_URL = 'https://api.openai.com/v1/responses';
const DEFAULT_MODEL = 'gpt-4.1-mini';

const responseHeaders = {
    'Content-Type': 'application/json',
};

function jsonResponse(statusCode, body) {
    return {
        statusCode,
        headers: responseHeaders,
        body: JSON.stringify(body),
    };
}

function extractOutputText(data) {
    if (typeof data.output_text === 'string' && data.output_text.trim()) {
        return data.output_text.trim();
    }

    const textParts = [];
    for (const item of data.output || []) {
        for (const content of item.content || []) {
            if (typeof content.text === 'string') {
                textParts.push(content.text);
            }
        }
    }

    return textParts.join('\n').trim();
}

function extractJsonText(text) {
    const trimmed = text.trim();
    const fencedMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
    if (fencedMatch) {
        return fencedMatch[1].trim();
    }

    const firstBrace = trimmed.indexOf('{');
    const lastBrace = trimmed.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace > firstBrace) {
        return trimmed.slice(firstBrace, lastBrace + 1);
    }

    return trimmed;
}

function getLanguageConfig(language) {
    const configs = {
        en: {
            name: 'English',
            fallbackAnalysis: 'Additional confirmation is needed based on the chart image.',
            errors: {
                methodNotAllowed: 'Only POST requests are supported.',
                invalidJson: 'The request body is not valid JSON.',
                missingImage: 'Image data is required for analysis.',
                missingApiKey: 'The OPENAI_API_KEY environment variable is not set.',
                emptyOutput: 'Unable to read the analysis result.',
                serverError: 'A server error occurred while analyzing the image.',
            },
        },
        ko: {
            name: 'Korean',
            fallbackAnalysis: '차트 이미지 기준으로 추가 확인이 필요합니다.',
            errors: {
                methodNotAllowed: 'POST 요청만 지원합니다.',
                invalidJson: '요청 본문이 올바른 JSON이 아닙니다.',
                missingImage: '분석할 이미지 데이터가 필요합니다.',
                missingApiKey: 'OPENAI_API_KEY 환경변수가 설정되어 있지 않습니다.',
                emptyOutput: '분석 결과를 읽을 수 없습니다.',
                serverError: '이미지 분석 중 서버 오류가 발생했습니다.',
            },
        },
        ja: {
            name: 'Japanese',
            fallbackAnalysis: 'チャート画像を基準に追加確認が必要です。',
            errors: {
                methodNotAllowed: 'POSTリクエストのみ対応しています。',
                invalidJson: 'リクエスト本文が正しいJSONではありません。',
                missingImage: '分析する画像データが必要です。',
                missingApiKey: 'OPENAI_API_KEY環境変数が設定されていません。',
                emptyOutput: '分析結果を読み取れません。',
                serverError: '画像分析中にサーバーエラーが発生しました。',
            },
        },
    };

    return configs[language] || configs.ko;
}

function normalizeAnalysis(text, language = 'ko') {
    const languageConfig = getLanguageConfig(language);
    const fallback = {
        '상태': '횡보',
        '저항선': 'N/A',
        '지지선': 'N/A',
        '분석': languageConfig.fallbackAnalysis,
    };

    try {
        const parsed = JSON.parse(extractJsonText(text));
        return JSON.stringify({
            '상태': parsed['상태'] || fallback['상태'],
            '저항선': parsed['저항선'] || fallback['저항선'],
            '지지선': parsed['지지선'] || fallback['지지선'],
            '분석': parsed['분석'] || parsed['포지션'] || fallback['분석'],
        });
    } catch (error) {
        return JSON.stringify(fallback);
    }
}

exports.handler = async (event) => {
    const languageFromQuery = event.queryStringParameters?.language;
    let requestedLanguage = ['en', 'ko', 'ja'].includes(languageFromQuery) ? languageFromQuery : 'ko';
    let languageConfig = getLanguageConfig(requestedLanguage);

    if (event.httpMethod !== 'POST') {
        return jsonResponse(405, { error: languageConfig.errors.methodNotAllowed });
    }

    let payload;
    try {
        payload = JSON.parse(event.body || '{}');
    } catch (error) {
        return jsonResponse(400, { error: languageConfig.errors.invalidJson });
    }

    const image = payload.image;
    requestedLanguage = ['en', 'ko', 'ja'].includes(payload.language) ? payload.language : requestedLanguage;
    languageConfig = getLanguageConfig(requestedLanguage);

    if (typeof image !== 'string' || !image.startsWith('data:image/')) {
        return jsonResponse(400, { error: languageConfig.errors.missingImage });
    }

    const apiKey = process.env.LOCAL_OPENAI_API_KEY || process.env.OPENAI_API_KEY || process.env.OPEN_API_KEY || process.env.open_api_key;
    if (!apiKey) {
        return jsonResponse(500, {
            error: languageConfig.errors.missingApiKey,
        });
    }

    try {
        const response = await fetch(OPENAI_RESPONSES_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: process.env.OPENAI_MODEL || DEFAULT_MODEL,
                input: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'input_text',
                                text: [
                                    '차트 이미지를 보고 흐름을 단순 분석하세요.',
                                    '반드시 JSON만 반환하세요.',
                                    '키는 "상태", "저항선", "지지선", "분석"만 사용하세요.',
                                    '"상태" 값은 "상승", "횡보", "하강" 중 하나여야 합니다.',
                                    '저항선과 지지선은 이미지에서 읽을 수 없으면 "N/A"로 쓰세요.',
                                    `"분석" 값은 ${languageConfig.name}로 작성하세요.`,
                                    '투자 조언처럼 단정하지 말고 관찰 가능한 흐름만 짧게 적으세요.',
                                ].join('\n'),
                            },
                            {
                                type: 'input_image',
                                image_url: image,
                                detail: 'low',
                            },
                        ],
                    },
                ],
            }),
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            const message = data.error?.message || `${response.status} ${response.statusText}`;
            return jsonResponse(response.status, { error: message });
        }

        const outputText = extractOutputText(data);
        if (!outputText) {
            return jsonResponse(502, { error: languageConfig.errors.emptyOutput });
        }

        return jsonResponse(200, {
            analysis: normalizeAnalysis(outputText, requestedLanguage),
        });
    } catch (error) {
        return jsonResponse(500, {
            error: error.message || languageConfig.errors.serverError,
        });
    }
};
