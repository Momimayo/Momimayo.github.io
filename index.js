// 苹果风格的现代JavaScript交互
class AppleUI {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupThemeToggle();
        this.setupLanguageSelector();
        this.setupButtons();
        this.createFloatingElements();
        this.setupScrollAnimations();
        this.addRippleEffect();
        
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
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const primaryBtn = document.getElementById('primaryBtn');
        const secondaryBtn = document.getElementById('secondaryBtn');
        
        const translations = {
            zh: {
                title: '欢迎',
                subtitle: '简洁、优雅的体验',
                primary: '开始使用',
                secondary: '了解更多'
            },
            ja: {
                title: 'ようこそ',
                subtitle: '美しく、ミニマルな体験',
                primary: '始める',
                secondary: 'もっと見る'
            },
            en: {
                title: 'Welcome',
                subtitle: 'A beautiful, minimalist experience',
                primary: 'Get Started',
                secondary: 'Learn More'
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
                this.animateTextChange(heroSubtitle, text.subtitle);
                this.animateTextChange(primaryBtn, text.primary);
                this.animateTextChange(secondaryBtn, text.secondary);
            });
        });
    }
    
    animateTextChange(element, newText) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            element.textContent = newText;
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 150);
    }
    
    setupButtons() {
        const primaryBtn = document.getElementById('primaryBtn');
        const secondaryBtn = document.getElementById('secondaryBtn');
        
        primaryBtn.addEventListener('click', () => {
            this.showNotification('正在启动... ✨', 'success');
        });
        
        secondaryBtn.addEventListener('click', () => {
            this.showNotification('更多信息即将到来 🚀', 'info');
        });
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
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
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // 自动消失
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }
    
    createFloatingElements() {
        const container = document.getElementById('floatingElements');
        const numElements = 15;
        
        for (let i = 0; i < numElements; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            
            // 随机位置和动画延迟
            element.style.left = Math.random() * 100 + '%';
            element.style.top = Math.random() * 100 + '%';
            element.style.animationDelay = Math.random() * 6 + 's';
            element.style.animationDuration = (4 + Math.random() * 4) + 's';
            
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