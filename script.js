// Translations
const translations = {
    zh: {
        langHint: '蛤？还有多语言呐？',
        bio: '没有什么特别的吧？别问太多，懒。',
        quote: '自由，热爱。',
        linksTitle: '这或许是你唯一找到我的方法？',
        emailTitle: '来封 Email？',
        qqTitle: '加我 QQ？'
    },
    en: {
        langHint: 'Huh? Multiple languages?',
        bio: 'Nothing special. Don\'t ask too much. Lazy.',
        quote: 'Freedom, passion.',
        linksTitle: 'Maybe the only way to find me?',
        emailTitle: 'Send me an Email?',
        qqTitle: 'Add me on QQ?'
    },
    ja: {
        langHint: 'え？多言語対応なの？',
        bio: '特別なことなんてないよ。聞きすぎないで。面倒くさい。',
        quote: '自由、情熱。',
        linksTitle: '私を見つける唯一の方法かも？',
        emailTitle: 'メールを送る？',
        qqTitle: 'QQで連絡する？'
    }
};

const langNames = { zh: '中文', en: 'English', ja: '日本語' };
let currentLang = localStorage.getItem('lang') || 'zh';

function toggleLangMenu() {
    const menu = document.getElementById('langMenu');
    menu.classList.toggle('show');
}

function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.getElementById('currentLang').textContent = langNames[lang];
    document.getElementById('langMenu').classList.remove('show');
    applyTranslations();
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });
}

// Close lang menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.lang-selector')) {
        document.getElementById('langMenu').classList.remove('show');
    }
});

// Initialize language
document.getElementById('currentLang').textContent = langNames[currentLang];
applyTranslations();

function toggleTheme() {
    const html = document.documentElement;
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    const themeText = document.getElementById('themeText');

    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
        themeText.textContent = 'DARK';
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
        themeText.textContent = 'LIGHT';
        localStorage.setItem('theme', 'dark');
    }
}

// Initialize theme
(function() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved === 'dark' || (!saved && prefersDark);

    if (isDark) {
        document.documentElement.classList.add('dark');
        document.getElementById('sunIcon').style.display = 'block';
        document.getElementById('moonIcon').style.display = 'none';
        document.getElementById('themeText').textContent = 'LIGHT';
    }
})();

// Back to top button
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
    const btn = document.querySelector('.back-to-top');
    if (window.scrollY > 300) {
        btn.classList.add('show');
    } else {
        btn.classList.remove('show');
    }
});
