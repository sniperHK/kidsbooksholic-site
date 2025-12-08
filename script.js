// Scroll animation for chapters
const chapters = document.querySelectorAll('.chapter');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

chapters.forEach(chapter => {
    observer.observe(chapter);
});

// Smooth scroll on cover click
const scrollHint = document.querySelector('.scroll-hint');
if (scrollHint) {
    scrollHint.addEventListener('click', () => {
        const chapter1 = document.querySelector('#chapter-1');
        if (chapter1) {
            chapter1.scrollIntoView({ behavior: 'smooth' });
        }
    });
}
