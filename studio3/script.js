(function () {
    "use strict";
    console.log('reading js');

    const fortunes = {
        love: "Romance is circling nearby. Unfortunately, so is your tendency to overthink every punctuation mark.",
        luck: "Good luck is coming your way. Do not ask where it came from or what it wants in return.",
        friendship: "A friend will soon text you something concerning. You will answer anyway.",
        money: "Money may enter your life soon. It may also immediately leave disguised as a “small treat.”",
        chaos: "The plot is thickening, and somehow your name is already in the hand of fate."
    };

    const fortuneText = document.querySelector("#fortune-text"); 
    const buttons = document.querySelectorAll(".oracle-button"); 

    buttons.forEach(function (button) { 
        
        button.addEventListener("click", function () {
            const category = button.dataset.category;

            fortuneText.textContent = fortunes[category];

            buttons.forEach(function (otherButton) {
                otherButton.classList.remove("selected");
            });

            button.classList.add("selected"); 

        });
    });

    /* particles background */
    particlesJS("particles-js", {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800 
                }
            },
            color: {
                value: "#e4901f"
            },
            shape: {
                type: "star",
                stroke: {
                    width: 0,
                    color: "#000000"
                },
                polygon: {
                    nb_sides: 5
                },
                image: {
                    src: "img/github.svg",
                    width: 100,
                    height: 100 
                }
            },
            opacity: {
                value: 0.45,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 7.9,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: false,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1
            },

            move: {
                enable: true,
                speed: 6,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true, 
                    mode: "repulse"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: { 
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }

                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },

                repulse: {
                    distance: 150,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4 
                },
                remove: {
                    particles_nb: 2
                }

            }
        },
        retina_detect: true
    });

    // parallax hover effect
    Atropos({
        el: ".ball-atropos",
        activeOffset: 18,
        rotateXMax: 8,
        rotateYMax: 8,
        shadow: false,
        highlight: false,
        duration: 300 

    });

})();





