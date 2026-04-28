(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {

        const radioIds = [
            't8am',
            't9am',
            't10am',
            't11am',
            't12pm',
            't1pm',
            't2pm',
            't3pm',
            't4pm',
            't5pm',
            't6pm',
            't7pm',
            't8pm',
            't9pm',
            't10pm',
            't11pm'
        ];

        const receiptNote = document.querySelector('.receipt-note');
        const emoji = document.querySelector('#emoji');
        const coffeeFill = document.querySelector('#coffee-fill');

        function getEmoji(craving) {
            if (craving >= 0 && craving <= 2) {
                return 'images/emoji1.png';
            } else if (craving >= 3 && craving <= 5) {
                return 'images/emoji2.png';
            } else if (craving >= 6 && craving <= 8) {
                return 'images/emoji3.png';
            } else {
                return 'images/emoji4.png';
            }
        }

        function updatePage(dataPoint) {
            const craving = dataPoint.craving;

            receiptNote.textContent = dataPoint.note;

            emoji.src = getEmoji(craving);
            emoji.alt = `Mood emoji for craving level ${craving}`;

    
            let maxFillHeight = 280;

            if (window.innerWidth <= 480) {
                maxFillHeight = 225;
            }
            const fillHeight = (craving / 10) * maxFillHeight;

            coffeeFill.style.height = `${fillHeight}px`;

        }

        async function getData() {
            const response = await fetch('data.json');
            const data = await response.json();

            radioIds.forEach(function (id, index) {
                const radio = document.querySelector(`#${id}`);

                radio.addEventListener('change', function () {
                    if (radio.checked) {
                        updatePage(data[index]);
                    }

                });
                
            });
            const checkedRadio = document.querySelector('input[name="time"]:checked'); 
            const checkedIndex = radioIds.indexOf(checkedRadio.id);

            updatePage(data[checkedIndex]);

        }

        getData();

    });

})();
