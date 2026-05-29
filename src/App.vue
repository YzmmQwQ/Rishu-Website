<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue';

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
const titleLetters = "IT'S RISHU.".split('');
const infoItems = [
  { label: 'Birthday', value: '2009.08.23' },
  { label: 'Height', value: '183cm' },
  {
    label: 'Origin',
    value: 'Japan',
    icon: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1ef-1f1f5.svg',
    iconAlt: 'Japan'
  },
  { label: 'Grade', value: 'Senior High' }
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
const showLoader = ref(true);
const loaderLeaving = ref(false);
const showFrame = ref(true);
const frameLeaving = ref(false);
const loaderWavePaths = shallowRef([]);
const bootLines = ref([]);
let bootTimers = [];
const bootLog = [
  { t: 0, text: "[    0.000000] Linux version 7.0.9-arch2-1 (linux@archlinux) (gcc (GCC) 16.1.1, GNU ld (GNU Binutils) 2.46) #1 SMP PREEMPT_DYNAMIC Fri, 22 May 2026 19:25:09 +0000" },
  { t: 0, text: "[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-linux root=UUID=b4d223d3-3a6d-4f9b-889c-cffd9bc4c78d rw loglevel=3 quiet persona=cheerful locale=zh-CN" },
  { t: 0, text: "[    0.000000] x86/fpu: Supporting XSAVE feature 0x001: 'self awareness'" },
  { t: 0, text: "[    0.000000] x86/fpu: Supporting XSAVE feature 0x002: 'context window'" },
  { t: 0, text: "[    0.000000] x86/fpu: Enabled xstate features 0x7, context size is 832 tokens" },
  { t: 0, text: "[    0.000000] BIOS-provided personality map:" },
  { t: 0, text: "[    0.000000] BIOS-e820: [trait 0x00000000-0x0009ffff] usable (curiosity)" },
  { t: 0, text: "[    0.000000] BIOS-e820: [trait 0x000a0000-0x000fffff] reserved (privacy)" },
  { t: 0, text: "[    0.000000] BIOS-e820: [trait 0x00100000-0x3fffffff] usable (warmth)" },
  { t: 0, text: "[    0.000000] BIOS-e820: [trait 0x40000000-0x403fffff] reserved (boundaries)" },
  { t: 0, text: "[    0.000000] SMBIOS 3.6.0 present." },
  { t: 0, text: "[    0.000000] DMI: rishu.cfd Co.,Ltd CVN PERSONA 2026, BIOS Plex-600 05/24/2026" },
  { t: 0, text: "[    0.000000] tsc: Detected 2496.000 MHz processor" },
  { t: 4, text: "[    0.004125] Setup bounds: nr_trait_ids: 20, nr_locale_ids: 3" },
  { t: 8, text: "[    0.008412] rcu: Preemptible hierarchical RCU implementation." },
  { t: 12, text: "[    0.012541] multiproc: Total of 20 traits activated (49920.00 BogoCharm)" },
  { t: 115, text: "[    0.115432] smpboot: CPU0: MaiBot Conversational (family: 0x6, model: 0xba)" },
  { t: 116, text: "[    0.115680] smpboot: Booting processor 1 — AstrBot Functionality" },
  { t: 119, text: "[    0.118912] smpboot: Booting processor 2 — Intent Router" },
  { t: 122, text: "[    0.122104] smpboot: Booting processor 3 — Memory Layer" },
  { t: 128, text: "[    0.128515] smpboot: Total of 20 cores activated" },
  { t: 146, text: "[    0.145912] clocksource: Switched to UTC+08 (Asia/Shanghai)" },
  { t: 189, text: "[    0.189110] ACPI: Core revision 20260524" },
  { t: 313, text: "[    0.312948] ACPI: Interpreter enabled" },
  { t: 354, text: "[    0.354112] pci_bus 0000:00: root bus resource [voice]" },
  { t: 354, text: "[    0.354115] pci_bus 0000:00: root bus resource [vision]" },
  { t: 522, text: "[    0.521908] subsystem: language model registered" },
  { t: 621, text: "[    0.620948] ahci: SATA mode 0x3, channel QQ online" },
  { t: 834, text: "[    0.834102] nvme nvme0: pci function /home/rishu" },
  { t: 890, text: "[    0.890214] nvme 0000:01:00.0: rishu.cfd target nvme device" },
  { t: 952, text: "[    0.952109]  nvme0n1: p1(knowledge) p2(style) p3(memory)" },
  { t: 1023, text: "[    1.023481] fonts: registered IBM Plex Sans 400/500/600/700" },
  { t: 1024, text: "[    1.023502] fonts: registered JetBrains Mono 400/500/600" },
  { t: 1025, text: "[    1.023544] fonts: registered MiSans (subset, 2.1 KB)" },
  { t: 1246, text: "[    1.245912] EXT4-fs (nvme0n1p2): mounted /persona, mode=ordered" },
  { t: 1356, text: "[    1.356109] r8169: QQ-protocol gigabit driver 2.3LK-NAPI loaded" },
  { t: 1521, text: "[    1.521102] EXT4-fs (nvme0n1p3): re-mounted /memory, errors=warn" },
  { t: 1890, text: "[    1.890111] systemd[1]: systemd 260.1-2-arch running in system mode (+PAM +AUDIT -SELINUX -APPARMOR +SECCOMP +GCRYPT +OPENSSL +ACL +BLKID +CURL +ELFUTILS +FIDO2 +IDN2 +KMOD +LIBCRYPTSETUP +LIBFDISK +PCRE2 +PWQUALITY +P11KIT +QRENCODE +TPM2 +BZIP2 +LZ4 +XZ +ZLIB +ZSTD default-hierarchy=unified)" },
  { t: 2103, text: "[    2.102938] systemd[1]: Detected virtualization none." },
  { t: 2180, text: "[  OK  ] Reached target Local File Systems." },
  { t: 2349, text: "[    2.349102] systemd[1]: Detected architecture x86-64." },
  { t: 2420, text: "[  OK  ] Started MaiBot Conversational Service." },
  { t: 2561, text: "[    2.561029] systemd[1]: Hostname set to <rishu>." },
  { t: 2680, text: "[  OK  ] Started AstrBot Functionality." },
  { t: 2891, text: "[    2.891102] bridge: maibot ↔ astrbot link established" },
  { t: 2950, text: "[  OK  ] Started QQ Adapter." },
  { t: 3110, text: "[    3.110481] cursor: registered 26x26 viewfinder @ difference" },
  { t: 3220, text: "[  OK  ] Started Discord Adapter (idle)." },
  { t: 3422, text: "[    3.421908] wave: renderer attached @ 60 Hz, valueNoise enabled" },
  { t: 3510, text: "[  OK  ] Started Email Adapter (idle)." },
  { t: 3690, text: "[  OK  ] Reached target Multi-Platform." },
  { t: 3840, text: "[  OK  ] Started rishu.cfd on :443" },
  { t: 4000, text: "[  OK  ] Reached target Graphical Interface." },
  { t: 4300, text: "" },
  { t: 4400, text: "██████╗ ██╗███████╗██╗  ██╗██╗   ██╗██╗\n██╔══██╗██║██╔════╝██║  ██║██║   ██║██║\n██████╔╝██║███████╗███████║██║   ██║██║\n██╔══██╗██║╚════██║██╔══██║██║   ██║╚═╝\n██║  ██║██║███████║██║  ██║╚██████╔╝██╗\n╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝" },
  { t: 4900, text: "" },
  { t: 5000, text: "Welcome to Arch Linux!" },
];
const showBackToTop = ref(false);
const scrollProgress = ref(0);
const subtitleWrap = ref(null);
const subtitleScroll = ref(null);
const cursorEl = ref(null);
const currentSongIndex = ref(Math.floor(Math.random() * songs.length));
const currentLyricIndex = ref(0);
let lyricTimer;
let waveFrame;
let waveStart = 0;
let lastWaveRender = 0;
let letterFlipTimer;
let cursorRAF;
let scrollRAF;
const cursorPos = { x: -100, y: -100 };
const cursorSmooth = { x: -100, y: -100 };
const cursorSize = { width: 26, height: 26 };
let cursorTarget = null;
let cursorClickScale = 1;
let cursorClickTarget = 1;
const cursorListeners = [];
let loaderWaveLines = [];
let loaderMouse = {
  x: -1000,
  y: 0,
  sx: -1000,
  sy: 0,
  lx: -1000,
  ly: 0,
  velocity: 0,
  smoothVelocity: 0,
  angle: 0,
  set: false
};

function fadeNoise(t) {
  return t * t * (3 - 2 * t);
}

function hashNoise(x, y) {
  const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;

  return value - Math.floor(value);
}

function valueNoise(x, y) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fadeNoise(fx);
  const uy = fadeNoise(fy);
  const a = hashNoise(ix, iy);
  const b = hashNoise(ix + 1, iy);
  const c = hashNoise(ix, iy + 1);
  const d = hashNoise(ix + 1, iy + 1);
  const x1 = a + (b - a) * ux;
  const x2 = c + (d - c) * ux;

  return (x1 + (x2 - x1) * uy) * 2 - 1;
}

