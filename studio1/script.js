(function () { 
    'use strict';

    console.log('reading js'); 

    const myVideo = document.querySelector('#myVideo');
    const soundToggle = document.querySelector('#soundToggle');
    const fs = document.querySelector('#fs');
    const loading = document.querySelector('#loading'); 

    const line1 = document.querySelector('#line1');
    const line2 = document.querySelector('#line2');
    const line3 = document.querySelector('#line3');
    const line4 = document.querySelector('#line4');
    const line5 = document.querySelector('#line5');

    const leapOverlay = document.querySelector('#leapOverlay');

    const poem = {
        start: [0, 2, 9, 11, 15, 25], 
        stop: [2, 7, 11, 15, 21, 31],
        line: [line1, line2, line3, line4, line5, leapOverlay] 

    };

    myVideo.muted = true;
    myVideo.loop = true; 

    myVideo.addEventListener('playing', function () {
        loading.style.display =  'none';
    });

    soundToggle.addEventListener('click', function () {
        if (myVideo.muted) {
            myVideo.muted = false; 
            soundToggle.className = 'fa-solid fa-volume-up'; 

        } else { 
            myVideo.muted = true;
            soundToggle.className = 'fa-solid fa-volume-mute';
        }
    });

    fs.addEventListener('click', function () { 
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen(); 
        }

    });


    myVideo.addEventListener('click', function () { 
        if (myVideo.className === 'greyscale') {
            myVideo.className = ''; 
        } else {
            myVideo.className = 'greyscale'; 
        }
    });

    setInterval(checkTime, 100); 

    function checkTime() { 
        console.log(parseInt(myVideo.currentTime)); 

        for (let i = 0; i < poem.start.length; i++) {

            if (poem.start[i] <= myVideo.currentTime && myVideo.currentTime < poem.stop[i]) {
                poem.line[i].className = 'showing';
            } else {
                poem.line[i].className = 'hidden';
            }
        } 

        if (2 <= myVideo.currentTime && myVideo.currentTime < 2.2) {
            line1.className =  'showing flyaway';
        } else if (0 <= myVideo.currentTime && myVideo.currentTime < 2) {
            line1.className = 'showing';
        }
    }

})();






