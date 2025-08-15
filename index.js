  document.addEventListener('DOMContentLoaded', function() {
            // Cache DOM elements for better performance
            const cards = document.querySelectorAll('.card');
            const profileImg = document.querySelector('.img');
            const authInfo = document.querySelector('.auth-info');
            const techImages = document.querySelectorAll('.about-image-container');
            const highlights = document.querySelectorAll('.about-highlight');
            const aboutTitle = document.querySelector('.about-title');
            const featureItems = document.querySelectorAll('.features li');
            
            // Throttle function for performance
            function throttle(func, limit) {
                let inThrottle;
                return function() {
                    const args = arguments;
                    const context = this;
                    if (!inThrottle) {
                        func.apply(context, args);
                        inThrottle = true;
                        setTimeout(() => inThrottle = false, limit);
                    }
                }
            }
            
            // Card hover effects - removed translateY animation
            cards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    // Only visual effects, no position changes
                });
                
                card.addEventListener('mouseleave', function() {
                    // Reset any visual effects
                });
            });

            // Enhanced profile image with parallax effect
            if (profileImg) {
                const handleMouseMove = throttle(function(e) {
                    const { clientX, clientY } = e;
                    const { innerWidth, innerHeight } = window;
                    
                    const xPos = (clientX / innerWidth - 0.5) * 5;
                    const yPos = (clientY / innerHeight - 0.5) * 5;
                    
                    profileImg.style.transform = `translate(${xPos}px, ${yPos}px)`;
                }, 16);
                
                document.addEventListener('mousemove', handleMouseMove);
                
                profileImg.addEventListener('mouseenter', function() {
                    this.style.transform += ' scale(1.05)';
                });
                
                profileImg.addEventListener('mouseleave', function() {
                    this.style.transform = 'translate(0px, 0px) scale(1)';
                });
            }

            // Click ripple effect for cards
            cards.forEach(card => {
                card.addEventListener('click', function(e) {
                    const rect = this.getBoundingClientRect();
                    const ripple = document.createElement('div');
                    ripple.style.cssText = `
                        position: absolute;
                        border-radius: 50%;
                        background: rgba(34, 197, 94, 0.3);
                        width: 20px;
                        height: 20px;
                        left: ${e.clientX - rect.left - 10}px;
                        top: ${e.clientY - rect.top - 10}px;
                        transform: scale(0);
                        pointer-events: none;
                        z-index: 10;
                    `;
                    
                    this.appendChild(ripple);
                    
                    // Animate ripple
                    ripple.animate([
                        { transform: 'scale(0)', opacity: 1 },
                        { transform: 'scale(4)', opacity: 0 }
                    ], {
                        duration: 600,
                        easing: 'ease-out'
                    }).onfinish = () => ripple.remove();
                });
            });

            // Interactive gradient background that follows mouse
            let mouseX = 0.5, mouseY = 0.5;
            
            const updateBackground = throttle(function(e) {
                mouseX = e.clientX / window.innerWidth;
                mouseY = e.clientY / window.innerHeight;
                
                document.body.style.background = `
                    radial-gradient(circle at ${mouseX * 100}% ${mouseY * 100}%, 
                    rgba(34, 197, 94, 0.08) 0%, 
                    rgba(10, 10, 10, 1) 50%), #0a0a0a
                `;
            }, 50);
            
            document.addEventListener('mousemove', updateBackground);

            // Tech stack tooltips
            // const techNames = ['HTML', 'CSS', 'JavaScript'];
            
            techImages.forEach((container, index) => {
                const tooltip = document.createElement('div');
                tooltip.textContent = techNames[index] || 'Tech';
                tooltip.style.cssText = `
                    position: absolute;
                    top: -35px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(34, 197, 94, 0.9);
                    color: white;
                    padding: 6px 10px;
                    border-radius: 4px;
                    font-size: 11px;
                    font-weight: bold;
                    opacity: 0;
                    transition: opacity 0.2s ease;
                    pointer-events: none;
                    z-index: 100;
                `;
                
                container.style.position = 'relative';
                container.appendChild(tooltip);
                
                container.addEventListener('mouseenter', function() {
                    tooltip.style.opacity = '1';
                });
                
                container.addEventListener('mouseleave', function() {
                    tooltip.style.opacity = '0';
                });
            });

            // Text glow effect for highlights
            highlights.forEach(highlight => {
                highlight.addEventListener('mouseenter', function() {
                    this.style.textShadow = '0 0 8px rgba(34, 197, 94, 0.6)';
                });
                
                highlight.addEventListener('mouseleave', function() {
                    this.style.textShadow = 'none';
                });
            });

            // Animated title gradient
            if (aboutTitle) {
                let gradientPosition = 0;
                setInterval(() => {
                    gradientPosition += 2;
                    aboutTitle.style.backgroundPosition = `${gradientPosition}% 50%`;
                }, 100);
            }

            // Feature items - removed color change for experience card
            cards.forEach(card => {
                const cardFeatures = card.querySelectorAll('.features li');
                const cardTitle = card.querySelector('.card-title');
                
                // Only apply color change to Project card, not Experience
                if (cardTitle && cardTitle.textContent.trim() === 'Project') {
                    card.addEventListener('mouseenter', function() {
                        cardFeatures.forEach((item, index) => {
                            setTimeout(() => {
                                item.style.transform = 'translateX(5px)';
                                item.style.color = '#22c55e';
                            }, index * 50);
                        });
                    });
                    
                    card.addEventListener('mouseleave', function() {
                        cardFeatures.forEach(item => {
                            item.style.transform = 'translateX(0px)';
                            item.style.color = '#d1d5db';
                        });
                    });
                }
            });

            // Smooth floating particles (reduced frequency for performance)
            function createParticle() {
                if (document.querySelectorAll('.particle').length > 5) return; // Limit particles
                
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.cssText = `
                    position: fixed;
                    width: 3px;
                    height: 3px;
                    background: rgba(34, 197, 94, 0.4);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1;
                    left: ${Math.random() * window.innerWidth}px;
                    top: ${window.innerHeight + 10}px;
                `;
                
                document.body.appendChild(particle);
                
                // Animate particle
                particle.animate([
                    { 
                        transform: 'translateY(0px) rotate(0deg)', 
                        opacity: 0 
                    },
                    { 
                        transform: `translateY(-${window.innerHeight + 100}px) rotate(360deg)`, 
                        opacity: 1 
                    }
                ], {
                    duration: 8000,
                    easing: 'ease-out'
                }).onfinish = () => particle.remove();
            }

            // Create particles less frequently for better performance
            setInterval(createParticle, 4000);

            // Fast and smooth page entry animation
            function initPageAnimation() {
                // Hide all elements initially
                const allElements = document.querySelectorAll('.card, .main-content');
                allElements.forEach((el, index) => {
                    el.style.opacity = '0';
                    el.style.transform = 'translateY(30px) scale(0.95)';
                    el.style.filter = 'blur(5px)';
                });
                
                // Quick sequential animation
                allElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0px) scale(1)';
                        el.style.filter = 'blur(0px)';
                    }, index * 100);
                });
                
                // Profile image special entrance
                if (profileImg) {
                    profileImg.style.opacity = '0';
                    profileImg.style.transform = 'scale(0) rotate(180deg)';
                    setTimeout(() => {
                        profileImg.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        profileImg.style.opacity = '1';
                        profileImg.style.transform = 'scale(1) rotate(0deg)';
                    }, 200);
                }
            }
            
            // Start page animation immediately
            initPageAnimation();
            
            // Simple scroll reveal (less aggressive)
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.2 });
        });