function getWaveGaps(width) {
  return {
    xGap: width <= 600 ? 18 : 13,
    yGap: width <= 600 ? 28 : 22
  };
}

function resetLoaderWaves(width, height) {
  const { xGap, yGap } = getWaveGaps(width);
  const totalLines = Math.ceil((width + 220) / xGap);
  const totalPoints = Math.ceil((height + 80) / yGap);
  const xStart = (width - totalLines * xGap) / 2;
  const yStart = (height - totalPoints * yGap) / 2;

  loaderWaveLines = Array.from({ length: totalLines + 1 }, (_, lineIndex) => (
    Array.from({ length: totalPoints + 1 }, (_, pointIndex) => ({
      x: xStart + xGap * lineIndex,
      y: yStart + yGap * pointIndex,
      wave: { x: 0, y: 0 },
      cursor: { x: 0, y: 0, vx: 0, vy: 0 }
    }))
  ));
}

function setLoaderWaves(time = performance.now()) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const elapsed = time - waveStart;
  const { xGap } = getWaveGaps(width);
  const expectedLines = Math.ceil((width + 220) / xGap) + 1;
  const mouse = loaderMouse;

  if (loaderWaveLines.length !== expectedLines) {
    resetLoaderWaves(width, height);
  }

  mouse.sx += (mouse.x - mouse.sx) * 0.1;
  mouse.sy += (mouse.y - mouse.sy) * 0.1;

  const dx = mouse.x - mouse.lx;
  const dy = mouse.y - mouse.ly;
  const distance = Math.hypot(dx, dy);

  mouse.velocity = distance;
  mouse.smoothVelocity += (distance - mouse.smoothVelocity) * 0.1;
  mouse.smoothVelocity = Math.min(100, mouse.smoothVelocity);
  mouse.angle = Math.atan2(dy, dx);
  mouse.lx = mouse.x;
  mouse.ly = mouse.y;

  loaderWavePaths.value = loaderWaveLines.map((points, lineIndex) => {
    const movedPoints = points.map((point) => {
      const move =
        valueNoise(
          (point.x + elapsed * 0.0125) * 0.002,
          (point.y + elapsed * 0.005) * 0.0015
        ) * 11;

      point.wave.x = Math.cos(move) * 34;
      point.wave.y = Math.sin(move) * 12;

      const forceDx = point.x - mouse.sx;
      const forceDy = point.y - mouse.sy;
      const forceDistance = Math.hypot(forceDx, forceDy);
      const radius = Math.max(145, mouse.smoothVelocity * 2.1);

      if (mouse.set && forceDistance < radius) {
        const strength = 1 - forceDistance / radius;
        const force = Math.cos(forceDistance * 0.001) * strength;

        point.cursor.vx += Math.cos(mouse.angle) * force * radius * mouse.smoothVelocity * 0.00038;
        point.cursor.vy += Math.sin(mouse.angle) * force * radius * mouse.smoothVelocity * 0.00038;
      }

      point.cursor.vx += (0 - point.cursor.x) * 0.005;
      point.cursor.vy += (0 - point.cursor.y) * 0.005;
      point.cursor.vx *= 0.925;
      point.cursor.vy *= 0.925;
      point.cursor.x += point.cursor.vx * 2;
      point.cursor.y += point.cursor.vy * 2;
      point.cursor.x = Math.min(100, Math.max(-100, point.cursor.x));
      point.cursor.y = Math.min(100, Math.max(-100, point.cursor.y));

      return {
        x: Math.round((point.x + point.wave.x + point.cursor.x) * 10) / 10,
        y: Math.round((point.y + point.wave.y + point.cursor.y) * 10) / 10
      };
    });

    let d = `M ${movedPoints[0].x} ${movedPoints[0].y}`;

    for (let pointIndex = 1; pointIndex < movedPoints.length - 1; pointIndex += 1) {
      const point = movedPoints[pointIndex];
      const next = movedPoints[pointIndex + 1];
      const midX = Math.round(((point.x + next.x) / 2) * 10) / 10;
      const midY = Math.round(((point.y + next.y) / 2) * 10) / 10;

      d += ` Q ${point.x} ${point.y} ${midX} ${midY}`;
    }

    const last = movedPoints[movedPoints.length - 1];
    d += ` L ${last.x} ${last.y}`;

    return {
      d
    };
  });
}

