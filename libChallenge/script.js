(function(){
    'use strict';

    // gradient bar
    var granimInstance = new Granim({
        element: '#gradient-bar',
        direction: 'left-right',
        isPausedWhenNotInView: true,
        states: {
            "default-state": {
                gradients: [
                    ['#ff9966', '#ff5e62'],
                    ['#00F260', '#0575E6'],
                    ['#e1eec3', '#f05053']
                ],
                transitionSpeed: 3000
            }
        }
    });

    var map = L.map('map').setView([37.826265, -122.232871], 14);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    L.marker([37.829527, -122.237977]).addTo(map)
        .bindPopup('I spent the majority of my childhood in this home.');

    L.marker([37.823491, -122.233699]).addTo(map)
        .bindPopup('I joined the local club swim team at age 7 and swam all throughout high school. My favorite stroke being freestyle.');


    L.marker([37.821916, -122.232770]).addTo(map)
        .bindPopup('This park was next to my school so my friends and I would often go there to hangout.');

}());