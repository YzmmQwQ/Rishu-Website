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

const langNames = { zh: '中文', en: 'ENGLISH', ja: '日本語' };
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

// Update subtitle height on resize
function updateSubtitleHeight() {
    const wrap = document.querySelector('.subtitle-scroll-wrap');
    const scroll = document.querySelector('.subtitle-scroll');
    if (wrap && scroll) {
        const height = window.innerWidth <= 600 ? 36 : 48;
        wrap.style.setProperty('--subtitle-height', height + 'px');
        // Restart animation to recalculate
        scroll.style.animation = 'none';
        scroll.offsetHeight; // Trigger reflow
        scroll.style.animation = '';
    }
}

updateSubtitleHeight();
window.addEventListener('resize', updateSubtitleHeight);

// Now Playing 随机歌曲
const songs = [
    {
        title: '擱淺',
        artist: '周杰倫',
        cover: 'img/yhm.jpg',
        lyrics: ['我只能永遠讀著對白', '讀著我給妳的傷害', '我原諒不了我', '就請妳當作我也不在', '我睜開雙眼看著空白', '忘記妳給我的期待', '讀完了一來', '我很快就離開']
    },
    {
        title: '簡單愛',
        artist: '周杰倫',
        cover: 'img/ftx.jpg',
        lyrics: ['我想就這樣牽著妳的手不放開', '愛能不能夠永遠單純沒有悲哀', '我想帶妳騎單車', '我想和妳看棒球', '想這樣沒擔憂唱著歌一直走', '我想就這樣牽著妳的手不放開', '愛能不能夠簡簡單單沒有傷害', '妳靠著我的肩膀', '妳在我胸口睡著', '像這樣的生活 我愛妳 妳愛我']
    },
    {
        title: '楓',
        artist: '周杰倫',
        cover: 'img/jay.jpg',
        lyrics: ['緩緩飄落的楓葉像思念', '我點燃燭火溫暖歲末的秋天', '極光掠奪天邊', '北風掠過想妳的容顏', '我把愛燒成了落葉', '卻換不回熟悉的那張臉']
    },
    {
        title: '反方向的鐘',
        artist: '周杰倫',
        cover: 'img/jay.jpg',
        lyrics: ['穿梭時間的畫面的鐘', '從反方向開始移動', '回到當初愛你的時空', '停格內容不忠', '所有回憶對著我進攻', '我的傷口 被你拆封', '誓言太沉重 淚被縱容', '臉上洶湧 失控']
    },
    {
        title: '七里香',
        artist: '周杰倫',
        cover: 'img/yhm.jpg',
        lyrics: ['雨下整夜 我的愛溢出就像雨水', '院子落葉 給我的思念厚厚一疊', '幾句是非 也無法將我的熱情冷卻', '妳出現在我詩的每一頁']
    },
    {
        title: '晴天',
        artist: '周杰倫',
        cover: 'img/yhm.jpg',
        lyrics: ['刮風這天 我試過握著妳手', '但偏偏 雨漸漸', '大到我看妳不見', '還要多久 我才能在妳身邊', '等到放晴的那天', '也許我會比較好一點']
    },
    {
        title: '一路向北',
        artist: '周杰倫',
        cover: 'img/feng.jpg',
        lyrics: ['我一路向北 離開有妳的季節', '妳說妳好累 已無法再愛上誰', '風在山路吹 過往的畫面', '全都是我不對', '細數慚愧 我傷妳幾回']
    },
    {
        title: '愛在西元前',
        artist: '周杰倫',
        cover: 'img/ftx.jpg',
        lyrics: ['古巴比倫王頒布了漢摩拉比法典', '刻在黑色的玄武岩', '距今已經三千七百多年', '妳在櫥窗前凝視碑文的字眼', '我給妳的愛寫在西元前', '深埋在美索不達米亞平原', '幾十個世紀後出土發現', '泥板上的字跡依然清晰可見']
    }
];

let currentSongIndex = Math.floor(Math.random() * songs.length);
let currentLyricIndex = 0;
let lyricTimer = null;

function updateNowPlaying() {
    const song = songs[currentSongIndex];
    const cover = document.getElementById('npCover');
    const songEl = document.getElementById('npSong');
    const lyricsEl = document.getElementById('npLyrics');

    cover.src = song.cover;
    songEl.textContent = `${song.title} - ${song.artist}`;

    // 设置歌词
    lyricsEl.innerHTML = '';
    song.lyrics.forEach(line => {
        const span = document.createElement('span');
        span.className = 'lyrics-item';
        span.textContent = line;
        lyricsEl.appendChild(span);
    });

    // 重置歌词滚动
    currentLyricIndex = 0;
    lyricsEl.style.transform = 'translateY(0)';
}

function scrollLyrics() {
    const song = songs[currentSongIndex];
    if (!song.lyrics || song.lyrics.length === 0) return;

    currentLyricIndex = (currentLyricIndex + 1) % song.lyrics.length;
    const lyricsEl = document.getElementById('npLyrics');
    lyricsEl.style.transform = `translateY(-${currentLyricIndex * 20}px)`;
}

// 初始化
updateNowPlaying();
if (lyricTimer) clearInterval(lyricTimer);
lyricTimer = setInterval(scrollLyrics, 3000);

// 播放按钮点击 - 暂时跳转到歌单页
document.getElementById('npPlayBtn').addEventListener('click', () => {
    window.open('https://docs.rishu.cfd/learn-more/playlist', '_blank');
});
