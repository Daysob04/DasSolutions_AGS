document.addEventListener("DOMContentLoaded", () => {

    console.log("ICS Web iniciado correctamente");

});





const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}












/* ========================================
   MENÚ DE NAVEGACIÓN MÓVIL
======================================== */

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';

        menuToggle.setAttribute('aria-expanded', String(!isOpen));
        menuToggle.setAttribute(
            'aria-label',
            isOpen ? 'Abrir menú' : 'Cerrar menú'
        );

        mainNav.classList.toggle('is-open', !isOpen);
    });

    mainNav.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menú');
            mainNav.classList.remove('is-open');
        });
    });
}











/* =========================================================
   ANIMACIONES AL HACER SCROLL
   ========================================================= */

const revealElements = document.querySelectorAll('.reveal-on-scroll');

if (revealElements.length) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
}
















/* =========================================
   EXPERIENCIA PROFESIONAL - CARRUSEL
========================================= */

(() => {
    const carousel = document.querySelector(
        "#experienceFormationCarousel"
    );

    if (!carousel) return;

    const track = carousel.querySelector(
        ".experience-formation-track"
    );

    const cards = Array.from(
        track.querySelectorAll(".experience-credential-card")
    );

    const prevButton = document.querySelector(
        "#experienceFormationPrev"
    );

    const nextButton = document.querySelector(
        "#experienceFormationNext"
    );

    const pagination = document.querySelector(
        "#experienceFormationPagination"
    );

    if (!track || !cards.length || !prevButton ||
        !nextButton || !pagination) return;

    let currentIndex = 0;
    let visibleCards = 3;
    let maxIndex = 0;

    const getVisibleCards = () => {
        if (window.innerWidth <= 576) return 1;
        if (window.innerWidth <= 800) return 2;
        return 3;
    };

    const updateCarousel = () => {
        visibleCards = getVisibleCards();
        maxIndex = Math.max(0, cards.length - visibleCards);
        currentIndex = Math.min(currentIndex, maxIndex);

        const gap = parseFloat(
            window.getComputedStyle(track).gap
        ) || 0;

        const cardWidth = cards[0].getBoundingClientRect().width;
        const offset = currentIndex * (cardWidth + gap);

        track.style.transform = `translateX(-${offset}px)`;

        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= maxIndex;

        pagination.querySelectorAll("button").forEach(
            (dot, index) => {
                const active = index === currentIndex;

                dot.classList.toggle("is-active", active);
                dot.setAttribute("aria-current",
                    active ? "true" : "false"
                );
                dot.setAttribute(
                    "aria-label",
                    `Mostrar conjunto ${index + 1}`
                );
            }
        );
    };

    const goTo = (index) => {
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        updateCarousel();
    };

    const pageCount = () => {
        return Math.max(1, cards.length - getVisibleCards() + 1);
    };

    const buildPagination = () => {
        pagination.innerHTML = "";

        for (let index = 0; index < pageCount(); index++) {
            const dot = document.createElement("button");

            dot.type = "button";
            dot.className = "experience-formation-dot";
            dot.setAttribute("aria-label",
                `Mostrar conjunto ${index + 1}`
            );

            dot.addEventListener("click", () => goTo(index));
            pagination.appendChild(dot);
        }

        updateCarousel();
    };

    prevButton.addEventListener("click", () => {
        goTo(currentIndex - 1);
    });

    nextButton.addEventListener("click", () => {
        goTo(currentIndex + 1);
    });

    let resizeTimer;

    window.addEventListener("resize", () => {
        window.clearTimeout(resizeTimer);

        resizeTimer = window.setTimeout(() => {
            buildPagination();
        }, 120);
    });

    buildPagination();
})();