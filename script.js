/* ==========================================================================
   廖祤歆 (Liao Yu-Xin) - 萌萌可愛風個人網站 互動腳本 (Kawaii Script)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initTypewriter();
  initTypingGame();
  initCheerButton();
  initThemeToggle();
  initScrollAnimations();
});

/* 1. 浮動粒子背景動畫 (Sakura, Stars & Hearts Floating Canvas) */
function initParticleCanvas() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 35;
  const types = ['heart', 'star', 'circle', 'petal'];
  const colors = ['#ff8fa3', '#c77dff', '#80ed99', '#ffea00', '#ffccd5'];

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 50;
      this.size = Math.random() * 12 + 6;
      this.speedY = Math.random() * 1.5 + 0.5;
      this.speedX = Math.sin(Math.random() * Math.PI * 2) * 0.8;
      this.type = types[Math.floor(Math.random() * types.length)];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.opacity = Math.random() * 0.6 + 0.3;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.03;
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.01) * 0.5;
      this.rotation += this.rotationSpeed;

      if (this.y < -20 || this.x < -20 || this.x > width + 20) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;

      if (this.type === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.type === 'heart') {
        ctx.beginPath();
        const topCurveHeight = this.size * 0.3;
        ctx.moveTo(0, topCurveHeight);
        ctx.bezierCurveTo(0, 0, -this.size / 2, 0, -this.size / 2, topCurveHeight);
        ctx.bezierCurveTo(-this.size / 2, (this.size + topCurveHeight) / 2, 0, this.size, 0, this.size);
        ctx.bezierCurveTo(0, (this.size + topCurveHeight) / 2, this.size / 2, (this.size + topCurveHeight) / 2, this.size / 2, topCurveHeight);
        ctx.bezierCurveTo(this.size / 2, 0, 0, 0, 0, topCurveHeight);
        ctx.fill();
      } else if (this.type === 'star') {
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * this.size, -Math.sin((18 + i * 72) * Math.PI / 180) * this.size);
          ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * (this.size / 2), -Math.sin((54 + i * 72) * Math.PI / 180) * (this.size / 2));
        }
        ctx.fill();
      } else {
        // 花瓣 (petal)
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size / 3, this.size / 1.5, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

/* 2. 動態打字機效果 (Hero Typewriter Effect) */
function initTypewriter() {
  const target = document.getElementById('typewriter-text');
  if (!target) return;

  const phrases = [
    "現就讀安溪國中 🎒",
    "熱愛商業經營與電子商務 🛒",
    "探索智慧科技與網頁開發 💻",
    "在智光商工課程精進打字指法 ⌨️",
    "期許成為全方位數位商管跨領域人才 ✨"
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const current = phrases[phraseIdx];
    
    if (isDeleting) {
      target.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      target.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let typeSpeed = isDeleting ? 40 : 90;

    if (!isDeleting && charIdx === current.length) {
      typeSpeed = 2200; // 停頓時間
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* 3. 🔤 打字指法與速度互動挑戰 (Interactive Typing Game) */
function initTypingGame() {
  const wordsList = [
    { word: "business", tip: "💡 指法提示：左手食指 B、右手中指 I、左手無名指 S..." },
    { word: "ecommerce", tip: "💡 指法提示：中指 E、食指 C、無名指 O、中指 M..." },
    { word: "smarttech", tip: "💡 指法提示：無名指 S、中指 M、食指 A、小指 P/T..." },
    { word: "zhiguang", tip: "💡 指法提示：食指 Z/H、中指 I、食指 G/U/A/N..." },
    { word: "anxi", tip: "💡 指法提示：左手小指 A、右手食指 N、左手小指 X..." },
    { word: "digital", tip: "💡 指法提示：中指 D、食指 I/G/I/T、小指 A/L..." }
  ];

  let currentIdx = 0;
  let score = 0;
  let startTime = null;

  const wordDisplay = document.getElementById('typing-target');
  const inputField = document.getElementById('typing-input');
  const tipDisplay = document.getElementById('typing-tip');
  const scoreDisplay = document.getElementById('typing-score');
  const wpmDisplay = document.getElementById('typing-wpm');

  if (!wordDisplay || !inputField) return;

  function loadWord() {
    const current = wordsList[currentIdx];
    wordDisplay.textContent = current.word;
    tipDisplay.textContent = current.tip;
    inputField.value = '';
    inputField.style.borderColor = 'var(--primary-pink)';
  }

  loadWord();

  inputField.addEventListener('input', (e) => {
    if (!startTime) startTime = new Date();

    const val = e.target.value.trim().toLowerCase();
    const target = wordsList[currentIdx].word.toLowerCase();

    if (target.startsWith(val)) {
      inputField.style.borderColor = 'var(--accent-mint)';
    } else {
      inputField.style.borderColor = 'var(--primary-pink-dark)';
    }

    if (val === target) {
      score += 10;
      scoreDisplay.textContent = score;
      
      // 計算 WPM
      const now = new Date();
      const timeInMinutes = (now - startTime) / 60000;
      const wpm = Math.round((score / 5) / (timeInMinutes || 0.1));
      wpmDisplay.textContent = Math.min(wpm, 120);

      // 動態特效反饋
      createBurstEffect(inputField);

      currentIdx = (currentIdx + 1) % wordsList.length;
      setTimeout(loadWord, 200);
    }
  });
}

function createBurstEffect(element) {
  const rect = element.getBoundingClientRect();
  const burstCount = 12;

  for (let i = 0; i < burstCount; i++) {
    const spark = document.createElement('div');
    spark.className = 'burst-spark';
    spark.textContent = ['🌟', '💖', '✨', '🎉'][Math.floor(Math.random() * 4)];
    spark.style.position = 'fixed';
    spark.style.left = (rect.left + rect.width / 2) + 'px';
    spark.style.top = (rect.top + rect.height / 2) + 'px';
    spark.style.pointerEvents = 'none';
    spark.style.fontSize = '1.2rem';
    spark.style.zIndex = '999';
    
    const angle = (Math.PI * 2 / burstCount) * i;
    const distance = Math.random() * 60 + 30;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance;

    spark.style.transition = 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
    document.body.appendChild(spark);

    requestAnimationFrame(() => {
      spark.style.transform = `translate(${destX}px, ${destY}px) scale(0)`;
      spark.style.opacity = '0';
    });

    setTimeout(() => spark.remove(), 600);
  }
}

/* 4. 💖 為祤歆加油打氣集章點讚按鈕 */
function initCheerButton() {
  const btn = document.getElementById('cheer-btn');
  const countSpan = document.getElementById('cheer-count');
  if (!btn || !countSpan) return;

  let count = 520; // 預設可愛起始值

  btn.addEventListener('click', (e) => {
    count++;
    countSpan.textContent = count;
    
    // 按鈕彈跳與粒子
    btn.style.transform = 'scale(1.2) rotate(5deg)';
    setTimeout(() => btn.style.transform = '', 200);

    createBurstEffect(btn);
  });
}

/* 5. 🌙 主題切換 (Light Kawaii / Dark Starry Dream) */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  toggleBtn.textContent = currentTheme === 'dark' ? '🌙' : '☀️';

  toggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    toggleBtn.textContent = newTheme === 'dark' ? '🌙' : '☀️';
  });
}

/* 6. 📜 滾動動畫觸發與導覽 Highlight */
function initScrollAnimations() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
}
