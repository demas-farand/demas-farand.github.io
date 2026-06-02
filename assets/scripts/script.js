window.addEventListener('load', () => {
    const splashScreen = document.getElementById('splash-screen');
    setTimeout(() => { splashScreen.classList.add('fade-out'); }, 2200); 
});

document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');
    const parallaxTargets = document.querySelectorAll('.parallax-target');
    const dynamicBg = document.getElementById('dynamic-bg');
    
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            pages.forEach(page => page.classList.remove('active'));
            const targetPage = document.getElementById(targetId);
            if (targetPage) {
                targetPage.classList.add('active');
                parallaxTargets.forEach(target => { target.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)'; });
            }
        });
    });

    const cards = document.querySelectorAll('.stack-card');
    const btnNext = document.querySelector('.arrow-next');
    const btnPrev = document.querySelector('.arrow-prev');
    let currentCardIndex = 0;

    function updateCarousel() {
        cards.forEach((card, index) => {
            card.classList.remove('active', 'next', 'next-next', 'hidden');
            if (index === currentCardIndex) {
                card.classList.add('active');
                dynamicBg.style.backgroundImage = `url('${card.querySelector('.card-bg').src}')`;
            } else if (index === (currentCardIndex + 1) % cards.length) {
                card.classList.add('next');
            } else if (index === (currentCardIndex + 2) % cards.length) {
                card.classList.add('next-next');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    updateCarousel();

    btnNext.addEventListener('click', () => { currentCardIndex = (currentCardIndex + 1) % cards.length; updateCarousel(); });
    btnPrev.addEventListener('click', () => { currentCardIndex = (currentCardIndex - 1 + cards.length) % cards.length; updateCarousel(); });

    document.addEventListener('mousemove', (e) => {
        const activePage = document.querySelector('.page.active');
        if (!activePage) return;
        const target = activePage.querySelector('.parallax-target');
        if (!target) return;
        const xAxis = (window.innerWidth / 2 - e.pageX) / (window.innerWidth / 2);
        const yAxis = (window.innerHeight / 2 - e.pageY) / (window.innerHeight / 2);
        target.style.transform = `perspective(1200px) rotateX(${yAxis * 10}deg) rotateY(${-xAxis * 10}deg)`;
    });

    document.addEventListener('mouseleave', () => {
        parallaxTargets.forEach(target => { target.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)'; });
    });
});