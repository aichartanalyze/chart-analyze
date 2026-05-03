document.addEventListener('DOMContentLoaded', () => {
    const i18n = window.ChartAnalyzeI18n;
    const t = (key, values) => i18n?.t(key, values) || '';
    const message = document.getElementById('analysis-message');
    const imageSlots = document.querySelectorAll('[data-image-slot]');
    const resultSlots = document.querySelectorAll('[data-result-slot]');
    const overallAnalysis = document.getElementById('overall-analysis');
    const overallStatus = overallAnalysis?.querySelector('[data-overall-status]');
    const overallDescription = overallAnalysis?.querySelector('[data-overall-description]');
    const imageModal = document.getElementById('image-modal');
    const imageModalImg = imageModal?.querySelector('img');
    const imageModalClose = imageModal?.querySelector('.image-modal-close');

    function displayAnalysisResults() {
        const resultsJSON = sessionStorage.getItem('tradingAnalysisResults');
        if (!resultsJSON) {
            message.textContent = t('analysis.noData');
            renderNoImageSlots();
            resultSlots.forEach(slot => renderEmptyAnalysis(slot, t('analysis.noAnalysisData')));
            renderOverallAnalysis([]);
            return;
        }

        let results;
        try {
            results = JSON.parse(resultsJSON);
        } catch (error) {
            message.textContent = t('analysis.dataReadError');
            renderNoImageSlots();
            resultSlots.forEach(slot => renderEmptyAnalysis(slot, t('analysis.analysisDataError')));
            renderOverallAnalysis([]);
            return;
        }

        if (!Array.isArray(results)) {
            message.textContent = t('analysis.dataFormatError');
            resultSlots.forEach(slot => renderEmptyAnalysis(slot, t('analysis.analysisDataError')));
            renderOverallAnalysis([]);
            return;
        }

        message.textContent = t('analysis.complete');
        renderNoImageSlots();
        resultSlots.forEach(slot => renderEmptyAnalysis(slot, t('analysis.noAnalysisData')));

        const parsedResults = [];

        results.forEach(result => {
            const { originalIndex, src, timeframeKey, analysis } = result;
            const timeframe = i18n?.timeframeLabel(timeframeKey) || result.timeframe || '';

            const imageSlot = document.querySelector(`[data-image-slot="${originalIndex}"]`);
            if (imageSlot) {
                const img = document.createElement('img');
                img.src = src;
                img.alt = t('analysis.chartAlt', { timeframe });
                const zoomButton = document.createElement('button');
                zoomButton.type = 'button';
                zoomButton.className = 'image-zoom-button';
                zoomButton.setAttribute('aria-label', t('analysis.zoomLabel', { timeframe }));
                zoomButton.innerHTML = '<span class="material-icons">zoom_in</span>';
                zoomButton.addEventListener('click', () => {
                    openImageModal(src, t('analysis.chartAlt', { timeframe }));
                });
                imageSlot.innerHTML = '';
                imageSlot.append(img, zoomButton);
            }

            const parsedAnalysis = parseAnalysis(analysis);
            parsedResults.push(parsedAnalysis);

            const resultSlot = document.querySelector(`[data-result-slot="${originalIndex}"]`);
            if (resultSlot) {
                renderAnalysis(resultSlot, parsedAnalysis);
            }
        });

        renderOverallAnalysis(parsedResults);
    }


    function getRawStatus(data) {
        return data?.['상태'] || data?.status || '';
    }

    function getOverallResult(parsedResults) {
        const counts = { up: 0, down: 0, sideways: 0 };

        parsedResults.forEach(data => {
            const statusClass = i18n?.statusClass(getRawStatus(data));
            if (statusClass === 'up' || statusClass === 'down' || statusClass === 'sideways') {
                counts[statusClass] += 1;
            }
        });

        const total = counts.up + counts.down + counts.sideways;
        if (total === 0) {
            return { className: 'pending', labelKey: 'analysis.overallInsufficient', descriptionKey: 'analysis.overallInsufficientDescription' };
        }

        const maxCount = Math.max(counts.up, counts.down, counts.sideways);
        const leaders = Object.entries(counts).filter(([, count]) => count === maxCount).map(([key]) => key);

        if (leaders.length !== 1) {
            return { className: 'mixed', labelKey: 'analysis.overallMixed', descriptionKey: 'analysis.overallMixedDescription' };
        }

        const leader = leaders[0];
        const keyMap = {
            up: { labelKey: 'analysis.overallUp', descriptionKey: 'analysis.overallUpDescription' },
            down: { labelKey: 'analysis.overallDown', descriptionKey: 'analysis.overallDownDescription' },
            sideways: { labelKey: 'analysis.overallSideways', descriptionKey: 'analysis.overallSidewaysDescription' },
        };

        return { className: leader, ...keyMap[leader] };
    }

    function renderOverallAnalysis(parsedResults) {
        if (!overallAnalysis || !overallStatus || !overallDescription) {
            return;
        }

        const result = getOverallResult(parsedResults);
        overallAnalysis.className = `overall-analysis-card ${result.className}`;
        overallStatus.textContent = t(result.labelKey);
        overallDescription.textContent = t(result.descriptionKey);
    }

    function renderNoImageSlots() {
        imageSlots.forEach(slot => {
            slot.replaceChildren(
                createIcon('image_not_supported'),
                createParagraph(t('analysis.noImage')),
            );
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
            // Keep supporting the older markdown response format.
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

        const rawStatus = getRawStatus(data);
        const resistance = data['저항선'] || data.resistance || 'N/A';
        const support = data['지지선'] || data.support || 'N/A';
        const analysisText = data['분석'] || data['포지션'] || data.analysis || 'N/A';

        const statusClass = i18n?.statusClass(rawStatus) || 'pending';
        const iconMap = {
            up: 'trending_up',
            down: 'trending_down',
            sideways: 'trending_flat',
            pending: 'help_outline',
        };

        slot.className = `chart-flow-result ${statusClass}`;
        slot.replaceChildren(
            createFlowRow(t('analysis.labels.status'), i18n?.statusLabel(rawStatus) || rawStatus || 'N/A', 'status-row', iconMap[statusClass]),
            createFlowRow(t('analysis.labels.resistance'), resistance),
            createFlowRow(t('analysis.labels.support'), support),
            createFlowRow(t('analysis.labels.analysis'), analysisText, 'position-row'),
        );
    }

    function renderEmptyAnalysis(slot, value) {
        slot.className = 'chart-flow-result pending';
        slot.replaceChildren(
            createFlowRow(t('analysis.labels.status'), value, 'status-row'),
            createFlowRow(t('analysis.labels.resistance'), value),
            createFlowRow(t('analysis.labels.support'), value),
            createFlowRow(t('analysis.labels.analysis'), value, 'position-row'),
        );
    }

    function createIcon(name) {
        const icon = document.createElement('span');
        icon.className = 'material-icons';
        icon.textContent = name;
        return icon;
    }

    function createParagraph(text) {
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        return paragraph;
    }

    function createFlowRow(label, value, extraClass = '', icon = '') {
        const row = document.createElement('div');
        row.className = `flow-row ${extraClass}`.trim();

        const labelElement = document.createElement('span');
        labelElement.textContent = label;

        const valueElement = document.createElement('strong');
        if (icon) {
            valueElement.appendChild(createIcon(icon));
        }
        valueElement.append(document.createTextNode(value));

        row.append(labelElement, valueElement);
        return row;
    }

    function openImageModal(src, alt) {
        if (!imageModal || !imageModalImg) {
            return;
        }

        imageModalImg.src = src;
        imageModalImg.alt = alt;
        imageModal.classList.add('is-open');
        imageModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        imageModalClose?.focus();
    }

    function closeImageModal() {
        if (!imageModal || !imageModalImg) {
            return;
        }

        imageModal.classList.remove('is-open');
        imageModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        imageModalImg.removeAttribute('src');
        imageModalImg.alt = '';
    }

    imageModalClose?.addEventListener('click', closeImageModal);
    imageModal?.addEventListener('click', (event) => {
        if (event.target === imageModal) {
            closeImageModal();
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && imageModal?.classList.contains('is-open')) {
            closeImageModal();
        }
    });

    displayAnalysisResults();
});
