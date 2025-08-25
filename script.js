document.addEventListener('DOMContentLoaded', () => {

    // ======================= STICKY HEADER =======================
    const header = document.querySelector('.main-header');
    if (header) {
        const stickyThreshold = 50;
        const handleScrollHeader = () => {
            if (window.scrollY > stickyThreshold) {
                header.classList.add('sticky-header');
            } else {
                header.classList.remove('sticky-header');
            }
        };
        window.addEventListener('scroll', handleScrollHeader);
    }

    // ======================= MOBILE NAVIGATION =======================
 const burgerMenu = document.querySelector('.burger-menu');
const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const closeMobileNavBtn = document.querySelector('.close-mobile-nav');

const toggleNav = () => {
  burgerMenu.classList.toggle('active');
  mobileNavOverlay.classList.toggle('active');
  document.body.style.overflow = mobileNavOverlay.classList.contains('active') ? 'hidden' : '';
};

if (burgerMenu && mobileNavOverlay) {
  burgerMenu.addEventListener('click', toggleNav);
  mobileNavLinks.forEach(link => link.addEventListener('click', toggleNav));
  if (closeMobileNavBtn) closeMobileNavBtn.addEventListener('click', toggleNav);

  // Also close on clicking outside nav
  mobileNavOverlay.addEventListener('click', e => {
    if (e.target === mobileNavOverlay) toggleNav();
  });
}


    // ======================= HERO SECTION INTERACTIVITY =======================
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroContent = document.querySelector('.hero-content');
        
        // --- 3D Tilt Effect ---
        const handleMouseMove = (e) => {
            if (window.innerWidth < 768) return;
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const rotateY = (clientX / innerWidth - 0.5) * 20;
            const rotateX = (0.5 - clientY / innerHeight) * 20;
            
            requestAnimationFrame(() => {
                heroContent.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1)`;
            });
        };
        window.addEventListener('mousemove', handleMouseMove);

        // --- Entrance Animation ---
        const heroObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    hero.classList.add('is-visible');
                    heroObserver.unobserve(hero);
                }
            });
        }, { threshold: 0.1 });
        heroObserver.observe(hero);
    }

    // ======================= GLOBAL SCROLL-BASED EFFECTS =======================
    const scrollElements = document.querySelectorAll('.anim-on-scroll, [data-scroll-speed]');
    
    const handleScroll = () => {
        const scrollY = window.scrollY;

        scrollElements.forEach((el, index) => {
            // --- Parallax Effect ---
            if (el.hasAttribute('data-scroll-speed') && window.innerWidth > 768) {
                const speed = parseFloat(el.getAttribute('data-scroll-speed'));
                el.style.transform = `translateY(${scrollY * speed}px)`;
            }

            // --- Footer Fade-in Effect ---
            if (el.classList.contains('anim-on-scroll')) {
                const elementTop = el.getBoundingClientRect().top;
                const isVisible = elementTop <= (window.innerHeight || document.documentElement.clientHeight) / 1.1;
                if (isVisible) {
                    el.style.transitionDelay = `${index * 0.1}s`;
                    el.classList.add('visible');
                }
            }
        });
    };

    // Initial check on page load and on scroll
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    
    // ======================= SMOOTH SCROLL FOR ALL ANCHOR LINKS =======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});

// ======================= "WHY CHOOSE US" SECTION ANIMATIONS =======================
document.addEventListener('DOMContentLoaded', () => {
    const whyChooseUsSection = document.querySelector('.why-choose-us');

    if (whyChooseUsSection) {
        // --- Scroll-triggered Entrance Animation ---
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(whyChooseUsSection);

        // --- 3D Parallax Hover for Collage Images ---
        const imageContainers = whyChooseUsSection.querySelectorAll('.image-container');
        imageContainers.forEach(container => {
            container.addEventListener('mousemove', (e) => {
                if (window.innerWidth < 992) return; // Disable on smaller screens
                
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const { width, height } = rect;
                const rotateX = (height / 2 - y) / 20; // Adjust divisor for sensitivity
                const rotateY = (x - width / 2) / 20;
                
                requestAnimationFrame(() => {
                    container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
                    container.style.zIndex = '10';
                });
            });

            container.addEventListener('mouseleave', () => {
                requestAnimationFrame(() => {
                    container.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                    container.style.zIndex = container.classList.contains('shape-2') ? '2' : '1';
                });
            });
        });

        // --- Parallax on Scroll ---
        const textPanel = whyChooseUsSection.querySelector('.text-panel');
        const collagePanel = whyChooseUsSection.querySelector('.collage-panel');
        
        window.addEventListener('scroll', () => {
            if (window.innerWidth > 992) { // Only run on desktop
                const scrollY = window.scrollY;
                const sectionTop = whyChooseUsSection.offsetTop;
                const scrollInSection = scrollY - sectionTop;

                // Move text and collage panels at different speeds when section is in view
                if (scrollInSection > -window.innerHeight && scrollInSection < whyChooseUsSection.offsetHeight) {
                    requestAnimationFrame(() => {
                        if (textPanel) {
                             textPanel.style.transform = `translateY(${scrollInSection * 0.1}px)`;
                        }
                        if (collagePanel) {
                             collagePanel.style.transform = `translateY(${scrollInSection * -0.1}px)`;
                        }
                    });
                }
            }
        });
    }
});

// ======================= SERVICES SECTION ANIMATIONS & CAROUSEL =======================
const servicesSection = document.querySelector('.services-section');
if (servicesSection) {
    // --- Scroll-triggered Entrance Animation ---
    const servicesObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                servicesSection.classList.add('is-visible');
                servicesObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    servicesObserver.observe(servicesSection);

    // --- Carousel Functionality ---
    const track = servicesSection.querySelector('.services-carousel-track');
    const prevButton = servicesSection.querySelector('.carousel-nav.prev');
    const nextButton = servicesSection.querySelector('.carousel-nav.next');

    if (track && prevButton && nextButton) {
        const updateNavButtons = () => {
            // Disable prev button at the beginning
            prevButton.disabled = track.scrollLeft <= 0;
            // Disable next button at the end
            nextButton.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1; // -1 for precision
        };

        const scrollCarousel = (direction) => {
            const card = track.querySelector('.service-card-carousel');
            if (card) {
                const cardWidth = card.offsetWidth;
                const gap = parseInt(window.getComputedStyle(track).gap, 10) || 30;
                const scrollAmount = (cardWidth + gap) * direction;
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        };

        prevButton.addEventListener('click', () => scrollCarousel(-1));
        nextButton.addEventListener('click', () => scrollCarousel(1));

        // Update buttons on scroll (including manual drag/swipe)
        track.addEventListener('scroll', updateNavButtons);

        // Initial check
        updateNavButtons();
    }

    // --- 3D Scroll Rotation Effect for Premium Cards ---
    const premiumCards = servicesSection.querySelectorAll('.service-card-premium');
    window.addEventListener('scroll', () => {
        if (window.innerWidth < 768) return; // Disable on mobile
        
        const sectionTop = servicesSection.offsetTop;
        const sectionHeight = servicesSection.offsetHeight;
        const scrollY = window.scrollY;
        
        // Check if section is in view
        if (scrollY > sectionTop - window.innerHeight && scrollY < sectionTop + sectionHeight) {
            premiumCards.forEach(card => {
                const cardRect = card.getBoundingClientRect();
                const scrollPercent = (cardRect.top + cardRect.height / 2) / window.innerHeight;
                // Rotate based on vertical position in viewport (from -10deg to 10deg)
                const rotateX = (0.5 - scrollPercent) * 20; 
                
                requestAnimationFrame(() => {
                    card.style.transform = `translateY(-10px) scale(1.02) perspective(1000px) rotateX(${rotateX}deg)`;
                });
            });
        }
    }, { passive: true });
}



// ======================= RESULTS SECTION: BEFORE & AFTER SLIDER =======================
document.addEventListener('DOMContentLoaded', () => {
    const resultsSection = document.querySelector('.results-section');
    if (!resultsSection) return;

    // --- 1. Intersection Observer for Entrance Animation ---
    const resultsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // Animate title only when section is visible
                const title = entry.target.querySelector('[data-animate-title]');
                if (title && !title.classList.contains('title-animated')) {
                    animateTitle(title);
                }
                resultsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    resultsObserver.observe(resultsSection);

    // --- 2. Title Flicker Animation ---
    function animateTitle(title) {
        const text = title.textContent;
        title.innerHTML = ''; // Clear original text
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.setAttribute('data-char', char);
            span.style.animationDelay = `${index * 0.03}s`;
            span.textContent = char === ' ' ? '\u00A0' : char; // Handle spaces
            title.appendChild(span);
        });
        title.classList.add('title-animated');
    }

    // --- 3. Interactive Comparison Slider Logic ---
    const sliders = resultsSection.querySelectorAll('.comparison-slider');

    sliders.forEach(slider => {
        let isDragging = false;
        let isTouched = false; // For mobile tap state

        const updateSliderPosition = (x) => {
            const rect = slider.getBoundingClientRect();
            let position = (x - rect.left) / rect.width;
            position = Math.max(0, Math.min(1, position)); // Clamp between 0 and 1
            slider.style.setProperty('--split-pos', `${position * 100}%`);
        };

        const onPointerDown = (e) => {
            // Check for primary button click on mouse events
            if (e.pointerType === 'mouse' && e.button !== 0) return;
            isDragging = true;
            slider.classList.add('is-dragging');
            document.body.style.cursor = 'col-resize'; // Change cursor for better UX
            updateSliderPosition(e.clientX);
        };

        const onPointerUp = () => {
            if (!isDragging) return;
            isDragging = false;
            slider.classList.remove('is-dragging');
            document.body.style.cursor = '';
        };

        const onPointerMove = (e) => {
            if (!isDragging) return;
            updateSliderPosition(e.clientX);
        };
        
        // Hover effects for desktop
        const onMouseEnter = () => slider.classList.add('is-hovered');
        const onMouseLeave = () => slider.classList.remove('is-hovered');

        // Pointer events handle both mouse and touch elegantly
        slider.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointermove', onPointerMove);
        slider.addEventListener('mouseenter', onMouseEnter);
        slider.addEventListener('mouseleave', onMouseLeave);

        // --- Mobile Tap-to-Reveal Logic ---
        slider.addEventListener('click', (e) => {
            // Only apply tap logic on touch devices, not for mouse clicks
            if (e.pointerType === 'mouse') return;
            
            // If it was a drag, don't trigger the tap-toggle
            if (slider.classList.contains('is-dragging')) return;

            isTouched = !isTouched;
            slider.classList.add('is-touched');
            slider.style.setProperty('--split-pos', isTouched ? '100%' : '0%');
        });
    });
});

// =====================Reviews section===============
const testimonials = [
        {
            photo: 'https://placehold.co/120x120/A8E6CF/ffffff',
            text: "I didn’t recognize myself — in the best way. Subtle, natural, confident!",
            name: "Sarah Q.",
            service: "Botox & PRP"
        },
        {
            photo: 'https://placehold.co/120x120/F8C8DC/000000',
            text: "Their attention to detail is insane. My skin glows even without makeup now.",
            name: "Mehwish T.",
            service: "Hydrafacial"
        },
        {
            photo: 'https://placehold.co/120x120/FFD700/ffffff',
            text: "I felt like royalty — the care, the results, the clinic vibe... 10/10.",
            name: "Areeba L.",
            service: "Carbon Peel"
        },
        {
            photo: 'https://placehold.co/120x120/A8E6CF/000000',
            text: "My fine lines are gone! The procedure was painless and the staff were wonderful.",
            name: "Hira K.",
            service: "Microneedling"
        },
        {
            photo: 'https://placehold.co/120x120/F8C8DC/ffffff',
            text: "The glow is unbelievable. It's the best my skin has ever looked.",
            name: "Jane D.",
            service: "Oxygen Facial"
        }
    ];

    let currentIndex = 0;
    const orbitalRing = document.querySelector('.orbital-ring');
    const centralOrb = document.querySelector('.central-testimonial-orb');
    const navLeft = document.querySelector('.arrow-left');
    const navRight = document.querySelector('.arrow-right');

    const updateCentralOrb = (index) => {
        const testimonial = testimonials[index];
        const photoEl = centralOrb.querySelector('.client-photo');
        const textEl = centralOrb.querySelector('.testimonial-text');
        const nameEl = centralOrb.querySelector('.client-name');
        const serviceEl = centralOrb.querySelector('.service-name');
        
        // Use a GSAP timeline for the transition
        gsap.timeline({ defaults: { ease: "power2.inOut" } })
            .to([photoEl, textEl, nameEl, serviceEl], {
                opacity: 0,
                duration: 0.3
            })
            .call(() => {
                photoEl.src = testimonial.photo;
                textEl.textContent = `"${testimonial.text}"`;
                nameEl.textContent = testimonial.name;
                serviceEl.textContent = testimonial.service;
            })
            .fromTo(photoEl, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5 })
            .fromTo(textEl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
            .fromTo([nameEl, serviceEl], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.3");
    };

    const nextTestimonial = () => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateCentralOrb(currentIndex);
    };

    const prevTestimonial = () => {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateCentralOrb(currentIndex);
    };

    // Auto-cycle every 6 seconds
    let autoCycle = setInterval(nextTestimonial, 6000);

    // Stop auto-cycle on user interaction
    const stopAutoCycle = () => {
        clearInterval(autoCycle);
        autoCycle = setInterval(nextTestimonial, 6000);
    };

    navRight.addEventListener('click', () => {
        nextTestimonial();
        stopAutoCycle();
    });

    navLeft.addEventListener('click', () => {
        prevTestimonial();
        stopAutoCycle();
    });

    // 3D Orbital Animation (Desktop Only)
    if (window.innerWidth > 768) {
        gsap.to(orbitalRing, {
            rotationY: 360,
            duration: 40,
            ease: "none",
            repeat: -1
        });

        const numCards = document.querySelectorAll('.orbiting-card').length;
        const radius = 300; // Adjust radius as needed for layout
        const angleStep = 360 / numCards;

        document.querySelectorAll('.orbiting-card').forEach((card, i) => {
            const angle = angleStep * i;
            const x = Math.sin(angle * Math.PI / 180) * radius;
            const z = Math.cos(angle * Math.PI / 180) * radius;

            gsap.set(card, {
                x: x,
                z: -z, // Use negative z for correct depth
                rotationY: -angle,
                transformOrigin: "center center"
            });

            // Make orbiting cards clickable
            card.addEventListener('click', () => {
                currentIndex = i; // Match index to the clicked card
                updateCentralOrb(currentIndex);
                stopAutoCycle();
            });
        });
    } else {
        // Mobile swipe logic (simplified slider)
        let touchstartX = 0;
        let touchendX = 0;
        const orb = document.querySelector('.central-testimonial-orb');

        orb.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenX;
        });

        orb.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenX;
            handleGesture();
        });

        function handleGesture() {
            if (touchendX < touchstartX) {
                nextTestimonial();
                stopAutoCycle();
            }
            if (touchendX > touchstartX) {
                prevTestimonial();
                stopAutoCycle();
            }
        }
    }

    // Initial load
    window.onload = () => {
        updateCentralOrb(currentIndex);
    };

    // =================contact=================
    gsap.registerPlugin(ScrollTrigger);

    document.addEventListener('DOMContentLoaded', () => {
        const contactSection = document.getElementById('contact-luxe-section');
        const mainContainer = document.querySelector('.main-layout-container');
        const headline = document.querySelector('.section-headline');
        const subtext = document.querySelector('.section-subtext');
        const contactCard = document.querySelector('.contact-card');
        const bookingCta = document.querySelector('.booking-cta');
        const bookingModal = document.getElementById('booking-modal');
        const closeModalBtn = document.querySelector('.modal-close-btn');
        const modalContent = document.querySelector('.modal-content');

        // Cinematic scroll-triggered animation for the entire section
        gsap.from(mainContainer, {
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: contactSection,
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });

        // Staggered fade-in for the text elements
        gsap.from([headline, subtext], {
            opacity: 0,
            y: 30,
            stagger: 0.5,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: contactSection,
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });

        // Floating animation for the contact card
        gsap.to(contactCard, {
            y: -10,
            duration: 2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });

        // Interactive 3D lighting effect based on mouse position
        contactSection.addEventListener('mousemove', (e) => {
            const rect = contactCard.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotationY = x * 0.05;
            const rotationX = -y * 0.05;

            gsap.to(contactCard, {
                rotationY: rotationY,
                rotationX: rotationX,
                ease: "power2.out",
                duration: 0.5
            });
        });

        // Show modal on button click
        bookingCta.addEventListener('click', () => {
            bookingModal.style.display = 'flex';
            gsap.to(bookingModal, { opacity: 1, duration: 0.3 });
            gsap.fromTo(modalContent, {
                opacity: 0,
                scale: 0.8,
                y: 50
            }, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.5,
                ease: "back.out(1.7)"
            });
        });

        // Close modal on close button click
        closeModalBtn.addEventListener('click', () => {
            gsap.to(modalContent, {
                opacity: 0,
                scale: 0.8,
                y: 50,
                duration: 0.4,
                ease: "power2.in",
                onComplete: () => {
                    bookingModal.style.display = 'none';
                    bookingModal.style.opacity = '0';
                }
            });
        });

        // Close modal on outside click
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                gsap.to(modalContent, {
                    opacity: 0,
                    scale: 0.8,
                    y: 50,
                    duration: 0.1,
                    ease: "power2.in",
                    onComplete: () => {
                        bookingModal.style.display = 'none';
                        bookingModal.style.opacity = '0';
                    }
                });
            }
        });
    });