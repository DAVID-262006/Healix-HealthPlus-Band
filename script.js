document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Mobile Navigation Toggle (FIX: Required for phone menu access) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            // Toggles the 'active' class used by the CSS media query to show/hide the menu
            nav.classList.toggle('active');
        });

        // Close menu when a link is clicked (on mobile)
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            });
        });
    }

    // --- 2. Advanced Scroll Reveal Logic ---
    const sectionsToAnimate = document.querySelectorAll(
        '.scroll-hidden, #hero .hero-content'
    );

    const observerOptions = {
        root: null,
        threshold: 0.1, 
        rootMargin: "0px"
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });

    // --- 3. Subtle 3D Parallax Effect (Desktop Only Fix) ---
    
    const heroSection = document.getElementById('hero');
    const bandVisual = document.querySelector('.hero-band-visual');

    // FIX: Only run the complex mousemove parallax on larger screens (Desktop)
    if (heroSection && bandVisual && window.innerWidth > 768) { 
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const offsetX = (e.clientX - centerX) / (rect.width / 2);
            const offsetY = (e.clientY - centerY) / (rect.height / 2);

            const rotateY = -offsetX * 7;
            const rotateX = offsetY * 7;
            const translateX = offsetX * 10;
            const translateY = offsetY * 10;
            
            bandVisual.style.transform = `
                translateY(-50%) 
                perspective(1000px) 
                rotateY(${rotateY}deg) 
                rotateX(${rotateX}deg)
                translateX(${translateX}px)
                translateY(${translateY}px)
            `;
        });
        
        heroSection.addEventListener('mouseleave', () => {
             bandVisual.style.transform = `
                translateY(-50%) 
                perspective(1000px) 
                rotateY(0deg) 
                rotateX(0deg)
                translateX(0px)
                translateY(0px)
            `;
        });
    }

});