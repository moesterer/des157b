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

    startBtn.addEventListener("click", function () {
        startBtn.textContent = "scroll down";

        setTimeout(function () {
            intro.scrollIntoView({
                behavior: "smooth",
                block: "end"
            });
        }, 300);
    });
    

})();
