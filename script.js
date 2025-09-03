// Main application object
const JinglebotApp = {
    // Initialize the application
    init() {
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupCounterAnimations();
        this.setupSmoothScrolling();
        this.setupParallaxEffects();
        this.setupTypewriterEffect();
        this.setupAdvancedParticleSystem();
        this.setupConstellationEffects();
        this.setupHolographicInterface();
        this.setupQuantumAnimations();
        this.setupThemeToggle();
        this.setupStatusMonitoring();
        this.setupLazyLoading();
        console.log('🤖 Jinglebot.com - Advanced Space Edition initialized!');
    },

    // Mobile navigation toggle
    setupNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking nav links
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        }

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(13, 17, 23, 0.98)';
                navbar.style.backdropFilter = 'blur(20px) saturate(180%)';
            } else {
                navbar.style.background = 'rgba(13, 17, 23, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
            }
        });

        // Active section highlighting
        this.highlightActiveSection();
    },

    // Highlight active navigation section
    highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    },

    // Smooth scrolling for anchor links
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    // Scroll-triggered animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add staggered animation for grid items
                    if (entry.target.classList.contains('services-grid') || 
                        entry.target.classList.contains('tech-grid')) {
                        this.animateGridItems(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll(`
            .hero-content > *,
            .about-content,
            .about-stats,
            .services-grid,
            .tech-categories,
            .contact-content,
            .service-card,
            .tech-item,
            .stat-card
        `);

        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });
    },

    // Animate grid items with stagger effect
    animateGridItems(container) {
        const items = container.children;
        Array.from(items).forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    },

    // Animated counters for statistics
    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        const observerOptions = {
            threshold: 0.5
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    },

    // Animate individual counter
    animateCounter(counter) {
        const targetText = counter.getAttribute('data-target');
        
        // Handle infinity symbol
        if (targetText === '∞') {
            let symbols = ['•', '○', '●', '✦', '★', '☆', '✲', '✳'];
            let index = 0;
            
            const infinityTimer = setInterval(() => {
                counter.textContent = symbols[index % symbols.length];
                index++;
                if (index > 20) {
                    counter.textContent = '∞';
                    clearInterval(infinityTimer);
                }
            }, 100);
            return;
        }
        
        const target = parseInt(targetText);
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format number based on target value
            if (target >= 10000) {
                counter.textContent = Math.floor(current / 1000) + 'K+';
            } else if (target >= 1000) {
                counter.textContent = Math.floor(current / 1000) + 'K+';
            } else if (target >= 100) {
                counter.textContent = Math.floor(current) + '+';
            } else {
                counter.textContent = current.toFixed(1);
            }
        }, 16);
    },

    // Parallax effects for hero section
    setupParallaxEffects() {
        const hero = document.querySelector('.hero');
        const shapes = document.querySelectorAll('.shape');
        
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                // Move background shapes
                shapes.forEach((shape, index) => {
                    const speed = 0.2 + (index * 0.1);
                    shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
                });

                // Parallax for hero content
                if (scrolled < hero.offsetHeight) {
                    hero.style.transform = `translateY(${rate}px)`;
                }
            });
        }
    },

    // Typewriter effect for hero title
    setupTypewriterEffect() {
        const titleElement = document.querySelector('.hero-title');
        if (!titleElement) return;

        const originalText = titleElement.innerHTML;
        const words = originalText.split(' ');
        titleElement.innerHTML = '';

        let wordIndex = 0;
        const typeInterval = setInterval(() => {
            if (wordIndex < words.length) {
                titleElement.innerHTML += words[wordIndex] + ' ';
                wordIndex++;
            } else {
                clearInterval(typeInterval);
                // Add cursor blink effect briefly
                titleElement.innerHTML += '<span class="cursor">|</span>';
                setTimeout(() => {
                    const cursor = titleElement.querySelector('.cursor');
                    if (cursor) cursor.remove();
                }, 2000);
            }
        }, 300);
    },

    // Advanced 3D particle system for space environment
    setupAdvancedParticleSystem() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-2';
        canvas.style.opacity = '0.8';
        
        document.body.appendChild(canvas);

        const particles = [];
        const particleCount = 100;
        const connectionDistance = 120;

        // Enhanced particle class with 3D properties
        class SpaceParticle {
            constructor() {
                this.reset();
                this.z = Math.random() * 1000;
                this.opacity = Math.random() * 0.8 + 0.2;
                this.size = Math.random() * 3 + 1;
                this.pulseSpeed = Math.random() * 0.02 + 0.01;
                this.pulsePhase = Math.random() * Math.PI * 2;
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.speedZ = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.z -= this.speedZ;
                this.pulsePhase += this.pulseSpeed;

                // Wrap around edges
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.z <= 0) {
                    this.z = 1000;
                    this.reset();
                }
            }

            draw() {
                const scale = 1000 / (1000 + this.z);
                const x2d = this.x * scale + canvas.width * (1 - scale) / 2;
                const y2d = this.y * scale + canvas.height * (1 - scale) / 2;
                const size2d = this.size * scale;
                const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;

                ctx.save();
                ctx.globalAlpha = this.opacity * scale * pulse;
                
                // Create starlike effect
                const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size2d * 2);
                gradient.addColorStop(0, '#88f');
                gradient.addColorStop(0.5, '#44a');
                gradient.addColorStop(1, 'transparent');
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x2d, y2d, size2d * 2, 0, Math.PI * 2);
                ctx.fill();
                
                // Core bright dot
                ctx.globalAlpha = this.opacity * scale;
                ctx.fillStyle = '#fff';
                ctx.beginPath();
                ctx.arc(x2d, y2d, size2d * 0.3, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.restore();
                
                return { x: x2d, y: y2d, scale };
            }
        }

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new SpaceParticle());
        }

        // Resize canvas
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const visibleParticles = [];
            
            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                const pos = particle.draw();
                if (pos.scale > 0.1) {
                    visibleParticles.push({ ...pos, particle });
                }
            });

            // Draw connections between nearby particles
            ctx.strokeStyle = 'rgba(136, 136, 255, 0.1)';
            ctx.lineWidth = 1;
            
            for (let i = 0; i < visibleParticles.length; i++) {
                for (let j = i + 1; j < visibleParticles.length; j++) {
                    const p1 = visibleParticles[i];
                    const p2 = visibleParticles[j];
                    const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                    
                    if (distance < connectionDistance) {
                        const opacity = (1 - distance / connectionDistance) * 0.3;
                        ctx.globalAlpha = opacity * Math.min(p1.scale, p2.scale);
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
            
            ctx.globalAlpha = 1;
            requestAnimationFrame(animate);
        }

        resizeCanvas();
        animate();
        window.addEventListener('resize', resizeCanvas);
    },

    // Constellation interaction effects
    setupConstellationEffects() {
        const nodes = document.querySelectorAll('.feature-node');
        
        nodes.forEach((node, index) => {
            node.addEventListener('mouseenter', () => {
                this.activateConstellation(node, index);
            });
            
            node.addEventListener('mouseleave', () => {
                this.deactivateConstellation(node);
            });
            
            // Add quantum effect on click
            node.addEventListener('click', () => {
                this.triggerQuantumEffect(node);
            });
        });
    },

    activateConstellation(node, index) {
        const core = node.querySelector('.node-core');
        
        // Enhanced glow effect
        core.style.boxShadow = `
            0 0 60px rgba(88, 101, 242, 0.6),
            inset 0 0 60px rgba(88, 101, 242, 0.3),
            0 0 100px rgba(88, 101, 242, 0.4)
        `;
        
        // Ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 10px;
            height: 10px;
            border: 2px solid rgba(88, 101, 242, 0.8);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: cosmic-ripple 2s ease-out infinite;
            pointer-events: none;
        `;
        
        core.appendChild(ripple);
        
        // Connect to nearby nodes
        this.createNodeConnections(node, index);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 2000);
    },

    deactivateConstellation(node) {
        const core = node.querySelector('.node-core');
        core.style.boxShadow = '';
        
        // Remove temporary connections
        const connections = document.querySelectorAll('.temp-connection');
        connections.forEach(conn => conn.remove());
    },

    createNodeConnections(activeNode, activeIndex) {
        const allNodes = document.querySelectorAll('.feature-node');
        const activeRect = activeNode.getBoundingClientRect();
        
        allNodes.forEach((node, index) => {
            if (index !== activeIndex) {
                const rect = node.getBoundingClientRect();
                const distance = Math.hypot(
                    rect.left - activeRect.left,
                    rect.top - activeRect.top
                );
                
                if (distance < 400) {
                    this.drawTemporaryConnection(activeRect, rect);
                }
            }
        });
    },

    drawTemporaryConnection(rect1, rect2) {
        const line = document.createElement('div');
        const length = Math.hypot(
            rect2.left - rect1.left,
            rect2.top - rect1.top
        );
        const angle = Math.atan2(
            rect2.top - rect1.top,
            rect2.left - rect1.left
        ) * 180 / Math.PI;
        
        line.className = 'temp-connection';
        line.style.cssText = `
            position: fixed;
            left: ${rect1.left + rect1.width / 2}px;
            top: ${rect1.top + rect1.height / 2}px;
            width: ${length}px;
            height: 2px;
            background: linear-gradient(90deg, 
                rgba(88, 101, 242, 0.8), 
                rgba(88, 101, 242, 0.4), 
                rgba(88, 101, 242, 0.8)
            );
            transform-origin: 0 50%;
            transform: rotate(${angle}deg);
            animation: energy-flow 1.5s ease-in-out infinite;
            pointer-events: none;
            z-index: 1000;
        `;
        
        document.body.appendChild(line);
    },

    // Quantum effect for node interactions
    triggerQuantumEffect(node) {
        const core = node.querySelector('.node-core');
        
        // Create quantum particles
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            const angle = (i / 8) * Math.PI * 2;
            const distance = 150;
            
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(88, 101, 242, 0.8);
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: quantum-explosion ${1 + Math.random()}s ease-out forwards;
                animation-delay: ${i * 0.1}s;
                pointer-events: none;
            `;
            
            particle.style.setProperty('--end-x', `${Math.cos(angle) * distance}px`);
            particle.style.setProperty('--end-y', `${Math.sin(angle) * distance}px`);
            
            core.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 2000);
        }
        
        // Flash effect
        core.style.animation = 'quantum-flash 0.5s ease-out';
        setTimeout(() => {
            core.style.animation = '';
        }, 500);
    },

    // Holographic interface simulation
    setupHolographicInterface() {
        const features = document.querySelector('.advanced-features');
        if (!features) return;
        
        // Create holographic scan lines
        const scanLines = document.createElement('div');
        scanLines.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: repeating-linear-gradient(
                0deg,
                transparent,
                transparent 4px,
                rgba(0, 255, 255, 0.03) 6px
            );
            animation: holographic-scan 3s linear infinite;
            pointer-events: none;
            z-index: 1;
        `;
        
        features.appendChild(scanLines);
        
        // Add glitch effect occasionally
        setInterval(() => {
            if (Math.random() < 0.1) {
                this.triggerGlitchEffect(features);
            }
        }, 5000);
    },

    triggerGlitchEffect(element) {
        element.style.animation = 'digital-glitch 0.3s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 300);
    },

    // Quantum-inspired animations
    setupQuantumAnimations() {
        // Add quantum uncertainty to floating elements
        const floatingElements = document.querySelectorAll('.floating-card, .feature-node');
        
        floatingElements.forEach((element, index) => {
            setInterval(() => {
                const randomOffset = {
                    x: (Math.random() - 0.5) * 2,
                    y: (Math.random() - 0.5) * 2
                };
                
                element.style.transform += ` translate(${randomOffset.x}px, ${randomOffset.y}px)`;
                
                setTimeout(() => {
                    element.style.transform = element.style.transform.replace(
                        ` translate(${randomOffset.x}px, ${randomOffset.y}px)`, ''
                    );
                }, 100);
            }, 3000 + index * 500);
        });
    },

    // Theme toggle functionality (future enhancement)
    setupThemeToggle() {
        // This could be expanded to support light/dark theme switching
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Listen for system theme changes
        prefersDark.addListener((e) => {
            if (e.matches) {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        });
    },

    // Status monitoring for online indicator
    setupStatusMonitoring() {
        const statusDots = document.querySelectorAll('.status-dot');
        const statusTexts = document.querySelectorAll('.status-text');
        
        // Simulate status checking (in real app, this would ping your server)
        setInterval(() => {
            const isOnline = navigator.onLine;
            
            statusDots.forEach(dot => {
                if (isOnline) {
                    dot.classList.add('online');
                    dot.classList.remove('offline');
                } else {
                    dot.classList.add('offline');
                    dot.classList.remove('online');
                }
            });

            statusTexts.forEach(text => {
                text.textContent = isOnline ? 
                    'Jinglebot.com is currently online' : 
                    'Jinglebot.com is currently offline';
            });
        }, 5000);

        // Listen for online/offline events
        window.addEventListener('online', () => {
            this.showNotification('Connection restored!', 'success');
        });

        window.addEventListener('offline', () => {
            this.showNotification('Connection lost', 'warning');
        });
    },

    // Lazy loading for performance
    setupLazyLoading() {
        const lazyElements = document.querySelectorAll('[data-lazy]');
        
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const src = element.getAttribute('data-lazy');
                    
                    if (src) {
                        element.src = src;
                        element.removeAttribute('data-lazy');
                    }
                    
                    lazyObserver.unobserve(element);
                }
            });
        });

        lazyElements.forEach(element => {
            lazyObserver.observe(element);
        });
    },

    // Show notification (utility function)
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            background: var(--surface);
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: var(--radius-lg);
            border: 1px solid var(--border-color);
            box-shadow: var(--shadow-lg);
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        if (type === 'success') {
            notification.style.borderColor = 'var(--success)';
        } else if (type === 'warning') {
            notification.style.borderColor = 'var(--warning)';
        }

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    },

    // Copy to clipboard utility
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('Copied to clipboard!', 'success');
        }).catch(() => {
            this.showNotification('Copy failed', 'warning');
        });
    },

    // Discord link tracking
    trackDiscordClick() {
        // Analytics tracking could be added here
        console.log('Discord link clicked');
        
        // Show confirmation
        this.showNotification('Opening Discord...', 'info');
    }
};

// Advanced features and utilities
const AdvancedFeatures = {
    // Keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for quick navigation
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.showQuickNav();
            }
            
            // Escape to close any modals
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    },

    // Quick navigation modal
    showQuickNav() {
        const modal = document.createElement('div');
        modal.className = 'quick-nav-modal';
        modal.innerHTML = `
            <div class="quick-nav-content">
                <h3>Quick Navigation</h3>
                <div class="quick-nav-links">
                    <a href="#home">🏠 Home</a>
                    <a href="#about">📖 About</a>
                    <a href="#services">⚡ Services</a>
                    <a href="#tech">🛠️ Tech Stack</a>
                    <a href="#contact">💬 Contact</a>
                    <a href="https://discord.gg/nwncQHp8fd" target="_blank">🎮 Discord</a>
                </div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1002;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const content = modal.querySelector('.quick-nav-content');
        content.style.cssText = `
            background: var(--surface);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-xl);
            padding: 2rem;
            max-width: 400px;
            width: 90%;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `;

        const links = modal.querySelector('.quick-nav-links');
        links.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-top: 1rem;
        `;

        document.body.appendChild(modal);

        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
            content.style.transform = 'scale(1)';
        }, 10);

        // Close on click outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal);
            }
        });

        // Close on link click
        links.addEventListener('click', () => {
            this.closeModal(modal);
        });
    },

    // Close modal
    closeModal(modal) {
        modal.style.opacity = '0';
        modal.querySelector('.quick-nav-content').style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    },

    // Close all modals
    closeAllModals() {
        const modals = document.querySelectorAll('.quick-nav-modal');
        modals.forEach(modal => this.closeModal(modal));
    }
};

// Performance monitoring
const PerformanceMonitor = {
    init() {
        this.measureLoadTime();
        this.monitorScrollPerformance();
    },

    measureLoadTime() {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`🚀 Page loaded in ${loadTime.toFixed(2)}ms`);
            
            // Show load time in console for debugging
            if (loadTime > 3000) {
                console.warn('⚠️ Slow page load detected');
            }
        });
    },

    monitorScrollPerformance() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Scroll performance optimizations would go here
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
};

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    JinglebotApp.init();
    AdvancedFeatures.setupKeyboardShortcuts();
    PerformanceMonitor.init();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('📱 Page hidden');
    } else {
        console.log('👀 Page visible');
        // Could refresh status or reload dynamic content
    }
});

// Add CSS for notifications and modals
const style = document.createElement('style');
style.textContent = `
    .notification {
        font-family: var(--font-primary);
        font-size: 0.875rem;
        font-weight: 500;
    }
    
    .quick-nav-modal h3 {
        margin: 0 0 1rem 0;
        color: var(--text-primary);
    }
    
    .quick-nav-links a {
        color: var(--text-secondary);
        text-decoration: none;
        padding: 0.75rem;
        border-radius: var(--radius-md);
        transition: var(--transition-normal);
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .quick-nav-links a:hover {
        background: var(--surface-light);
        color: var(--text-primary);
    }
    
    .cursor {
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .status-dot.offline {
        background: var(--warning);
        box-shadow: 0 0 10px rgba(248, 81, 73, 0.5);
    }
`;

document.head.appendChild(style);

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { JinglebotApp, AdvancedFeatures, PerformanceMonitor };
}