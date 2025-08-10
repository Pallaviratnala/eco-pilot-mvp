document.addEventListener('DOMContentLoaded', function () {
    function safeGet(id) { 
        var el = document.getElementById(id); 
        if (!el) console.warn('Missing element:', id); 
        return el; 
    }

    var calculateBtn = safeGet('calculate-btn');
    var scanBtn = safeGet('scan-btn');

    var frequencyScore = { rarely: 1, monthly: 3, weekly: 5, daily: 8 };
    var categoryScore = { fashion: 5, electronics: 6, groceries: 2, homegoods: 3, other: 4 };
    var platformScore = { amazon: 5, flipkart: 4, myntra: 6, other: 3 };

    function animateNumber(el, start, end, duration) {
        let range = end - start;
        let startTime = null;
        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            let progress = Math.min((timestamp - startTime) / duration, 1);
            el.innerHTML = Math.floor(progress * range + start);
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    if (calculateBtn) {
        calculateBtn.addEventListener('click', function (e) {
            try {
                e.preventDefault();

                var frequency = safeGet('frequency')?.value || '';
                var category = safeGet('category')?.value || '';
                var platform = safeGet('platform')?.value || '';

                if (!frequency || !category || !platform) {
                    alert('🚨 Select all options before calculating. Even Mars missions need all systems checked.');
                    return;
                }

                var score = frequencyScore[frequency] + categoryScore[category] + platformScore[platform];
                var scoreResult = safeGet('score-result');
                var carbonScoreText = safeGet('carbon-score-text');
                var carbonScoreCompare = safeGet('carbon-score-compare');

                if (scoreResult && carbonScoreText && carbonScoreCompare) {
                    scoreResult.style.display = 'block';
                    carbonScoreText.innerHTML = 'Estimated Annual CO₂ Footprint: <span class="highlight">0</span> metric tons';
                    let scoreEl = carbonScoreText.querySelector('.highlight');
                    animateNumber(scoreEl, 0, score, 1000);

                    let comparisonText;
                    if (score < 10) comparisonText = "🌱 You’re in the TOP 5% Carbon Heroes. That’s like planting 500 trees!";
                    else if (score < 15) comparisonText = "🚗 That’s like planting 200 trees or driving 500 km. Room to level up.";
                    else comparisonText = "🔥 High emissions detected. Equivalent to planting just 50 trees or driving 1000 km.";

                    carbonScoreCompare.textContent = comparisonText;
                }

                // Fun Musk-style rank simulation
                var rankNumber = safeGet('rank-number');
                if (rankNumber) {
                    rankNumber.textContent = Math.floor(Math.random() * 500) + 1;
                }

                var tips = {
                    fashion: ['Bundle orders to reduce packaging.', 'Choose local brands.', 'Avoid express shipping.'],
                    electronics: ['Buy refurbished devices.', 'Recycle old gadgets.', 'Support energy-efficient brands.'],
                    groceries: ['Reduce food waste.', 'Buy seasonal and local.', 'Use reusable bags.'],
                    homegoods: ['Choose sustainable materials.', 'Repair instead of replace.', 'Donate unused items.'],
                    other: ['Be mindful of consumption.', 'Support eco-friendly brands.', 'Reduce single-use plastics.']
                };

                var tipsList = safeGet('eco-tips');
                if (tipsList && tips[category]) {
                    tipsList.innerHTML = '';
                    tips[category].forEach(tip => {
                        var li = document.createElement('li');
                        li.textContent = '• ' + tip;
                        tipsList.appendChild(li);
                    });
                }
            } catch (err) {
                console.error('Calculate handler error:', err);
            }
        });
    }

    if (scanBtn) {
        scanBtn.addEventListener('click', function () {
            try {
                var productLink = safeGet('product-link')?.value.trim() || '';
                var badProduct = 'https://example.com/polyester-tshirt';
                var goodAlternatives = [
                    'Organic cotton t-shirt from No Nasties',
                    'Locally made organic tee from Brown Living'
                ];

                var ecoPilotReport = safeGet('eco-pilot-report');
                var productReport = safeGet('product-report');
                var productAlternatives = safeGet('product-alternatives');
                var carbonSave = safeGet('carbon-save');

                if (ecoPilotReport) ecoPilotReport.style.display = 'block';

                if (productLink === badProduct) {
                    productReport.textContent = '⚠️ High carbon footprint: synthetic materials + long-distance shipping = climate nightmare.';
                    productAlternatives.innerHTML = '';
                    goodAlternatives.forEach(alt => {
                        var li = document.createElement('li');
                        li.textContent = '• ' + alt;
                        productAlternatives.appendChild(li);
                    });
                    carbonSave.textContent = '✅ Switching saves ~60% of the carbon footprint. That’s like skipping 3 round trips to work.';
                } else {
                    productReport.textContent = '🤔 No data for this product link yet. Upload more so our AI can learn.';
                    productAlternatives.innerHTML = '';
                    carbonSave.textContent = '';
                }
            } catch (err) {
                console.error('Scan handler error:', err);
            }
        });
    }
});
