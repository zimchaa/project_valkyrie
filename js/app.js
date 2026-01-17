/**
 * Project Valkyrie - Custom Interactions
 * Vodafone Foundation Disaster Response Presentation
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function() {
        initPresentation();
    });

    function initPresentation() {
        // Add active class handling for animations
        const api = impress();

        // Track slide transitions
        api.init();

        // Add event listeners for slide changes
        document.addEventListener('impress:stepenter', handleSlideEnter);
        document.addEventListener('impress:stepleave', handleSlideLeave);

        // Keyboard shortcuts
        document.addEventListener('keydown', handleKeyboard);

        // Add touch gestures for mobile
        addTouchGestures();

        // Preload transitions
        preloadTransitions();

        // Add progress indicator
        addProgressIndicator();

        console.log('Project Valkyrie presentation initialized');
    }

    /**
     * Handle slide enter events
     */
    function handleSlideEnter(event) {
        const step = event.target;
        const stepId = step.id;

        // Add active class for animations
        step.classList.add('active');

        // Trigger specific animations based on slide
        switch(stepId) {
            case 'title':
                animateTitleSlide(step);
                break;
            case 'problem':
                animateProblemStats(step);
                break;
            case 'architecture':
                animateArchitecture(step);
                break;
            case 'workflow':
                animateTimeline(step);
                break;
            case 'impact':
                animateImpactStats(step);
                break;
            case 'closing':
                animateClosing(step);
                break;
        }

        // Update progress
        updateProgress();
    }

    /**
     * Handle slide leave events
     */
    function handleSlideLeave(event) {
        const step = event.target;
        step.classList.remove('active');
    }

    /**
     * Animate title slide
     */
    function animateTitleSlide(slide) {
        const logo = slide.querySelector('.vodafone-logo');
        const title = slide.querySelector('.hero-title');
        const subtitle = slide.querySelector('.hero-subtitle');
        const tagline = slide.querySelector('.hero-tagline');

        if (logo) {
            setTimeout(() => logo.style.opacity = '1', 100);
        }
        if (title) {
            setTimeout(() => title.style.opacity = '1', 300);
        }
        if (subtitle) {
            setTimeout(() => subtitle.style.opacity = '1', 600);
        }
        if (tagline) {
            setTimeout(() => tagline.style.opacity = '1', 900);
        }
    }

    /**
     * Animate problem statistics with counter effect
     */
    function animateProblemStats(slide) {
        const statNumbers = slide.querySelectorAll('.stat-number');

        statNumbers.forEach((stat, index) => {
            setTimeout(() => {
                const finalValue = stat.textContent;
                animateCounter(stat, finalValue);
            }, index * 200);
        });
    }

    /**
     * Counter animation for numbers
     */
    function animateCounter(element, finalValue) {
        const isNumber = !isNaN(parseFloat(finalValue));

        if (!isNumber) {
            // For text values like "Zero", just fade in
            element.style.opacity = '0';
            setTimeout(() => {
                element.style.transition = 'opacity 0.5s';
                element.style.opacity = '1';
            }, 100);
            return;
        }

        const duration = 1000;
        const steps = 30;
        const increment = parseFloat(finalValue) / steps;
        let current = 0;
        let step = 0;

        element.textContent = '0';

        const timer = setInterval(() => {
            step++;
            current += increment;

            if (step >= steps) {
                element.textContent = finalValue;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, duration / steps);
    }

    /**
     * Animate architecture diagram
     */
    function animateArchitecture(slide) {
        const coreLayer = slide.querySelector('.core-layer');
        const arrows = slide.querySelectorAll('.arrow');
        const modules = slide.querySelectorAll('.module-card');

        if (coreLayer) {
            setTimeout(() => {
                coreLayer.style.transform = 'scale(1)';
                coreLayer.style.opacity = '1';
            }, 200);
        }

        arrows.forEach((arrow, index) => {
            setTimeout(() => {
                arrow.style.opacity = '1';
                arrow.style.transform = 'scaleY(1)';
            }, 600 + (index * 100));
        });

        modules.forEach((module, index) => {
            setTimeout(() => {
                module.style.opacity = '1';
                module.style.transform = 'translateY(0)';
            }, 1000 + (index * 150));
        });
    }

    /**
     * Animate workflow timeline
     */
    function animateTimeline(slide) {
        const items = slide.querySelectorAll('.timeline-item');

        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 300);
        });
    }

    /**
     * Animate impact statistics
     */
    function animateImpactStats(slide) {
        const impactNumbers = slide.querySelectorAll('.impact-number');

        impactNumbers.forEach((stat, index) => {
            setTimeout(() => {
                stat.style.opacity = '1';
                stat.style.transform = 'scale(1)';
            }, index * 300);
        });
    }

    /**
     * Animate closing slide
     */
    function animateClosing(slide) {
        const emblem = slide.querySelector('.emblem-circle');

        if (emblem) {
            setTimeout(() => {
                emblem.style.transform = 'scale(1) rotate(360deg)';
                emblem.style.opacity = '1';
            }, 500);
        }
    }

    /**
     * Handle keyboard shortcuts
     */
    function handleKeyboard(event) {
        // 'h' for help/hint toggle
        if (event.key === 'h' || event.key === 'H') {
            toggleHint();
        }

        // 'o' for overview
        if (event.key === 'o' || event.key === 'O') {
            impress().goto('overview');
        }

        // '0' to go to start
        if (event.key === '0') {
            impress().goto('title');
        }
    }

    /**
     * Toggle navigation hint visibility
     */
    function toggleHint() {
        const hint = document.querySelector('.hint');
        if (hint) {
            hint.style.display = hint.style.display === 'none' ? 'block' : 'none';
        }
    }

    /**
     * Add touch gestures for mobile devices
     */
    function addTouchGestures() {
        let touchStartX = 0;
        let touchStartY = 0;

        document.addEventListener('touchstart', function(event) {
            touchStartX = event.touches[0].clientX;
            touchStartY = event.touches[0].clientY;
        });

        document.addEventListener('touchend', function(event) {
            const touchEndX = event.changedTouches[0].clientX;
            const touchEndY = event.changedTouches[0].clientY;

            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            // Swipe left - next slide
            if (deltaX < -50 && Math.abs(deltaY) < 50) {
                impress().next();
            }

            // Swipe right - previous slide
            if (deltaX > 50 && Math.abs(deltaY) < 50) {
                impress().prev();
            }

            // Swipe up - overview
            if (deltaY < -50 && Math.abs(deltaX) < 50) {
                impress().goto('overview');
            }
        });
    }

    /**
     * Preload transition effects
     */
    function preloadTransitions() {
        // Set initial states for animated elements
        const style = document.createElement('style');
        style.textContent = `
            .core-layer {
                transform: scale(0.8);
                opacity: 0;
                transition: all 0.6s ease-out;
            }

            .arrow {
                opacity: 0;
                transform: scaleY(0);
                transform-origin: top;
                transition: all 0.4s ease-out;
            }

            .module-card {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.5s ease-out;
            }

            .timeline-item {
                opacity: 0;
                transform: translateX(-30px);
                transition: all 0.5s ease-out;
            }

            .impact-number {
                opacity: 0;
                transform: scale(0.5);
                transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
            }

            .emblem-circle {
                transform: scale(0.5) rotate(0deg);
                opacity: 0;
                transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
            }

            .vodafone-logo,
            .hero-title,
            .hero-subtitle,
            .hero-tagline {
                opacity: 0;
                transition: opacity 0.8s ease-out;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Add progress indicator
     */
    function addProgressIndicator() {
        const progress = document.createElement('div');
        progress.className = 'progress-indicator';
        progress.innerHTML = '<div class="progress-bar"></div>';

        const style = document.createElement('style');
        style.textContent = `
            .progress-indicator {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: rgba(255, 255, 255, 0.1);
                z-index: 1000;
            }

            .progress-bar {
                height: 100%;
                background: linear-gradient(90deg, #E60000 0%, #00B0CA 100%);
                width: 0%;
                transition: width 0.3s ease;
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(progress);
    }

    /**
     * Update progress bar
     */
    function updateProgress() {
        const steps = document.querySelectorAll('.step:not(#overview)');
        const activeStep = document.querySelector('.step.active');

        if (!activeStep || activeStep.id === 'overview') {
            return;
        }

        const currentIndex = Array.from(steps).indexOf(activeStep);
        const progress = ((currentIndex + 1) / steps.length) * 100;

        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    }

    /**
     * Auto-hide hint after initial view
     */
    setTimeout(function() {
        const hint = document.querySelector('.hint');
        if (hint) {
            hint.style.opacity = '0.7';
        }
    }, 5000);

    // Fade out hint completely after 10 seconds
    setTimeout(function() {
        const hint = document.querySelector('.hint');
        if (hint) {
            hint.style.transition = 'opacity 2s';
            hint.style.opacity = '0';

            // Hide but keep in DOM for toggle
            setTimeout(() => {
                hint.style.display = 'none';
            }, 2000);
        }
    }, 10000);

})();
