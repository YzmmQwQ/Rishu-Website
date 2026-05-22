<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

import fengCover from '../img/feng.jpg';
import ftxCover from '../img/ftx.jpg';
import jayCover from '../img/jay.jpg';
import qlxCover from '../img/qlx.jpg';
import rishuAvatar from '../img/rishu.png';
import yhmCover from '../img/yhm.jpg';

const translations = {
  zh: {
    langHint: '蛤？还有多语言呐？',
    bio: '没有什么特别的吧？别问太多，懒。',
    quote: '自由，热爱。',
    emailTitle: '来封 Email？',
    qqTitle: '加我 QQ？',
    travel: '异次元之旅'
  },
  en: {
    langHint: 'Huh? Multiple languages?',
    bio: "Nothing special. Don't ask too much. Lazy.",
    quote: 'Freedom, passion.',
    emailTitle: 'Send me an Email?',
    qqTitle: 'Add me on QQ?',
    travel: 'Interdimensional Journey'
  },
  ja: {
    langHint: 'え？多言語対応なの？',
    bio: '特別なことなんてないよ。聞きすぎないで。面倒くさい。',
    quote: '自由、情熱。',
    emailTitle: 'メールを送る？',
    qqTitle: 'QQで連絡する？',
    travel: '異次元の旅'
  }
};

const langNames = { zh: '中文', en: 'ENGLISH', ja: '日本語' };
const subtitleItems = [
  '16 YEARS OLD',
  '23/08/2009',
  'BEE MYSELF',
  'GEMINI 2.5 PRO',
  'LOVE U FOREVER',
  'SIMPLE STUDENT'
];
const infoItems = [
  ['Birthday', '2009.08.23'],
  ['Height', '183cm'],
  ['Origin', '🇯🇵 Japan'],
  ['Grade', 'Senior High']
];
const playingTags = [
  'Minecraft',
  'Genshin Impact',
  'Honkai: Star Rail',
  'Zenless Zone Zero',
  'Blue Archive',
  'Phigros',
  'ARKNIGHTS',
  'Project Sekai'
];
const listeningTags = ['Jay Chou', 'Hatsune Miku'];
const songs = [
  {
    title: '擱淺',
    artist: '周杰倫',
    cover: qlxCover,
    lyrics: ['我只能永遠讀著對白', '讀著我給妳的傷害', '我原諒不了我', '就請妳當作我也不在', '我睜開雙眼看著空白', '忘記妳給我的期待', '讀完了一來', '我很快就離開']
  },
  {
    title: '簡單愛',
    artist: '周杰倫',
    cover: ftxCover,
    lyrics: ['我想就這樣牽著妳的手不放開', '愛能不能夠永遠單純沒有悲哀', '我想帶妳騎單車', '我想和妳看棒球', '想這樣沒擔憂唱著歌一直走', '我想就這樣牽著妳的手不放開', '愛能不能夠簡簡單單沒有傷害', '妳靠著我的肩膀', '妳在我胸口睡著', '像這樣的生活 我愛妳 妳愛我']
  },
  {
    title: '楓',
    artist: '周杰倫',
    cover: fengCover,
    lyrics: ['緩緩飄落的楓葉像思念', '我點燃燭火溫暖歲末的秋天', '極光掠奪天邊', '北風掠過想妳的容顏', '我把愛燒成了落葉', '卻換不回熟悉的那張臉']
  },
  {
    title: '反方向的鐘',
    artist: '周杰倫',
    cover: jayCover,
    lyrics: ['穿梭時間的畫面的鐘', '從反方向開始移動', '回到當初愛你的時空', '停格內容不忠', '所有回憶對著我進攻', '我的傷口 被你拆封', '誓言太沉重 淚被縱容', '臉上洶湧 失控']
  },
  {
    title: '七里香',
    artist: '周杰倫',
    cover: qlxCover,
    lyrics: ['雨下整夜 我的愛溢出就像雨水', '院子落葉 給我的思念厚厚一疊', '幾句是非 也無法將我的熱情冷卻', '妳出現在我詩的每一頁']
  },
  {
    title: '晴天',
    artist: '周杰倫',
    cover: yhmCover,
    lyrics: ['刮風這天 我試過握著妳手', '但偏偏 雨漸漸', '大到我看妳不見', '還要多久 我才能在妳身邊', '等到放晴的那天', '也許我會比較好一點']
  },
  {
    title: '一路向北',
    artist: '周杰倫',
    cover: fengCover,
    lyrics: ['我一路向北 離開有妳的季節', '妳說妳好累 已無法再愛上誰', '風在山路吹 過往的畫面', '全都是我不對', '細數慚愧 我傷妳幾回']
  },
  {
    title: '愛在西元前',
    artist: '周杰倫',
    cover: ftxCover,
    lyrics: ['古巴比倫王頒布了漢摩拉比法典', '刻在黑色的玄武岩', '距今已經三千七百多年', '妳在櫥窗前凝視碑文的字眼', '我給妳的愛寫在西元前', '深埋在美索不達米亞平原', '幾十個世紀後出土發現', '泥板上的字跡依然清晰可見']
  }
];