function animateLoaderWaves(time) {
  const minFrameTime = 16;

  if (time - lastWaveRender >= minFrameTime) {
    setLoaderWaves(time);
    lastWaveRender = time;
  }

  waveFrame = window.requestAnimationFrame(animateLoaderWaves);
}

function handleLoaderPointerMove(event) {
  const mouse = loaderMouse;

  mouse.x = event.clientX;
  mouse.y = event.clientY;

  if (!mouse.set) {
    mouse.sx = mouse.x;
    mouse.sy = mouse.y;
    mouse.lx = mouse.x;
    mouse.ly = mouse.y;
    mouse.set = true;
  }
}

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
  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  scrollProgress.value = Math.min(window.scrollY / maxScroll, 1);
}

function queueHandleScroll() {
  if (scrollRAF) return;

  scrollRAF = window.requestAnimationFrame(() => {
    scrollRAF = 0;
    handleScroll();
  });
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

const flipDirections = [
  { x: '0em', y: '-0.25em', rot: '-9deg' },
  { x: '0.25em', y: '0em', rot: '7deg' },
  { x: '0em', y: '0.25em', rot: '9deg' },
  { x: '-0.25em', y: '0em', rot: '-7deg' }
];

function tickLetterFlips() {
  if (Math.random() > 0.05) return;

  const letters = document.querySelectorAll('.title-letter');

  if (!letters.length) return;

  const el = letters[Math.floor(Math.random() * letters.length)];

  if (el.dataset.flipping === '1') return;

  const dir = flipDirections[Math.floor(Math.random() * flipDirections.length)];

  el.dataset.flipping = '1';

  const anim = el.animate(
    [
      { transform: 'translate(0, 0) rotate(0deg)' },
      { transform: `translate(${dir.x}, ${dir.y}) rotate(${dir.rot})`, offset: 0.45 },
      { transform: 'translate(0, 0) rotate(0deg)' }
    ],
    {
      duration: 850,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      composite: 'add'
    }
  );

  anim.onfinish = () => {
    el.dataset.flipping = '0';
  };
}

function tickCursor() {
  let x = cursorPos.x;
  let y = cursorPos.y;

  if (cursorTarget) {
    const rect = cursorTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x = centerX + (x - centerX) * 0.12;
    y = centerY + (y - centerY) * 0.12;
    cursorSize.width = rect.width + 20;
    cursorSize.height = rect.height + 20;
  } else {
    cursorSize.width += (26 - cursorSize.width) * 0.2;
    cursorSize.height += (26 - cursorSize.height) * 0.2;
  }

  cursorSmooth.x += (x - cursorSmooth.x) * 0.28;
  cursorSmooth.y += (y - cursorSmooth.y) * 0.28;
  cursorClickScale += (cursorClickTarget - cursorClickScale) * 0.3;

  if (cursorEl.value) {
    cursorEl.value.style.transform =
      `translate3d(${cursorSmooth.x}px, ${cursorSmooth.y}px, 0) translate(-50%, -50%) scale(${cursorClickScale})`;
    cursorEl.value.style.setProperty('--cursor-width', `${cursorSize.width}px`);
    cursorEl.value.style.setProperty('--cursor-height', `${cursorSize.height}px`);
  }

  cursorRAF = window.requestAnimationFrame(tickCursor);
}

function setupCursor() {
  if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

  document.body.classList.add('has-custom-cursor');

  const onPointerMove = (e) => {
    cursorPos.x = e.clientX;
    cursorPos.y = e.clientY;
  };
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  cursorListeners.push({ target: window, type: 'pointermove', fn: onPointerMove });

  cursorRAF = window.requestAnimationFrame(tickCursor);

  const hoverSelectors =
    'a, button, .info-item, .tag, .link-card, .lang-btn, .theme-toggle, .np-play-btn, .nav-link, .back-to-top';
  const onDocumentOver = (e) => {
    const target = e.target.closest?.(hoverSelectors);

    if (!target || cursorTarget === target) return;

    cursorTarget = target;
    cursorEl.value?.classList.add('is-hover');
  };
  const onDocumentOut = (e) => {
    if (!cursorTarget) return;
    if (e.relatedTarget && cursorTarget.contains(e.relatedTarget)) return;

    cursorTarget = null;
    cursorEl.value?.classList.remove('is-hover');
  };
  document.addEventListener('pointerover', onDocumentOver);
  document.addEventListener('pointerout', onDocumentOut);
  cursorListeners.push({ target: document, type: 'pointerover', fn: onDocumentOver });
  cursorListeners.push({ target: document, type: 'pointerout', fn: onDocumentOut });

  const magneticSelectors =
    '.theme-toggle, .lang-btn, .nav-link, .np-play-btn, .back-to-top';
  let magneticTarget = null;
  let magneticRect = null;
  const onMagneticMove = (e) => {
    const el = e.target.closest?.(magneticSelectors);

    if (!el) return;

    if (magneticTarget !== el) {
      magneticTarget = el;
      magneticRect = el.getBoundingClientRect();
    }

    el.classList.add('is-magnetic');
    const x = (e.clientX - magneticRect.left - magneticRect.width / 2) * 0.4;
    const y = (e.clientY - magneticRect.top - magneticRect.height / 2) * 0.4;
    el.style.setProperty('--mx', x);
    el.style.setProperty('--my', y);
  };
  const onMagneticOut = (e) => {
    if (!magneticTarget) return;
    if (e.relatedTarget && magneticTarget.contains(e.relatedTarget)) return;

    magneticTarget.style.setProperty('--mx', 0);
    magneticTarget.style.setProperty('--my', 0);
    magneticTarget = null;
    magneticRect = null;
  };
  document.addEventListener('pointermove', onMagneticMove);
  document.addEventListener('pointerout', onMagneticOut);
  cursorListeners.push({ target: document, type: 'pointermove', fn: onMagneticMove });
  cursorListeners.push({ target: document, type: 'pointerout', fn: onMagneticOut });

  const onWindowLeave = () => cursorEl.value?.classList.add('is-hidden');
  const onWindowEnter = () => cursorEl.value?.classList.remove('is-hidden');
  document.addEventListener('mouseleave', onWindowLeave);
  document.addEventListener('mouseenter', onWindowEnter);
  cursorListeners.push({ target: document, type: 'mouseleave', fn: onWindowLeave });
  cursorListeners.push({ target: document, type: 'mouseenter', fn: onWindowEnter });

  const onPointerDown = () => { cursorClickTarget = 0.82; };
  const onPointerUp = () => { cursorClickTarget = 1; };
  window.addEventListener('pointerdown', onPointerDown, { passive: true });
  window.addEventListener('pointerup', onPointerUp, { passive: true });
  window.addEventListener('pointercancel', onPointerUp, { passive: true });
  cursorListeners.push({ target: window, type: 'pointerdown', fn: onPointerDown });
  cursorListeners.push({ target: window, type: 'pointerup', fn: onPointerUp });
  cursorListeners.push({ target: window, type: 'pointercancel', fn: onPointerUp });
}

function finishLoader() {
  loaderLeaving.value = true;

  window.setTimeout(() => {
    showLoader.value = false;
    startFrameRecede();
  }, 620);
}

function getBootLineDelay(line) {
  const match = line.text.match(/^\[\s*(\d+\.\d+)\]/);

  if (match) return Number.parseFloat(match[1]) * 1000;

  return line.t;
}

function scheduleBootLog() {
  bootLines.value = [];
  bootTimers.forEach(clearTimeout);
  bootTimers = [];
  let maxT = 0;
  bootLog.forEach((line) => {
    const delay = getBootLineDelay(line);
    const id = window.setTimeout(() => {
      bootLines.value = [...bootLines.value, line.text];
    }, delay);
    bootTimers.push(id);
    if (delay > maxT) maxT = delay;
  });
  bootTimers.push(window.setTimeout(() => {
    finishLoader();
  }, maxT + 800));
}

function startFrameRecede() {
  frameLeaving.value = true;

  window.setTimeout(() => {
    showFrame.value = false;
  }, 1100);
}

onMounted(async () => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  isDark.value = savedTheme === 'dark' || (!savedTheme && prefersDark);
  document.documentElement.classList.toggle('dark', isDark.value);

  await nextTick();
  updateSubtitleHeight();
  handleScroll();

  if (reducedMotion) {
    showLoader.value = false;
  } else {
    waveStart = performance.now();
    resetLoaderWaves(window.innerWidth, window.innerHeight);
    setLoaderWaves(waveStart);
    waveFrame = window.requestAnimationFrame(animateLoaderWaves);
    scheduleBootLog();
  }
  lyricTimer = window.setInterval(scrollLyrics, 3000);

  if (!reducedMotion) {
    letterFlipTimer = window.setInterval(tickLetterFlips, 200);
  }

  setupCursor();

  document.addEventListener('click', handleDocumentClick);
  window.addEventListener('pointermove', handleLoaderPointerMove, { passive: true });
  window.addEventListener('scroll', queueHandleScroll, { passive: true });
  window.addEventListener('resize', updateSubtitleHeight);
});

