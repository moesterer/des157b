(function () {
    "use strict";

    AOS.init({
        duration: 1200,
        easing: "ease-out-cubic",
        once: false,
        mirror: true
    });

    const startBtn = document.querySelector("#start-btn");
    const intro = document.querySelector("#intro");

    const storyPage = document.querySelector("#story-page");
    const ending = document.querySelector("#ending");

    const transitionLayer = document.querySelector("#transition-layer");
    const todayText = document.querySelector("#today-text");
    const unityText = document.querySelector("#unity-text");

    const kitchenScene = document.querySelector("#kitchen-scene");
    const hotspots = document.querySelectorAll(".hotspot");

    const pictureAlert = document.querySelector("#picture-alert");
    const calendarAlert = document.querySelector("#calendar-alert");
    const nextSceneBtn = document.querySelector("#next-scene-btn");

    const busScene = document.querySelector("#bus-scene");
    const busHotspots = document.querySelectorAll(".bus-hotspot");

    const girlsAlert = document.querySelector("#girls-alert");
    const magazineAlert = document.querySelector("#magazine-alert");
    const busNextSceneBtn = document.querySelector("#bus-next-scene-btn");

    const girlsConversation = document.querySelector("#girls-conversation");
    const girlOneText = document.querySelector("#girl-one-text");
    const girlTwoText = document.querySelector("#girl-two-text");
    const continueGirls = document.querySelector("#continue-girls");
    const closeBusConvo = document.querySelector("#close-bus-convo");

    const objectScene = document.querySelector("#object-scene");
    const objectImage = document.querySelector("#object-image");
    const dialogueText = document.querySelector("#dialogue-text");
    const continueText = document.querySelector("#continue-text");
    const closeObject = document.querySelector("#close-object");

    let bottomTransitionStarted = false;
    let currentTyped = null;
    let currentObject = null;
    let currentSentence = 0;
    let idleTimer = null;

    let currentScene = "kitchen";
    let currentGirlPair = 0;
    let girlTypedOne = null;
    let girlTypedTwo = null;

    const clickedObjects = {
        picture: false,
        calendar: false
    };

    const clickedBusObjects = {
        girls: false,
        magazine: false
    };

    const girlDialogue = [
        [
            "Hey check me out, I’m using this new cream that is supposed to make me look 5 years younger. Can you tell?",
            "Omg totally - maybe? How did you get it?"
        ],
        [
            "My mom bought it online. It’s called YouthBasic or something. It says it uses the same science as the President’s treatment.",
            "No way. That stuff must be fake. Your mom does not have the money lol."
        ],
        [
            "Yeah, obviously. But the ad said it was inspired by rejuvenation technology.",
            "That just means it does nothing."
        ],
        [
            "It does something. My skin feels tighter.",
            "You’re literally sixteen."
        ],
        [
            "Exactly. I can’t fall behind already.",
            "HaHa girl what?"
        ]
    ];

    const objectScripts = {
        calendar: {
            image: "images/calendar.png",
            alt: "Calendar",
            alert: calendarAlert,
            sentences: [
                "I need to remember to visit my sister in the hospital this Sunday. We are getting another consultation about whether she is eligible for the life extension program.",
                "I have to make sure I deposit today too. I cannot forget, not with all the excitement around the Unity Day parade and the President’s address to the nation later.",
                "Maybe I should set another alarm. I keep thinking I will remember, but lately every thought feels crowded by another bill, another appointment, another deadline.",
                "My sister is only seventeen years older than me, and already her body is being hit with diseases that are supposed to come much later in life. It is not fair.",
                "The doctors keep saying the program could help if she qualifies, but qualifying is not the same thing as affording it. Still, I have to be grateful that the option exists at all.",
                "Busy, busy day. Deposit first, parade second, hospital Sunday. I just need to keep everything in order long enough to help her."
            ]
        },

        picture: {
            image: "images/picture.png",
            alt: "President portrait",
            alert: pictureAlert,
            sentences: [
                "We all keep a picture of the President in our homes so he may watch over us. It feels strange to imagine a room without him in it.",
                "I am grateful, of course. Everyone is grateful. If he had not discovered the reverse aging process, so many more people would be suffering.",
                "Today marks his fifty-eighth year in office, and he will speak to the nation later after the Unity Day parade. They say this address will be historic.",
                "He looks almost the same as he did in the old recordings, maybe even younger. It is comforting, in a way, to see one face stay steady while everything else becomes more expensive.",
                "Sometimes I wonder how many treatments a person must receive to remain that untouched by time. Then I remind myself that he gave us this future, and doubt is an ugly kind of ingratitude.",
                "If the President says the program is a gift to the people, then I have to believe my sister still has a chance. I just have to keep saving."
            ]
        },

        magazine: {
            image: "images/magazine.png",
            alt: "Magazine",
            alert: magazineAlert,
            sentences: [
                "This magazine is a few months old. He won again, although he ran unopposed.",
                "I mean, who else would the people vote for? There really is no point in trying to run against him.",
                "The article says the victory proves the nation still trusts his guidance after fifty-eight years in office.",
                "I suppose that makes sense. When one person gives the world more time, everyone else starts to feel temporary."
            ]
        }
    };

    startBtn.addEventListener("click", function () {
        startBtn.textContent = "scroll down";

        setTimeout(function () {
            intro.scrollIntoView({
                behavior: "smooth",
                block: "end"
            });
        }, 300);
    });

    function checkBottomReached() {
        const endingRect = ending.getBoundingClientRect();

        if (
            !bottomTransitionStarted &&
            endingRect.top <= 10 &&
            endingRect.bottom <= window.innerHeight + 10
        ) {
            bottomTransitionStarted = true;
            startEndingTransition();
        }
    }

    function startEndingTransition() {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth"
        });

        document.body.classList.add("lock-scroll");

        setTimeout(function () {
            transitionLayer.classList.add("show");
            storyPage.classList.add("fade-away");
            kitchenScene.classList.add("show");

            setTimeout(function () {
                todayText.classList.add("fade-out");

                setTimeout(function () {
                    todayText.style.display = "none";
                    unityText.classList.add("show");

                    const typedUnity = new Typed("#unity-text", {
                        strings: ["Unity Day", ""],
                        typeSpeed: 70,
                        backSpeed: 45,
                        backDelay: 3000,
                        smartBackspace: true,
                        showCursor: false,
                        loop: false,

                        onComplete: function () {
                            setTimeout(function () {
                                typedUnity.destroy();
                                unityText.textContent = "";
                                transitionLayer.classList.remove("show");
                                unityText.classList.remove("show");
                                kitchenScene.classList.add("active");
                                currentScene = "kitchen";
                                resetIdleTimer();
                            }, 500);
                        }
                    });

                }, 2000);

            }, 2000);

        }, 3000);
    }

    function openObjectScene(objectName) {
        currentObject = objectName;
        currentSentence = 0;

        const objectData = objectScripts[objectName];

        if (objectData.alert) {
            objectData.alert.classList.add("hide");
        }

        if (objectName === "picture") {
            clickedObjects.picture = true;
            checkAllObjectsClicked();
        }

        if (objectName === "calendar") {
            clickedObjects.calendar = true;
            checkAllObjectsClicked();
        }

        if (objectName === "magazine") {
            clickedBusObjects.magazine = true;
            checkAllBusObjectsClicked();
        }

        objectImage.src = objectData.image;
        objectImage.alt = objectData.alt;

        dialogueText.textContent = "";
        objectScene.classList.add("show");

        typeCurrentSentence();
        resetIdleTimer();
    }

    function typeCurrentSentence() {
        const objectData = objectScripts[currentObject];

        if (currentTyped) {
            currentTyped.destroy();
            currentTyped = null;
        }

        dialogueText.textContent = "";

        currentTyped = new Typed("#dialogue-text", {
            strings: [objectData.sentences[currentSentence]],
            typeSpeed: 18,
            backSpeed: 0,
            showCursor: false,
            loop: false
        });
    }

    function continueObjectText() {
        const objectData = objectScripts[currentObject];

        currentSentence++;

        if (currentSentence >= objectData.sentences.length) {
            closeObjectScene();
            return;
        }

        typeCurrentSentence();
    }

    function closeObjectScene() {
        if (currentTyped) {
            currentTyped.destroy();
            currentTyped = null;
        }

        objectScene.classList.remove("show");
        currentObject = null;
        currentSentence = 0;

        checkAllBusObjectsClicked();
        resetIdleTimer();
    }

    function checkAllObjectsClicked() {
        if (clickedObjects.picture && clickedObjects.calendar) {
            nextSceneBtn.classList.add("show");
        }
    }

    function openBusObject(objectName) {
        if (objectName === "magazine") {
            clickedBusObjects.magazine = true;
            magazineAlert.classList.add("hide");
            openObjectScene("magazine");
        }

        if (objectName === "girls") {
            clickedBusObjects.girls = true;
            girlsAlert.classList.add("hide");

            openGirlsConversation();
            checkAllBusObjectsClicked();
            resetIdleTimer();
        }
    }

    function openGirlsConversation() {
        currentGirlPair = 0;

        magazineAlert.classList.add("hide");
        busNextSceneBtn.classList.remove("show");

        girlsConversation.classList.add("show");
        closeBusConvo.classList.add("show");

        typeGirlPair();
    }

    function typeGirlPair() {
        if (girlTypedOne) {
            girlTypedOne.destroy();
            girlTypedOne = null;
        }

        if (girlTypedTwo) {
            girlTypedTwo.destroy();
            girlTypedTwo = null;
        }

        girlOneText.textContent = "";
        girlTwoText.textContent = "";

        girlTypedOne = new Typed("#girl-one-text", {
            strings: [girlDialogue[currentGirlPair][0]],
            typeSpeed: 14,
            backSpeed: 0,
            showCursor: false,
            loop: false,

            onComplete: function () {
                girlTypedTwo = new Typed("#girl-two-text", {
                    strings: [girlDialogue[currentGirlPair][1]],
                    typeSpeed: 14,
                    backSpeed: 0,
                    showCursor: false,
                    loop: false
                });
            }
        });
    }

    function continueGirlConversation() {
        currentGirlPair++;

        if (currentGirlPair >= girlDialogue.length) {
            closeGirlsConversation();
            return;
        }

        typeGirlPair();
    }

    function closeGirlsConversation() {
        if (girlTypedOne) {
            girlTypedOne.destroy();
            girlTypedOne = null;
        }

        if (girlTypedTwo) {
            girlTypedTwo.destroy();
            girlTypedTwo = null;
        }

        girlOneText.textContent = "";
        girlTwoText.textContent = "";

        girlsConversation.classList.remove("show");
        closeBusConvo.classList.remove("show");

        currentGirlPair = 0;

        if (!clickedBusObjects.magazine) {
            magazineAlert.classList.remove("hide");
        }

        checkAllBusObjectsClicked();
        resetIdleTimer();
    }

    function checkAllBusObjectsClicked() {
        const conversationIsOpen = girlsConversation.classList.contains("show");
        const objectSceneIsOpen = objectScene.classList.contains("show");

        if (
            clickedBusObjects.girls &&
            clickedBusObjects.magazine &&
            !conversationIsOpen &&
            !objectSceneIsOpen
        ) {
            busNextSceneBtn.classList.add("show");
        } else {
            busNextSceneBtn.classList.remove("show");
        }
    }

    function resetIdleTimer() {
        clearTimeout(idleTimer);

        idleTimer = setTimeout(function () {
            vibrateVisibleAlerts();
        }, 10000);
    }

    function vibrateVisibleAlerts() {
        let visibleAlerts;

        if (currentScene === "bus") {
            visibleAlerts = document.querySelectorAll(".bus-alert-icon:not(.hide)");
        } else {
            visibleAlerts = document.querySelectorAll(".alert-icon:not(.hide)");
        }

        visibleAlerts.forEach(function (alert) {
            alert.classList.add("vibrate");
        });

        setTimeout(function () {
            visibleAlerts.forEach(function (alert) {
                alert.classList.remove("vibrate");
            });

            resetIdleTimer();
        }, 1000);
    }

    hotspots.forEach(function (hotspot) {
        hotspot.addEventListener("click", function () {
            const objectName = hotspot.dataset.object;
            openObjectScene(objectName);
        });
    });

    busHotspots.forEach(function (hotspot) {
        hotspot.addEventListener("click", function () {
            const objectName = hotspot.dataset.object;
            openBusObject(objectName);
        });
    });

    continueText.addEventListener("click", continueObjectText);

    closeObject.addEventListener("click", function () {
        closeObjectScene();
    });

    nextSceneBtn.addEventListener("click", function () {
        kitchenScene.classList.remove("active");
        kitchenScene.classList.remove("show");

        setTimeout(function () {
            busScene.classList.add("show");

            setTimeout(function () {
                busScene.classList.add("active");
                currentScene = "bus";
                resetIdleTimer();
            }, 1200);
        }, 500);
    });

    continueGirls.addEventListener("click", continueGirlConversation);

    closeBusConvo.addEventListener("click", function () {
        closeGirlsConversation();
    });

    busNextSceneBtn.addEventListener("click", function () {
        console.log("Next scene: speech viewing will go here.");
    });

    window.addEventListener("scroll", checkBottomReached);

})();

