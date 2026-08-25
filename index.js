// 苹果风格的现代JavaScript交互
class AppleUI {
    constructor() {
        this.currentNotification = null;
        this.notificationTimeout = null;
        this.notificationRemovalTimeout = null;
        this.currentSlide = 0;
        this.slideScrollLocked = false;
        this.init();
    }
    
    init() {
        this.setupThemeToggle();
        this.setupLanguageSelector();
        this.setupButtons();
        this.createFloatingElements();
        this.setupSlideNavigation();
        this.setupTerminal();
        this.setupScrollAnimations();
        this.addRippleEffect();
        this.addBreathingAnimation();
        this.setupTopNavHover();
        
        console.log('Apple-style UI initialized ✨');
    }
    
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const body = document.body;
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            themeIcon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
            
            // 添加主题切换动画
            body.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            // 保存用户偏好
            localStorage.setItem('theme', newTheme);
        });
        
        // 加载保存的主题
        const savedTheme = localStorage.getItem('theme') || 'light';
        body.setAttribute('data-theme', savedTheme);
        themeIcon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
    }
    
    setupLanguageSelector() {
        const languageToggle = document.getElementById('languageToggle');
        const languageIcon = document.getElementById('languageIcon');
        const heroTitle = document.querySelector('.hero-title');
        const heroSlogan = document.querySelector('.hero-slogan');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const primaryBtn = document.getElementById('primaryBtn');
        const secondaryBtn = document.getElementById('secondaryBtn');
        const languages = ['zh', 'ja', 'en'];
        const languageNames = { zh: '中文', ja: '日本語', en: 'English' };
        const languageIcons = { zh: '中', ja: 'あ', en: 'E' };
        
        const translations = {
            zh: {
                title: '侘寂',
                slogan: 'Grace in the Void',
                subtitle: '在虚无中发现优雅，在不完美中寻找美的本质<br>Finding elegance in emptiness, discovering beauty in imperfection',
                primary: '静观',
                secondary: '冥想'
            },
            ja: {
                title: '侘寂',
                slogan: 'Grace in the Void',
                subtitle: '空虚の中に優雅さを見つけ、不完全さの中に美の本質を探る<br>虚無から生まれる美しさ、欠けたものの中にある完全性',
                primary: '静観',
                secondary: '瞑想'
            },
            en: {
                title: 'Wabi-Sabi',
                slogan: 'Grace in the Void',
                subtitle: 'Finding elegance in emptiness, discovering beauty in imperfection<br>The art of embracing what is incomplete and transient',
                primary: 'Contemplate',
                secondary: 'Meditate'
            }
        };
        
        const applyLanguage = (lang, animate = true) => {
            const text = translations[lang];

            if (animate) {
                this.animateTextChange(heroTitle, text.title);
                this.animateTextChange(heroSlogan, text.slogan);
                this.animateTextChange(heroSubtitle, text.subtitle, true);
                this.animateTextChange(primaryBtn, text.primary);
                this.animateTextChange(secondaryBtn, text.secondary);
            } else {
                heroTitle.textContent = text.title;
                heroSlogan.textContent = text.slogan;
                heroSubtitle.innerHTML = text.subtitle;
                primaryBtn.textContent = text.primary;
                secondaryBtn.textContent = text.secondary;
            }

            document.documentElement.lang = lang;
            languageToggle.dataset.lang = lang;
            languageIcon.textContent = languageIcons[lang];
            languageToggle.setAttribute('aria-label', `切换语言，当前：${languageNames[lang]}`);
            languageToggle.title = `当前语言：${languageNames[lang]}`;
            localStorage.setItem('language', lang);
        };

        const savedLanguage = localStorage.getItem('language');
        const initialLanguage = languages.includes(savedLanguage) ? savedLanguage : 'zh';
        applyLanguage(initialLanguage, false);

        languageToggle.addEventListener('click', () => {
            const currentIndex = languages.indexOf(languageToggle.dataset.lang);
            const nextLanguage = languages[(currentIndex + 1) % languages.length];
            applyLanguage(nextLanguage);
        });
    }
    
    animateTextChange(element, newText, allowHtml = false) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            if (allowHtml) {
                element.innerHTML = newText;
            } else {
                element.textContent = newText;
            }
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 300);
    }
    
    setupButtons() {
        const primaryBtn = document.getElementById('primaryBtn');
        const secondaryBtn = document.getElementById('secondaryBtn');
        
        primaryBtn.addEventListener('click', () => {
            this.showNotification('静观万物，心如止水 🕯️', 'peace');
        });
        
        secondaryBtn.addEventListener('click', () => {
            this.showNotification('冥想中，寻找内心的宁静 🧘', 'zen');
        });
    }
    
    showNotification(message, type = 'info') {
        clearTimeout(this.notificationTimeout);
        clearTimeout(this.notificationRemovalTimeout);

        if (this.currentNotification) {
            this.currentNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        this.currentNotification = notification;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: var(--glass-bg-hover);
            border: 1px solid var(--border-color);
            border-radius: 12px;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            color: var(--text-primary);
            z-index: 1001;
            transform: translateX(400px);
            transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            box-shadow: 0 8px 30px var(--shadow-medium);
        `;
        
        document.body.appendChild(notification);
        
        // 滑入动画
        requestAnimationFrame(() => {
            if (this.currentNotification === notification) {
                notification.style.transform = 'translateX(0)';
            }
        });
        
        // 自动消失
        this.notificationTimeout = setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            this.notificationRemovalTimeout = setTimeout(() => {
                if (this.currentNotification === notification) {
                    notification.remove();
                    this.currentNotification = null;
                }
            }, 500);
        }, 3000);
    }
    
    createFloatingElements() {
        const container = document.getElementById('floatingElements');
        const numElements = 8; // 减少元素数量，体现极简
        
        for (let i = 0; i < numElements; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            
            // 更加缓慢和静谧的动画
            element.style.left = Math.random() * 100 + '%';
            element.style.top = Math.random() * 100 + '%';
            element.style.animationDelay = Math.random() * 12 + 's';
            element.style.animationDuration = (8 + Math.random() * 10) + 's';
            
            container.appendChild(element);
        }
    }

    setupSlideNavigation() {
        const slides = Array.from(document.querySelectorAll('.slide'));
        const slideDots = Array.from(document.querySelectorAll('.slide-dot'));
        const nextSlideButton = document.getElementById('nextSlide');
        const slideDeck = document.getElementById('slideDeck');
        const mobileSlideMode = window.matchMedia('(max-width: 768px) and (pointer: coarse)').matches;
        let touchStartX = 0;
        let touchStartY = 0;
        let touchStartedOnControl = false;

        const updatePagination = (index) => {
            this.currentSlide = index;
            document.body.dataset.currentSlide = String(index);
            slideDots.forEach((dot, dotIndex) => {
                const isActive = dotIndex === index;
                dot.classList.toggle('active', isActive);
                if (isActive) {
                    dot.setAttribute('aria-current', 'true');
                } else {
                    dot.removeAttribute('aria-current');
                }
            });
        };

        const goToSlide = (index) => {
            const targetIndex = Math.max(0, Math.min(index, slides.length - 1));
            if (targetIndex === this.currentSlide || this.slideScrollLocked) return;

            this.slideScrollLocked = true;
            updatePagination(targetIndex);

            if (mobileSlideMode) {
                let transitionFinished = false;
                const finishMobileTransition = (event) => {
                    if (event && (event.target !== slideDeck || event.propertyName !== 'transform')) return;
                    if (transitionFinished) return;
                    transitionFinished = true;
                    this.slideScrollLocked = false;
                    slideDeck.removeEventListener('transitionend', finishMobileTransition);
                };

                slideDeck.addEventListener('transitionend', finishMobileTransition);
                setTimeout(finishMobileTransition, 850);
                return;
            }

            slides[targetIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });

            setTimeout(() => {
                this.slideScrollLocked = false;
                syncPaginationToScroll();
            }, 900);
        };

        let paginationFrame = null;
        const syncPaginationToScroll = () => {
            paginationFrame = null;
            let nearestIndex = 0;
            let nearestDistance = Infinity;

            slides.forEach((slide, index) => {
                const distance = Math.abs(slide.getBoundingClientRect().top);
                if (distance < nearestDistance) {
                    nearestDistance = distance;
                    nearestIndex = index;
                }
            });

            updatePagination(nearestIndex);
        };

        window.addEventListener('wheel', (event) => {
            if (Math.abs(event.deltaY) < 10) return;
            event.preventDefault();
            if (this.slideScrollLocked) return;

            goToSlide(this.currentSlide + (event.deltaY > 0 ? 1 : -1));
        }, { passive: false });

        window.addEventListener('touchstart', (event) => {
            if (!mobileSlideMode || event.touches.length !== 1) return;
            const target = event.target;
            touchStartedOnControl = target instanceof Element && Boolean(target.closest('textarea, input, button, a, [contenteditable="true"]'));
            touchStartX = event.touches[0].clientX;
            touchStartY = event.touches[0].clientY;
        }, { passive: true });

        window.addEventListener('touchmove', (event) => {
            if (!mobileSlideMode || touchStartedOnControl || event.touches.length !== 1) return;
            const deltaX = event.touches[0].clientX - touchStartX;
            const deltaY = event.touches[0].clientY - touchStartY;

            if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 10) {
                event.preventDefault();
            }
        }, { passive: false });

        window.addEventListener('touchend', (event) => {
            if (!mobileSlideMode || touchStartedOnControl || event.changedTouches.length !== 1) return;
            const deltaX = event.changedTouches[0].clientX - touchStartX;
            const deltaY = event.changedTouches[0].clientY - touchStartY;

            if (Math.abs(deltaY) >= 55 && Math.abs(deltaY) > Math.abs(deltaX) * 1.2) {
                goToSlide(this.currentSlide + (deltaY < 0 ? 1 : -1));
            }
        }, { passive: true });

        window.addEventListener('keydown', (event) => {
            if (event.target instanceof Element && event.target.closest('button, a, input, textarea, select, [contenteditable="true"]')) return;

            if (['ArrowDown', 'PageDown', ' '].includes(event.key)) {
                event.preventDefault();
                goToSlide(this.currentSlide + 1);
            } else if (['ArrowUp', 'PageUp'].includes(event.key)) {
                event.preventDefault();
                goToSlide(this.currentSlide - 1);
            }
        });

        nextSlideButton.addEventListener('click', () => goToSlide(1));
        slideDots.forEach((dot) => {
            dot.addEventListener('click', () => goToSlide(Number(dot.dataset.slideTarget)));
        });

        window.addEventListener('scroll', () => {
            if (mobileSlideMode) return;
            if (this.slideScrollLocked) return;
            if (paginationFrame === null) {
                paginationFrame = requestAnimationFrame(syncPaginationToScroll);
            }
        }, { passive: true });

        syncPaginationToScroll();
    }

    setupTerminal() {
        const terminalWindow = document.getElementById('terminalWindow');
        const terminalEditor = document.getElementById('terminalEditor');

        terminalWindow.addEventListener('click', (event) => {
            if (event.target !== terminalEditor) {
                terminalEditor.focus();
            }
        });

        terminalEditor.addEventListener('input', () => {
            terminalEditor.classList.toggle('is-empty', terminalEditor.textContent.length === 0);
        });
    }
    
    setupScrollAnimations() {
        // 监听滚动事件，添加视差效果
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroBackground = document.querySelector('.hero-background');
            const floatingElements = document.querySelectorAll('.floating-element');
            
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
            
            floatingElements.forEach((element, index) => {
                const speed = 0.2 + (index % 3) * 0.1;
                element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
            });
        });
    }
    
    addRippleEffect() {
        document.querySelectorAll('.language-toggle, .cta-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: rippleEffect 0.6s linear;
                    pointer-events: none;
                `;
                
                ripple.classList.add('ripple');
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    addBreathingAnimation() {
        // 为hero背景添加微妙的呼吸效果
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            let breathPhase = 0;
            const breathe = () => {
                breathPhase += 0.01;
                const scale = 1 + Math.sin(breathPhase) * 0.02; // 非常微妙的缩放
                const opacity = 0.6 + Math.sin(breathPhase * 0.7) * 0.1; // 轻微的透明度变化
                
                heroBackground.style.transform = `scale(${scale})`;
                heroBackground.style.opacity = opacity;
                
                requestAnimationFrame(breathe);
            };
            breathe();
        }
        
        // 为标题添加禅意的文字波动效果
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            let wavePhase = 0;
            const wave = () => {
                wavePhase += 0.005;
                const offset = Math.sin(wavePhase) * 0.5; // 极其微妙的移动
                heroTitle.style.transform = `translateY(${offset}px)`;
                requestAnimationFrame(wave);
            };
            setTimeout(wave, 3000); // 3秒后开始，让用户先看到静态效果
        }
    }
    
    setupTopNavHover() {
        const topNav = document.querySelector('.top-nav');
        const languageToggle = document.querySelector('.language-toggle');
        const themeToggle = document.querySelector('.theme-toggle');
        
        // 为了确保在移动设备上也能正常工作，添加触摸事件支持
        let hoverTimeout;
        
        const showNavElements = () => {
            clearTimeout(hoverTimeout);
            if (languageToggle && themeToggle) {
                languageToggle.style.opacity = '1';
                languageToggle.style.transform = 'translateY(0)';
                themeToggle.style.opacity = '1';
                themeToggle.style.transform = 'translateY(0)';
            }
        };
        
        const hideNavElements = () => {
            hoverTimeout = setTimeout(() => {
                if (languageToggle && themeToggle) {
                    languageToggle.style.opacity = '0';
                    languageToggle.style.transform = 'translateY(-20px)';
                    themeToggle.style.opacity = '0';
                    themeToggle.style.transform = 'translateY(-20px)';
                }
            }, 500); // 500ms 延迟，防止意外隐藏
        };
        
        if (topNav) {
            // 鼠标事件
            topNav.addEventListener('mouseenter', showNavElements);
            topNav.addEventListener('mouseleave', hideNavElements);
            
            // 触摸事件支持（移动设备）
            topNav.addEventListener('touchstart', showNavElements);
            
            // 点击页面其他地方时隐藏（移动设备）
            document.addEventListener('touchstart', (e) => {
                if (!topNav.contains(e.target)) {
                    hideNavElements();
                }
            });
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new AppleUI();
});

// 添加一些实用工具函数
const utils = {
    // 缓动函数
    easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
    
    // 节流函数
    throttle: (func, limit) => {
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
    },
    
    // 检测设备类型
    isMobile: () => window.innerWidth <= 768,
    
    // 随机颜色生成
    randomColor: () => {
        const colors = ['#007AFF', '#34C759', '#FF9500', '#FF3B30', '#AF52DE'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
};

console.log('🍎 Apple-style interface loaded successfully!');