const currentLang = ref(localStorage.getItem('lang') || 'zh');
const isLangMenuOpen = ref(false);
const isDark = ref(false);
const showBackToTop = ref(false);
const subtitleWrap = ref(null);
const subtitleScroll = ref(null);
const currentSongIndex = ref(Math.floor(Math.random() * songs.length));
const currentLyricIndex = ref(0);
let lyricTimer;

const text = computed(() => translations[currentLang.value]);
const currentSong = computed(() => songs[currentSongIndex.value]);
const lyricTransform = computed(() => `translateY(-${currentLyricIndex.value * 20}px)`);

function toggleLangMenu() {
  isLangMenuOpen.value = !isLangMenuOpen.value;
}

function setLang(lang) {
  currentLang.value = lang;
  localStorage.setItem('lang', lang);
  isLangMenuOpen.value = false;
}

function toggleTheme() {
  isDark.value = !isDark.value;
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark', isDark.value);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openPlaylist() {
  window.open('https://docs.rishu.cfd/learn-more/playlist', '_blank');
}

function handleDocumentClick(event) {
  if (!event.target.closest('.lang-selector')) {
    isLangMenuOpen.value = false;
  }
}

function handleScroll() {
  showBackToTop.value = window.scrollY > 300;
}

function updateSubtitleHeight() {
  const wrap = subtitleWrap.value;
  const scroll = subtitleScroll.value;

  if (!wrap || !scroll) return;

  const height = window.innerWidth <= 600 ? 36 : 48;
  wrap.style.setProperty('--subtitle-height', `${height}px`);
  scroll.style.animation = 'none';
  void scroll.offsetHeight;
  scroll.style.animation = '';
}

function scrollLyrics() {
  const lyrics = currentSong.value.lyrics;

  if (!lyrics.length) return;

  currentLyricIndex.value = (currentLyricIndex.value + 1) % lyrics.length;
}

onMounted(async () => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  isDark.value = savedTheme === 'dark' || (!savedTheme && prefersDark);
  document.documentElement.classList.toggle('dark', isDark.value);

  await nextTick();
  updateSubtitleHeight();

  lyricTimer = window.setInterval(scrollLyrics, 3000);
  document.addEventListener('click', handleDocumentClick);
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', updateSubtitleHeight);
});

onBeforeUnmount(() => {
  window.clearInterval(lyricTimer);
  document.removeEventListener('click', handleDocumentClick);
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', updateSubtitleHeight);
});
</script>

