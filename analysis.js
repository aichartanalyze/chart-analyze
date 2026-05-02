document.addEventListener('DOMContentLoaded', () => {
    const message = document.getElementById('analysis-message');
    const imageSlots = document.querySelectorAll('[data-image-slot]');
    const resultSlots = document.querySelectorAll('[data-result-slot]');

    function displayAnalysisResults() {
        const resultsJSON = sessionStorage.getItem('tradingAnalysisResults');
        if (!resultsJSON) {
            message.textContent = '분석할 데이터가 없습니다.';
            imageSlots.forEach(slot => {
                slot.innerHTML = '<span class="material-icons">image_not_supported</span><p>이미지 없음</p>';
            });
            resultSlots.forEach(slot => {
                renderEmptyAnalysis(slot, '분석 데이터 없음');
            });
            return;
        }

        let results;
        try {
            results = JSON.parse(resultsJSON);
        } catch (error) {
            message.textContent = '분석 데이터를 읽을 수 없습니다.';
            imageSlots.forEach(slot => {
                slot.innerHTML = '<span class="material-icons">image_not_supported</span><p>이미지 없음</p>';
            });
            resultSlots.forEach(slot => {
                renderEmptyAnalysis(slot, '분석 데이터 오류');
            });
            return;
        }

        if (!Array.isArray(results)) {
            message.textContent = '분석 데이터 형식이 올바르지 않습니다.';
            resultSlots.forEach(slot => {
                renderEmptyAnalysis(slot, '분석 데이터 오류');
            });
            return;
        }

        message.textContent = '분석 완료';

        // Clear all slots first
        imageSlots.forEach(slot => {
            slot.innerHTML = '<span class="material-icons">image_not_supported</span><p>이미지 없음</p>';
        });
        resultSlots.forEach(slot => {
            renderEmptyAnalysis(slot, '분석 데이터 없음');
        });

        results.forEach(result => {
            const { originalIndex, src, timeframe, analysis } = result;

            // Render image
            const imageSlot = document.querySelector(`[data-image-slot="${originalIndex}"]`);
            if (imageSlot) {
                const img = document.createElement('img');
                img.src = src;
                img.alt = `${timeframe} 차트`;
                imageSlot.innerHTML = ''; // Clear placeholder
                imageSlot.appendChild(img);
            }

            // Render analysis
            const resultSlot = document.querySelector(`[data-result-slot="${originalIndex}"]`);
            if (resultSlot) {
                renderAnalysis(resultSlot, analysis);
            }
        });
    }

    function parseAnalysis(markdown) {
        if (markdown && typeof markdown === 'object') {
            return markdown;
        }

        if (typeof markdown !== 'string') {
            return {};
        }

        try {
            return JSON.parse(markdown);
        } catch (error) {
            // 이전 마크다운 응답 형식도 계속 표시할 수 있게 둔다.
        }

        const lines = markdown.split('\n').filter(line => line.trim() !== '');
        const analysisData = {};
        const regex = /\*\*(.*?):\*\* (.*)/;

        lines.forEach(line => {
            const match = line.match(regex);
            if (match && match.length === 3) {
                analysisData[match[1].trim()] = match[2].trim();
            }
        });
        return analysisData;
    }

    function renderAnalysis(slot, markdown) {
        const data = parseAnalysis(markdown);

        const status = data['상태'] || 'N/A';
        const resistance = data['저항선'] || 'N/A';
        const support = data['지지선'] || 'N/A';
        const position = data['포지션'] || 'N/A';

        const statusMap = {
            '상승': { className: 'up', icon: 'trending_up' },
            '하강': { className: 'down', icon: 'trending_down' },
            '횡보': { className: 'sideways', icon: 'trending_flat' }
        };

        const statusInfo = statusMap[status] || { className: 'pending', icon: 'help_outline' };

        slot.className = `chart-flow-result ${statusInfo.className}`;
        slot.replaceChildren(
            createFlowRow('상태', status, 'status-row', statusInfo.icon),
            createFlowRow('저항선', resistance),
            createFlowRow('지지선', support),
            createFlowRow('포지션', position, 'position-row')
        );
    }

    function renderEmptyAnalysis(slot, value) {
        slot.className = 'chart-flow-result pending';
        slot.replaceChildren(
            createFlowRow('상태', value, 'status-row'),
            createFlowRow('저항선', value),
            createFlowRow('지지선', value),
            createFlowRow('포지션', value, 'position-row')
        );
    }

    function createFlowRow(label, value, extraClass = '', icon = '') {
        const row = document.createElement('div');
        row.className = `flow-row ${extraClass}`.trim();

        const labelElement = document.createElement('span');
        labelElement.textContent = label;

        const valueElement = document.createElement('strong');
        if (icon) {
            const iconElement = document.createElement('span');
            iconElement.className = 'material-icons';
            iconElement.textContent = icon;
            valueElement.appendChild(iconElement);
        }
        valueElement.append(document.createTextNode(value));

        row.append(labelElement, valueElement);
        return row;
    }

    displayAnalysisResults();
});