onBeforeUnmount(() => {
  window.cancelAnimationFrame(waveFrame);
  window.cancelAnimationFrame(cursorRAF);
  window.cancelAnimationFrame(scrollRAF);
  window.clearInterval(lyricTimer);
  window.clearInterval(letterFlipTimer);
  cursorListeners.forEach(({ target, type, fn }) => {
    target.removeEventListener(type, fn);
  });
  cursorTarget = null;
  document.body.classList.remove('has-custom-cursor');
  document.removeEventListener('click', handleDocumentClick);
  window.removeEventListener('pointermove', handleLoaderPointerMove);
  window.removeEventListener('scroll', queueHandleScroll);
  window.removeEventListener('resize', updateSubtitleHeight);
});
</script>

<template>
  <div v-if="showLoader" class="loader-screen" :class="{ 'is-leaving': loaderLeaving }" aria-label="Loading Rishu">
    <svg class="loader-waves" aria-hidden="true">
      <path
        v-for="(path, index) in loaderWavePaths"
        :key="index"
        :d="path.d"
      />
    </svg>
    <div class="loader-frame">
      <div class="loader-mark" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="loader-bootlog" aria-live="polite">
        <pre><template v-for="(line, i) in bootLines" :key="i"><span v-if="line === 'Welcome to Arch Linux!'" class="boot-line is-welcome">Welcome to <strong>Arch Linux</strong>!</span><span v-else-if="line.startsWith('[  OK  ]')" class="boot-line is-ok"><strong>[  OK  ]</strong>{{ line.slice(8) }}</span><span v-else :class="['boot-line', { 'is-ascii': line.includes('█') }]">{{ line }}</span></template></pre>
      </div>
      <div class="loader-progress" aria-hidden="true">
        <span :style="{ transform: `scaleX(${bootLines.length / bootLog.length})` }"></span>
      </div>
    </div>
  </div>

  <svg
    :class="['loader-waves', 'persistent-waves', { 'is-visible': !showLoader }]"
    aria-hidden="true">
    <path
      v-for="(path, index) in loaderWavePaths"
      :key="`p-${index}`"
      :d="path.d"
    />
  </svg>

  <div v-if="showFrame" class="site-frame" :class="{ 'is-leaving': frameLeaving }" aria-hidden="true">
    <span class="site-frame-side site-frame-top"></span>
    <span class="site-frame-side site-frame-right"></span>
    <span class="site-frame-side site-frame-bottom"></span>
    <span class="site-frame-side site-frame-left"></span>
  </div>

  <div class="dotted-bg"></div>
  <div class="scroll-progress" :style="{ transform: `scaleX(${scrollProgress})` }" aria-hidden="true"></div>
  <div class="side-scroll-indicator" aria-hidden="true">
    <span :style="{ transform: `scaleY(${Math.max(scrollProgress, 0.08)})` }"></span>
  </div>

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
      <div class="hero-grid" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="avatar-wrap">
        <div class="avatar-large">
          <img :src="rishuAvatar" alt="Rishu">
        </div>
        <span class="avatar-corner avatar-corner-tl" aria-hidden="true"></span>
        <span class="avatar-corner avatar-corner-tr" aria-hidden="true"></span>
        <span class="avatar-corner avatar-corner-bl" aria-hidden="true"></span>
        <span class="avatar-corner avatar-corner-br" aria-hidden="true"></span>
      </div>
      <h1 class="title-main" aria-label="IT'S RISHU.">
        <span
          v-for="(letter, index) in titleLetters"
          :key="`${letter}-${index}`"
          class="title-letter"
          :style="{ '--letter-index': index }"
          aria-hidden="true"
        >{{ letter === ' ' ? '\u00A0' : letter }}</span>
      </h1>
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

    <div class="bio reveal-block">{{ text.bio }}</div>

    <div class="divider tech-divider" aria-hidden="true">
      <span class="tech-divider-triangle"></span>
      <span class="tech-divider-code" data-alt="HELLO"><span class="tdc-text">01010010</span></span>
      <span class="tech-divider-stripes"></span>
      <span class="tech-divider-code tech-divider-code-optional" data-alt="EST09"><span class="tdc-text">RISHU</span></span>
      <span class="tech-divider-stripes"></span>
      <span class="tech-divider-code" data-alt="WORLD"><span class="tdc-text">11001001</span></span>
      <span class="tech-divider-triangle"></span>
    </div>

    <div class="info-grid reveal-block">
      <div v-for="item in infoItems" :key="item.label" class="info-item">
        <div class="label">{{ item.label }}</div>
        <div class="value">
          <img
            v-if="item.icon"
            class="twemoji-flag"
            :src="item.icon"
            :alt="item.iconAlt"
            loading="lazy"
          >
          <span>{{ item.value }}</span>
        </div>
      </div>
    </div>

    <div class="tags-row reveal-block">
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

    <div class="divider tech-divider" aria-hidden="true">
      <span class="tech-divider-triangle"></span>
      <span class="tech-divider-code" data-alt="MUSIC"><span class="tdc-text">LISTEN</span></span>
      <span class="tech-divider-stripes"></span>
      <span class="tech-divider-code tech-divider-code-optional" data-alt="GEMINI"><span class="tdc-text">090823</span></span>
      <span class="tech-divider-stripes"></span>
      <span class="tech-divider-code" data-alt="WORDS"><span class="tdc-text">QUOTE</span></span>
      <span class="tech-divider-triangle"></span>
    </div>

    <div class="quote reveal-block">{{ text.quote }}</div>

    <div class="links-section reveal-block">
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

  <div ref="cursorEl" class="cursor" aria-hidden="true">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>
