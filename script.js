(function() {
    'use strict';
    console.log('reading js');

    const toggle = document.querySelector('#mode-toggle');
    const body = document.querySelector('body'); 
    const bannerText  = document.querySelector('#banner-text');

    let mode = 'alone';
    let isAnimating = false;

    function scrambleToWord(element, finalWord) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const maxRounds = 10;
        let round = 0;

        const interval = setInterval(function() { 
            let output = '';

            for (let i = 0; i < finalWord.length; i++) {
                if (i < round) { 
                    output += finalWord[i];

                } else {
                    output += chars[Math.floor(Math.random() * chars.length)];
                }
            } 

            element.textContent =  output;
            round++;

            if (round > maxRounds) {
                clearInterval(interval);
                element.textContent = finalWord;
                isAnimating = false; 

            }
        }, 60);
    }

    toggle.addEventListener('click', function() {
        if (isAnimating) return; 

        isAnimating = true;
        bannerText.classList.add('animating');

        if (mode === 'alone') { 
            body.classList.add('switch');
            toggle.src = 'images/on.jpg';

            scrambleToWord(bannerText, 'TOGETHER');
            mode = 'together';

        } else {
            body.classList.remove('switch'); 
            toggle.src = 'images/off.jpg';
            scrambleToWord(bannerText, 'ALONE');
            mode = 'alone';

        }

        setTimeout(function() {
            bannerText.classList.remove('animating');
        }, 700);

    });
})();



