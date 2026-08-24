// 苹果风格的现代JavaScript交互
class AppleUI {
    constructor() {
        this.currentNotification = null;
        this.notificationTimeout = null;
        this.notificationRemovalTimeout = null;
        this.init();
    }
    
    init() {
        this.setupThemeToggle();
        this.setupLanguageSelector();
        this.setupButtons();
        this.createFloatingElements();
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
        const langButtons = document.querySelectorAll('.lang-btn');
        const heroTitle = document.querySelector('.hero-title');
        const heroSlogan = document.querySelector('.hero-slogan');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const primaryBtn = document.getElementById('primaryBtn');
        const secondaryBtn = document.getElementById('secondaryBtn');
        
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
        
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = btn.getAttribute('data-lang');
                const text = translations[lang];
                
                // 移除其他按钮的激活状态
                langButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // 动画切换文本
                this.animateTextChange(heroTitle, text.title);
                this.animateTextChange(heroSlogan, text.slogan);
                this.animateTextChange(heroSubtitle, text.subtitle, true);
                this.animateTextChange(primaryBtn, text.primary);
                this.animateTextChange(secondaryBtn, text.secondary);
            });
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
        document.querySelectorAll('.lang-btn, .cta-btn').forEach(button => {
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
        const languageSelector = document.querySelector('.language-selector');
        const themeToggle = document.querySelector('.theme-toggle');
        
        // 为了确保在移动设备上也能正常工作，添加触摸事件支持
        let hoverTimeout;
        
        const showNavElements = () => {
            clearTimeout(hoverTimeout);
            if (languageSelector && themeToggle) {
                languageSelector.style.opacity = '1';
                languageSelector.style.transform = 'translateX(-50%) translateY(0)';
                themeToggle.style.opacity = '1';
                themeToggle.style.transform = 'translateY(0)';
            }
        };
        
        const hideNavElements = () => {
            hoverTimeout = setTimeout(() => {
                if (languageSelector && themeToggle) {
                    languageSelector.style.opacity = '0';
                    languageSelector.style.transform = 'translateX(-50%) translateY(-20px)';
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
