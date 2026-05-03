(function() {
    const supportedLanguages = ['en', 'ja', 'ko'];
    const languageNames = {
        en: 'English',
        ko: '한국어',
        ja: '日本語',
    };

    const translations = {
        en: {
            meta: { title: 'ChartAnalyze' },
            nav: { languageLabel: 'Language selection' },
            home: {
                heroTitle: 'AI Chart Analysis Tool for Multi-Timeframe Trading',
                heroDescription: 'ChartAnalyze is an AI chart analysis tool designed for multi-timeframe trading.\nUpload daily, hourly, and intraday chart screenshots to instantly analyze market trends, structure, and potential trading opportunities.',
                uploadTitle: 'Upload Charts',
                uploadDescription: 'Upload the chart images you want to analyze by timeframe.',
                dailyChart: 'Daily chart',
                hourlyChart: 'Hourly chart',
                minuteChart: 'Minute chart',
                uploadGuide: 'Drag, click, or paste an image to upload',
                seoIntroTitle: 'AI Chart Analysis Tool',
                seoIntroText: 'ChartAnalyze is a simple AI chart analysis tool that helps traders review market trends using multi-timeframe analysis. Upload your chart screenshots and get structured reference insights instantly.',
                seoMtfTitle: 'How It Works',
                seoMtfText: 'Upload daily, hourly, and intraday charts. AI analyzes trend flow and market structure, then presents structured insights as reference information.',
                seoHowTitle: 'How to use',
                seoHowStep1: 'Upload daily, hourly, and intraday charts',
                seoHowStep2: 'AI analyzes trend and structure',
                seoHowStep3: 'Review structured insights as reference information',
                seoFeaturesTitle: 'Tool features',
                seoFeature1: 'AI-powered chart analysis',
                seoFeature2: 'Multi-timeframe support',
                seoFeature3: 'Simple UI that is easy for beginners to use',
                seoFeature4: 'Useful for reviewing crypto, stock, and FX charts',
                seoAudienceTitle: 'Who this is for',
                seoAudienceText: 'This tool is designed for crypto traders, stock investors, FX traders, and anyone who reviews charts as part of their market analysis.',
                seoDisclaimer: 'The analysis provided by this tool is for reference only and is not investment advice.',
                startAnalysis: 'Start analysis',
                analyzing: 'Analyzing...',
                noImageAlert: 'Please upload at least one chart image to analyze.',
                emptyAnalysisError: 'The analysis result is empty.',
                analysisFailed: 'Analysis failed: {message}',
            },
            analysis: {
                heroTitle: 'AI Chart Analysis Tool for Multi-Timeframe Trading',
                heroDescription: 'Review your uploaded charts and AI analysis results.',
                uploadedTitle: 'Uploaded Charts',
                uploadedDescription: 'These are the chart images uploaded from the main page.',
                loadingImage: 'Loading image',
                pending: 'Waiting for analysis',
                guide: 'Uploaded images are simply classified as uptrend, sideways, or downtrend.',
                reupload: 'Upload again',
                noData: 'No analysis data found.',
                noImage: 'No image',
                noAnalysisData: 'No analysis data',
                dataReadError: 'Unable to read analysis data.',
                dataFormatError: 'The analysis data format is invalid.',
                analysisDataError: 'Analysis data error',
                complete: 'Analysis complete',
                modalLabel: 'Enlarged chart image',
                modalClose: 'Close',
                zoomLabel: 'Enlarge {timeframe}',
                chartAlt: '{timeframe}',
                labels: {
                    status: 'Status',
                    resistance: 'Resistance',
                    support: 'Support',
                    analysis: 'Analysis',
                },
                statuses: {
                    up: 'Uptrend',
                    down: 'Downtrend',
                    sideways: 'Sideways',
                    unknown: 'N/A',
                },
            },
            footer: {
                disclaimer: 'This service is a simple chart-flow summary tool and is provided for reference only, not for investment decisions.',
                copyright: '© 2026 ChartAnalyze. All rights reserved.',
            },
        },
        ko: {
            meta: { title: 'ChartAnalyze' },
            nav: { languageLabel: '언어 선택' },
            home: {
                heroTitle: 'AI 차트 분석 도구｜멀티 타임프레임 트레이딩 분석',
                heroDescription: 'ChartAnalyze는 멀티 타임프레임 트레이딩을 위한 AI 차트 분석 도구입니다.\n일봉, 시간봉, 분봉 차트를 업로드하면 시장의 흐름과 구조, 잠재적인 트레이딩 기회를 빠르게 분석할 수 있습니다.',
                uploadTitle: '차트 업로드',
                uploadDescription: '분석할 차트 이미지를 시간대별로 업로드하세요.',
                dailyChart: '일봉 차트',
                hourlyChart: '시간봉 차트',
                minuteChart: '분봉 차트',
                uploadGuide: '이미지를 드래그, 클릭, 붙여넣기로 업로드',
                seoIntroTitle: 'AI 차트 분석 도구란?',
                seoIntroText: 'ChartAnalyze는 AI를 활용해 차트 흐름을 확인할 수 있는 도구입니다. 일봉, 시간봉, 분봉을 함께 보면 추세 방향과 시장 구조를 더 쉽게 정리할 수 있습니다.',
                seoMtfTitle: '멀티 타임프레임 분석이란?',
                seoMtfText: '멀티 타임프레임 분석은 여러 시간대의 차트를 함께 보며 시장을 분석하는 방식입니다. 일봉으로 큰 흐름을 확인하고 시간봉과 분봉으로 단기 움직임을 비교할 수 있습니다.',
                seoHowTitle: '사용 방법',
                seoHowStep1: '일봉, 시간봉, 분봉 차트 이미지를 업로드',
                seoHowStep2: 'AI가 추세 흐름과 시장 구조를 분석',
                seoHowStep3: '분석 결과를 참고 정보로 확인',
                seoFeaturesTitle: '이 도구의 특징',
                seoFeature1: 'AI 기반 차트 분석',
                seoFeature2: '멀티 타임프레임 지원',
                seoFeature3: '초보자도 사용하기 쉬운 심플한 UI',
                seoFeature4: '가상자산, 주식, FX 차트 확인에 활용 가능',
                seoAudienceTitle: '대상 사용자',
                seoAudienceText: '이 도구는 가상자산 트레이더, 주식 투자자, FX 트레이더 등 차트 분석을 하는 모든 사용자를 위해 설계되었습니다.',
                seoDisclaimer: '본 도구에서 제공되는 분석은 참고 정보이며 투자 조언이 아닙니다.',
                startAnalysis: '분석 시작',
                analyzing: '분석 중...',
                noImageAlert: '분석할 차트 이미지를 하나 이상 업로드해주세요.',
                emptyAnalysisError: '분석 결과가 비어 있습니다.',
                analysisFailed: '분석에 실패했습니다: {message}',
            },
            analysis: {
                heroTitle: 'AI 차트 분석 도구｜멀티 타임프레임 트레이딩 분석',
                heroDescription: '업로드한 차트와 AI 분석 결과를 확인합니다.',
                uploadedTitle: '업로드한 차트',
                uploadedDescription: '인덱스 페이지에서 업로드한 차트 이미지입니다.',
                loadingImage: '이미지를 불러오는 중입니다',
                pending: '분석 대기',
                guide: '업로드한 이미지를 상승, 횡보, 하강 중 하나로 단순 분류합니다.',
                reupload: '다시 업로드',
                noData: '분석할 데이터가 없습니다.',
                noImage: '이미지 없음',
                noAnalysisData: '분석 데이터 없음',
                dataReadError: '분석 데이터를 읽을 수 없습니다.',
                dataFormatError: '분석 데이터 형식이 올바르지 않습니다.',
                analysisDataError: '분석 데이터 오류',
                complete: '분석 완료',
                modalLabel: '차트 이미지 확대 보기',
                modalClose: '닫기',
                zoomLabel: '{timeframe} 확대',
                chartAlt: '{timeframe}',
                labels: {
                    status: '상태',
                    resistance: '저항선',
                    support: '지지선',
                    analysis: '분석',
                },
                statuses: {
                    up: '상승',
                    down: '하강',
                    sideways: '횡보',
                    unknown: 'N/A',
                },
            },
            footer: {
                disclaimer: '본 서비스는 차트 흐름을 간단히 정리하는 도구이며, 투자 판단을 위한 참고용으로만 제공됩니다.',
                copyright: '© 2026 ChartAnalyze. 모든 권리 보유.',
            },
        },
        ja: {
            meta: { title: 'ChartAnalyze' },
            nav: { languageLabel: '言語選択' },
            home: {
                heroTitle: 'AIチャート分析ツール｜マルチタイムフレーム分析',
                heroDescription: 'ChartAnalyzeは、マルチタイムフレーム分析に対応したAIチャート分析ツールです。\n日足・時間足・分足のチャートをアップロードすることで、相場の流れや構造、トレード機会を素早く把握できます。',
                uploadTitle: 'チャートをアップロード',
                uploadDescription: '分析するチャート画像を時間軸ごとにアップロードしてください。',
                dailyChart: '日足チャート',
                hourlyChart: '時間足チャート',
                minuteChart: '分足チャート',
                uploadGuide: '画像をドラッグ、クリック、または貼り付けてアップロード',
                seoIntroTitle: 'AIチャート分析ツールとは？',
                seoIntroText: 'ChartAnalyzeは、AIを活用してチャートの流れを確認できるツールです。日足・時間足・分足など複数の時間軸をあわせて見ることで、トレンドの方向性や相場の構造を整理しやすくなります。',
                seoMtfTitle: 'マルチタイムフレーム分析とは？',
                seoMtfText: 'マルチタイムフレーム分析とは、複数の時間軸を組み合わせて相場を分析する手法です。日足で大きな流れを確認し、時間足や分足で短期的な動きを確認することで、より落ち着いた判断材料を得ることができます。',
                seoHowTitle: '使い方',
                seoHowStep1: '日足・時間足・分足のチャート画像をアップロード',
                seoHowStep2: 'AIがトレンドや構造を分析',
                seoHowStep3: '分析結果を参考情報として確認',
                seoFeaturesTitle: 'このツールの特徴',
                seoFeature1: 'AIによるチャート分析',
                seoFeature2: 'マルチタイムフレーム対応',
                seoFeature3: '初心者でも使いやすいシンプルなUI',
                seoFeature4: '仮想通貨・株式・FXなどのチャート確認に対応',
                seoAudienceTitle: '対象ユーザー',
                seoAudienceText: 'このツールは、仮想通貨トレーダー、株式投資家、FXトレーダーなど、チャート分析を行うすべてのユーザー向けに設計されています。',
                seoDisclaimer: '本ツールで提供される分析は参考情報であり、投資助言ではありません。',
                startAnalysis: '分析開始',
                analyzing: '分析中...',
                noImageAlert: '分析するチャート画像を1枚以上アップロードしてください。',
                emptyAnalysisError: '分析結果が空です。',
                analysisFailed: '分析に失敗しました: {message}',
            },
            analysis: {
                heroTitle: 'AIチャート分析ツール｜マルチタイムフレーム分析',
                heroDescription: 'アップロードしたチャートとAI分析結果を確認します。',
                uploadedTitle: 'アップロードしたチャート',
                uploadedDescription: 'メインページでアップロードしたチャート画像です。',
                loadingImage: '画像を読み込んでいます',
                pending: '分析待ち',
                guide: 'アップロードした画像を上昇、横ばい、下落のいずれかに簡単分類します。',
                reupload: '再アップロード',
                noData: '分析するデータがありません。',
                noImage: '画像なし',
                noAnalysisData: '分析データなし',
                dataReadError: '分析データを読み取れません。',
                dataFormatError: '分析データの形式が正しくありません。',
                analysisDataError: '分析データエラー',
                complete: '分析完了',
                modalLabel: 'チャート画像の拡大表示',
                modalClose: '閉じる',
                zoomLabel: '{timeframe}を拡大',
                chartAlt: '{timeframe}',
                labels: {
                    status: '状態',
                    resistance: '抵抗線',
                    support: '支持線',
                    analysis: '分析',
                },
                statuses: {
                    up: '上昇',
                    down: '下落',
                    sideways: '横ばい',
                    unknown: 'N/A',
                },
            },
            footer: {
                disclaimer: '本サービスはチャートの流れを簡単に整理するツールであり、投資判断ではなく参考用として提供されます。',
                copyright: '© 2026 ChartAnalyze. All rights reserved.',
            },
        },
    };

    function detectBrowserLanguage() {
        const language = (navigator.language || navigator.userLanguage || 'ko').toLowerCase();
        if (language.startsWith('ja')) return 'ja';
        if (language.startsWith('en')) return 'en';
        return 'ko';
    }

    function getLanguageFromPath() {
        const firstSegment = window.location.pathname.split('/').filter(Boolean)[0];
        return supportedLanguages.includes(firstSegment) ? firstSegment : detectBrowserLanguage();
    }

    function getCurrentPage() {
        return window.location.pathname.indexOf('analysis') !== -1 ? 'analysis.html' : '';
    }

    const currentLanguage = getLanguageFromPath();

    function getValue(path) {
        return path.split('.').reduce((source, key) => source && source[key], translations[currentLanguage]);
    }

    function format(template, values = {}) {
        return String(template || '').replace(/\{(\w+)\}/g, (_, key) => values[key] ?? '');
    }

    function translate(path, values = {}) {
        return format(getValue(path), values);
    }

    function timeframeLabel(key) {
        const map = {
            daily: 'home.dailyChart',
            hourly: 'home.hourlyChart',
            minute: 'home.minuteChart',
        };
        return translate(map[key] || key);
    }

    function statusLabel(status) {
        const map = {
            '상승': 'analysis.statuses.up',
            up: 'analysis.statuses.up',
            uptrend: 'analysis.statuses.up',
            '하강': 'analysis.statuses.down',
            down: 'analysis.statuses.down',
            downtrend: 'analysis.statuses.down',
            '횡보': 'analysis.statuses.sideways',
            sideways: 'analysis.statuses.sideways',
        };
        return translate(map[String(status || '').toLowerCase()] || map[status] || 'analysis.statuses.unknown');
    }

    function statusClass(status) {
        const value = String(status || '').toLowerCase();
        if (status === '상승' || value === 'up' || value === 'uptrend') return 'up';
        if (status === '하강' || value === 'down' || value === 'downtrend') return 'down';
        if (status === '횡보' || value === 'sideways') return 'sideways';
        return 'pending';
    }

    function applyStaticTranslations() {
        document.documentElement.lang = currentLanguage;
        document.title = translate('meta.title');

        document.querySelectorAll('[data-i18n]').forEach(element => {
            const value = translate(element.dataset.i18n);
            if (value.includes('\n')) {
                element.replaceChildren(...value.split('\n').flatMap((line, index) => {
                    const nodes = [];
                    if (index > 0) {
                        nodes.push(document.createElement('br'));
                    }
                    nodes.push(document.createTextNode(line));
                    return nodes;
                }));
                return;
            }
            element.textContent = value;
        });

        document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
            element.setAttribute('aria-label', translate(element.dataset.i18nAriaLabel));
        });

        renderLanguageSelector();
    }

    function renderLanguageSelector() {
        const page = getCurrentPage();
        document.querySelectorAll('[data-language-selector]').forEach(container => {
            container.setAttribute('aria-label', translate('nav.languageLabel'));
            container.replaceChildren(...supportedLanguages.map(language => {
                const link = document.createElement('a');
                link.href = `/${language}/${page}`;
                link.textContent = languageNames[language];
                link.lang = language;
                if (language === currentLanguage) {
                    link.setAttribute('aria-current', 'true');
                }
                return link;
            }));
        });
    }

    window.ChartAnalyzeI18n = {
        language: currentLanguage,
        languages: supportedLanguages,
        translations,
        languageNames,
        t: translate,
        apply: applyStaticTranslations,
        timeframeLabel,
        statusLabel,
        statusClass,
    };

    document.addEventListener('DOMContentLoaded', applyStaticTranslations);
})();
