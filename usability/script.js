(function () {
    "use strict";
    history.scrollRestoration = "manual";

    document.body.classList.remove("lock-scroll");

    const savedScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);

    setTimeout(function () {
        document.documentElement.style.scrollBehavior = savedScrollBehavior;
    }, 50);

    window.addEventListener("beforeunload", function () {
        window.scrollTo(0, 0);
    });

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
    const dialogueBox = document.querySelector("#dialogue-box");
    const dialogueText = document.querySelector("#dialogue-text");
    const continueText = document.querySelector("#continue-text");
    const closeObject = document.querySelector("#close-object");

    const speechScene = document.querySelector("#speech-scene");
    const speechBackground = document.querySelector("#speech-background");
    const speechBox = document.querySelector("#speech-box");
    const speechText = document.querySelector("#speech-text");
    const continueSpeech = document.querySelector("#continue-speech");
    const speechFlashes = [
        document.querySelector("#speech-flash-smile"),
        document.querySelector("#speech-flash-liar"),
        document.querySelector("#speech-flash-orange")
    ];
    const dingText = document.querySelector("#ding-text");

    const phoneScene = document.querySelector("#phone-scene");
    const phoneBackground = document.querySelector("#phone-background");
    const depositHotspot = document.querySelector("#deposit-hotspot");
    const depositAlert = document.querySelector("#deposit-alert");

    const finalScene = document.querySelector("#final-scene");
    const finalTitle = document.querySelector("#final-title");
    const finalQuestion = document.querySelector("#final-question");

    const introOverlay = document.querySelector("#intro-overlay");
    const closeOverlay = document.querySelector("#close-overlay");

    let bottomTransitionStarted = false;
    let currentTyped = null;
    let currentObject = null;
    let currentSentence = 0;
    let idleTimer = null;

    let currentScene = "kitchen";
    let currentGirlPair = 0;
    let girlTypedOne = null;
    let girlTypedTwo = null;
    let objectTextIsTyping = false;
    let girlTextIsTyping = false;
    let currentSpeechLine = 0;
    let speechTyped = null;
    let speechTextIsTyping = false;
    let speechFlashTimer = null;
    let currentSpeechFlash = 0;
    let finalTyped = null;

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

    const speechLines = [
        "My beloved citizens, today we gather not only to celebrate another year of national strength, but another year of life made possible by our great Republic.",
        "There was a time before my leadership when illness decided a person’s future. Age took parents from children. Weak leaders rose, failed, and disappeared. Elections brought chaos. Parties fought while families suffered.",
        "But we chose a different path.",
        "Through discipline, sacrifice, and faith in one national vision, we turned aging from a sentence into a system. We turned sickness from fate into a payment plan. We gave every citizen the chance to earn more time.",
        "I know some say the treatments are costly. I hear your concerns. I carry them with me. But greatness has never been free. Time is precious because it must be earned.",
        "For those who work, save, the future remains open. Three years. Five years. Another chance to serve your family. Another chance to serve your country.",
        "And to those who question why I continue to lead, I ask: who else has stood with you through every crisis? Who else remembers the old world? Who else has lived long enough to understand the cost of disorder?",
        "I do not remain for myself. I remain because the nation still needs memory. I remain because stability is mercy. I remain because every child deserves to wake beneath the same flag, the same promise, the same steady hand.",
        "Today, on this day of unity, I renew my promise to you. As long as I breathe, this nation will not fall backward. As long as I stand, your sacrifices will have meaning. As long as you remain faithful, time itself may still be within your reach.",
        "Long life to the Republic. Long life to its people. Long life to our shared future."
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

    closeOverlay.addEventListener("click", function () {
        introOverlay.classList.add("hide");
    });

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

                                document.body.classList.remove("lock-scroll");

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
        objectTextIsTyping = true;

        currentTyped = new Typed("#dialogue-text", {
            strings: [objectData.sentences[currentSentence]],
            typeSpeed: 18,
            backSpeed: 0,
            showCursor: false,
            loop: false,

            onComplete: function () {
                objectTextIsTyping = false;
            }
        });
    }

    function revealCurrentSentence() {
        const objectData = objectScripts[currentObject];

        if (currentTyped) {
            currentTyped.destroy();
            currentTyped = null;
        }

        dialogueText.textContent = objectData.sentences[currentSentence];
        objectTextIsTyping = false;
    }

    function continueObjectText() {
        const objectData = objectScripts[currentObject];

        if (objectTextIsTyping) {
            revealCurrentSentence();
            return;
        }

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

        objectTextIsTyping = false;

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
        girlTextIsTyping = true;

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
                    loop: false,

                    onComplete: function () {
                        girlTextIsTyping = false;
                    }
                });
            }
        });
    }

    function revealCurrentGirlPair() {
        if (girlTypedOne) {
            girlTypedOne.destroy();
            girlTypedOne = null;
        }

        if (girlTypedTwo) {
            girlTypedTwo.destroy();
            girlTypedTwo = null;
        }

        girlOneText.textContent = girlDialogue[currentGirlPair][0];
        girlTwoText.textContent = girlDialogue[currentGirlPair][1];
        girlTextIsTyping = false;
    }

    function continueGirlConversation() {
        if (girlTextIsTyping) {
            revealCurrentGirlPair();
            return;
        }

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
        girlTextIsTyping = false;

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

    function openSpeechScene() {
        clearTimeout(idleTimer);

        busScene.classList.remove("active");
        busScene.classList.remove("show");
        currentScene = "speech";

        currentSpeechLine = 0;
        speechBox.classList.remove("hide");
        speechScene.classList.add("show");

        updateSpeechBackground();
        startSpeechFlashes();
        typeSpeechLine();
    }

    function updateSpeechBackground() {
        const currentLine = speechLines[currentSpeechLine];

        if (currentLine === "I do not remain for myself. I remain because the nation still needs memory. I remain because stability is mercy. I remain because every child deserves to wake beneath the same flag, the same promise, the same steady hand.") {
            speechBackground.src = "images/speech2.jpg";
        } else if (currentLine === "Long life to the Republic. Long life to its people. Long life to our shared future.") {
            speechBackground.src = "images/speech3.jpg";
        } else {
            speechBackground.src = "images/speech.gif";
        }
    }

    function typeSpeechLine() {
        if (speechTyped) {
            speechTyped.destroy();
            speechTyped = null;
        }

        updateSpeechBackground();

        speechText.textContent = "";
        speechTextIsTyping = true;

        speechTyped = new Typed("#speech-text", {
            strings: [speechLines[currentSpeechLine]],
            typeSpeed: 18,
            backSpeed: 0,
            showCursor: false,
            loop: false,

            onComplete: function () {
                speechTextIsTyping = false;
            }
        });
    }

    function revealSpeechLine() {
        if (speechTyped) {
            speechTyped.destroy();
            speechTyped = null;
        }

        speechText.textContent = speechLines[currentSpeechLine];
        speechTextIsTyping = false;
    }

    function continueSpeechText() {
        if (speechTextIsTyping) {
            revealSpeechLine();
            return;
        }

        currentSpeechLine++;

        if (currentSpeechLine >= speechLines.length) {
            closeSpeechText();
            return;
        }

        typeSpeechLine();
    }

    function closeSpeechText() {
        if (speechTyped) {
            speechTyped.destroy();
            speechTyped = null;
        }

        speechTextIsTyping = false;
        speechText.textContent = "";
        speechBox.classList.add("hide");
        stopSpeechFlashes();
        playDingThenPhoneScene();
    }

    function playDingThenPhoneScene() {
        dingText.classList.remove("play");
        void dingText.offsetWidth;
        dingText.classList.add("play");

        setTimeout(function () {
            dingText.classList.remove("play");
            openPhoneScene();
        }, 2000);
    }

    function openPhoneScene() {
        speechScene.classList.remove("show");
        phoneBackground.src = "images/phone.jpg";
        depositAlert.classList.remove("hide");
        phoneScene.classList.add("show");
        currentScene = "phone";

        setTimeout(function () {
            phoneScene.classList.add("active");
            resetIdleTimer();
        }, 1000);
    }

    function completeDepositInteraction() {
        clearTimeout(idleTimer);
        phoneScene.classList.remove("active");
        depositAlert.classList.add("hide");
        phoneBackground.src = "images/phone2.jpg";

        setTimeout(function () {
            openFinalScene();
        }, 4000);
    }

    function openFinalScene() {
        phoneScene.classList.remove("show");

        if (finalTyped) {
            finalTyped.destroy();
            finalTyped = null;
        }

        finalTitle.textContent = "";
        finalTitle.style.display = "block";
        finalTitle.style.fontSize = "200px";

        finalQuestion.textContent = "";
        finalQuestion.classList.remove("show");

        finalScene.classList.remove("fade-away");
        finalScene.classList.add("show");

        currentScene = "final";

        finalTyped = new Typed("#final-title", {
            strings: [
                "longevity",
                "who wants to live forever?"
            ],
            typeSpeed: 70,
            backSpeed: 45,
            backDelay: 4000,
            smartBackspace: true,
            showCursor: false,
            loop: false,

            preStringTyped: function (arrayPos) {
                if (arrayPos === 0) {
                    finalTitle.style.fontSize = "200px";
                }

                if (arrayPos === 1) {
                    finalTitle.style.fontSize = "150px";
                }
            },

            onComplete: function () {
                setTimeout(function () {
                    fadeBackToBeginning();
                }, 5000);
            }
        });
    }

    function fadeBackToBeginning() {
        finalScene.classList.add("fade-away");

        setTimeout(function () {
            resetToBeginning();
        }, 2200);
    }

    function resetToBeginning() {
        clearTimeout(idleTimer);
        stopSpeechFlashes();

        if (currentTyped) {
            currentTyped.destroy();
            currentTyped = null;
        }

        if (girlTypedOne) {
            girlTypedOne.destroy();
            girlTypedOne = null;
        }

        if (girlTypedTwo) {
            girlTypedTwo.destroy();
            girlTypedTwo = null;
        }

        if (speechTyped) {
            speechTyped.destroy();
            speechTyped = null;
        }

        if (finalTyped) {
            finalTyped.destroy();
            finalTyped = null;
        }

        clickedObjects.picture = false;
        clickedObjects.calendar = false;
        clickedBusObjects.girls = false;
        clickedBusObjects.magazine = false;

        bottomTransitionStarted = false;
        currentObject = null;
        currentSentence = 0;
        currentGirlPair = 0;
        currentSpeechLine = 0;
        objectTextIsTyping = false;
        girlTextIsTyping = false;
        speechTextIsTyping = false;
        currentScene = "kitchen";

        startBtn.textContent = "click to start";

        todayText.style.display = "block";
        todayText.classList.remove("fade-out");
        unityText.textContent = "";
        unityText.classList.remove("show");

        transitionLayer.classList.remove("show");

        storyPage.classList.remove("fade-away");

        kitchenScene.classList.remove("show");
        kitchenScene.classList.remove("active");

        busScene.classList.remove("show");
        busScene.classList.remove("active");

        objectScene.classList.remove("show");

        girlsConversation.classList.remove("show");
        closeBusConvo.classList.remove("show");

        speechScene.classList.remove("show");
        speechBox.classList.remove("hide");
        speechText.textContent = "";
        speechBackground.src = "images/speech.gif";

        phoneScene.classList.remove("show");
        phoneScene.classList.remove("active");
        phoneBackground.src = "images/phone.jpg";

        finalScene.classList.remove("show");
        finalScene.classList.remove("fade-away");
        finalTitle.textContent = "";
        finalTitle.style.fontSize = "200px";
        finalQuestion.textContent = "";
        finalQuestion.classList.remove("show");

        pictureAlert.classList.remove("hide");
        calendarAlert.classList.remove("hide");
        girlsAlert.classList.remove("hide");
        magazineAlert.classList.remove("hide");
        depositAlert.classList.remove("hide");

        nextSceneBtn.classList.remove("show");
        busNextSceneBtn.classList.remove("show");

        girlOneText.textContent = "";
        girlTwoText.textContent = "";
        dialogueText.textContent = "";

        document.body.classList.remove("lock-scroll");

        document.body.classList.remove("lock-scroll");

        const oldScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
            
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
            
        requestAnimationFrame(function () {
            window.scrollTo(0, 0);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        });
        
        setTimeout(function () {
            window.scrollTo(0, 0);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            document.documentElement.style.scrollBehavior = oldScrollBehavior;
        }, 100);
    }

    function startSpeechFlashes() {
        stopSpeechFlashes();

        currentSpeechFlash = 0;

        speechFlashTimer = setInterval(function () {
            showSpeechFlash(currentSpeechFlash);
            currentSpeechFlash++;

            if (currentSpeechFlash >= speechFlashes.length) {
                currentSpeechFlash = 0;
            }
        }, 4000);
    }

    function showSpeechFlash(index) {
        speechFlashes.forEach(function (flash) {
            flash.classList.remove("show");
        });

        const currentFlash = speechFlashes[index];

        if (currentFlash) {
            currentFlash.classList.add("show");

            setTimeout(function () {
                currentFlash.classList.remove("show");
            }, 1200);
        }
    }

    function stopSpeechFlashes() {
        if (speechFlashTimer) {
            clearInterval(speechFlashTimer);
            speechFlashTimer = null;
        }

        speechFlashes.forEach(function (flash) {
            flash.classList.remove("show");
        });
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
        } else if (currentScene === "phone") {
            visibleAlerts = document.querySelectorAll(".phone-alert-icon:not(.hide)");
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
        }, 800);
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

    pictureAlert.addEventListener("click", function () {
        openObjectScene("picture");
    });

    calendarAlert.addEventListener("click", function () {
        openObjectScene("calendar");
    });

    girlsAlert.addEventListener("click", function () {
        openBusObject("girls");
    });

    magazineAlert.addEventListener("click", function () {
        openBusObject("magazine");
    });

    dialogueBox.addEventListener("click", continueObjectText);

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

    girlsConversation.addEventListener("click", continueGirlConversation);

    continueGirls.addEventListener("click", function (event) {
        event.stopPropagation();
        continueGirlConversation();
    });

    closeBusConvo.addEventListener("click", function () {
        closeGirlsConversation();
    });

    busNextSceneBtn.addEventListener("click", function () {
        openSpeechScene();
    });

    speechBox.addEventListener("click", continueSpeechText);

    continueSpeech.addEventListener("click", function (event) {
        event.stopPropagation();
        continueSpeechText();
    });

    depositHotspot.addEventListener("click", completeDepositInteraction);

    depositAlert.addEventListener("click", completeDepositInteraction);

    window.addEventListener("scroll", checkBottomReached);

})();