<template>
  <div class="dotted-bg"></div>

  <div class="container">
    <nav class="top-bar">
      <div class="site-title">
        <a href="https://rishu.cfd">RISHU.CFD</a>
      </div>
      <div class="nav-right">
        <a href="https://travel.moe/go.html" class="nav-link travel-link" title="异次元之旅-跃迁-我们一起去萌站成员的星球旅行吧！" target="_blank">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" style="vertical-align: middle; margin-right: 4px;">
            <circle cx="12" cy="12" r="5" />
            <ellipse cx="12" cy="12" rx="10" ry="3" transform="rotate(-30 12 12)" />
          </svg>
          <span>{{ text.travel }}</span>
        </a>
        <a href="https://docs.rishu.cfd" class="nav-link" target="_blank">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
          <span>DOCS</span>
        </a>
        <a href="https://status.rishu.cfd" class="nav-link" target="_blank">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span>STATUS</span>
        </a>
        <div class="lang-selector">
          <button class="lang-btn" type="button" @click.stop="toggleLangMenu">
            <svg class="lang-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span id="currentLang">{{ langNames[currentLang] }}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div id="langMenu" class="lang-menu" :class="{ show: isLangMenuOpen }">
            <div class="lang-menu-header">{{ text.langHint }}</div>
            <button type="button" @click="setLang('zh')">中文</button>
            <button type="button" @click="setLang('en')">English</button>
            <button type="button" @click="setLang('ja')">日本語</button>
          </div>
        </div>
        <button class="theme-toggle" type="button" aria-label="Toggle theme" @click="toggleTheme">
          <svg id="sunIcon" v-show="isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg id="moonIcon" v-show="!isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
          <span id="themeText">{{ isDark ? 'LIGHT' : 'DARK' }}</span>
        </button>
      </div>
    </nav>

    <div class="section-label">ABOUT MYSELF</div>

    <div class="header">
      <div class="avatar-large">
        <img :src="rishuAvatar" alt="Rishu">
      </div>
      <h1 class="title-main">IT'S RISHU.</h1>
      <div ref="subtitleWrap" class="subtitle-scroll-wrap">
        <div ref="subtitleScroll" class="subtitle-scroll">
          <span v-for="item in subtitleItems" :key="item" class="subtitle-item">{{ item }}</span>
        </div>
      </div>
      <div class="status">
        <div class="status-dot"></div>
        <span>SLACKING OFF...</span>
      </div>
    </div>

    <div class="bio">{{ text.bio }}</div>

    <div class="divider"></div>

    <div class="info-grid">
      <div v-for="[label, value] in infoItems" :key="label" class="info-item">
        <div class="label">{{ label }}</div>
        <div class="value">{{ value }}</div>
      </div>
    </div>

    <div class="tags-row">
      <div class="tags-section">
        <div class="tags-title">PLAYING</div>
        <div class="tags">
          <span v-for="tag in playingTags" :key="tag" class="tag" :class="{ accent: tag === 'Minecraft' }">{{ tag }}</span>
        </div>
      </div>

      <div class="tags-section">
        <div class="tags-title">LISTENING</div>
        <div class="tags">
          <span v-for="tag in listeningTags" :key="tag" class="tag accent">{{ tag }}</span>
        </div>
        <div class="now-playing">
          <div class="now-playing-cover">
            <img :src="currentSong.cover" alt="">
          </div>
          <div class="now-playing-info">
            <div class="label">Now Playing</div>
            <div id="npSong" class="song">{{ currentSong.title }} - {{ currentSong.artist }}</div>
            <div class="lyrics-scroll-wrap">
              <div id="npLyrics" class="lyrics-scroll" :style="{ transform: lyricTransform }">
                <span v-for="line in currentSong.lyrics" :key="line" class="lyrics-item">{{ line }}</span>
              </div>
            </div>
          </div>
          <button id="npPlayBtn" class="np-play-btn" type="button" title="播放" @click="openPlaylist">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="quote">{{ text.quote }}</div>

    <div class="links-section">
      <div class="section-label">CONTACT ME</div>
      <div class="links-grid">
        <a href="mailto:rishu@rishu.cfd" class="link-card">
          <div class="link-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <div class="link-info">
            <div class="link-name">{{ text.emailTitle }}</div>
            <div class="link-desc">rishu@rishu.cfd</div>
          </div>
        </a>
        <a href="https://qm.qq.com/q/LF2qz5Omcy" class="link-card" target="_blank">
          <div class="link-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </div>
          <div class="link-info">
            <div class="link-name">{{ text.qqTitle }}</div>
            <div class="link-desc">3436984302</div>
          </div>
        </a>
      </div>
    </div>

    <div class="footer">
      MADE BY <a href="https://yz-mm.top">YZMM</a>
      <span class="footer-divider">|</span>
      <a href="https://icp.gov.moe/?keyword=20260823" target="_blank" class="icp-link">萌ICP备20260823号</a>
    </div>
  </div>

  <button class="back-to-top" :class="{ show: showBackToTop }" type="button" aria-label="Back to top" @click="scrollToTop">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  </button>
</template>
