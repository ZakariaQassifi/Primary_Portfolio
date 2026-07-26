/* --- CV MODAL CONTROL --- */
function openCVModal() {
  document.getElementById('cvModal').classList.add('active');
}

function closeCVModal() {
  document.getElementById('cvModal').classList.remove('active');
}

const cvModal = document.getElementById('cvModal');
if (cvModal) {
  cvModal.addEventListener('click', (e) => {
    if (e.target === cvModal) {
      closeCVModal();
    }
  });
}

/* --- ZEXTER AI CHAT FUNCTIONALITY --- */
const zexterResponses = {
  'hello': 'Hey there! 👋 I\'m Zexter, Zakaria\'s  assistant. How can I help you today?',
  'hi': 'Hi! Welcome to the chat. What would you like to know about Zakaria?',
  'email': 'You can reach Zakaria at zakariaqassifi10@gmail.com 📧',
  'contact': 'Here are the ways to contact Zakaria:\n📧 Email: zakariaqassifi10@gmail.com\n📞 Phone: +212 633-008210\n🐙 GitHub: ZakariaQassifi\n💼 LinkedIn: Zakaria Qassifi',
  'phone': 'Zakaria\'s phone number is +212 633-008210 📞',
  'github': 'You can find Zakaria on GitHub at github.com/ZakariaQassifi 🐙',
  'linkedin': 'Connect with Zakaria on LinkedIn: linkedin.com/in/zakaria-qassifi-87874b286/ 💼',
  'help': 'I can help you with:\n→ General questions\n→ Contact information\n→ Connecting with Zakaria\n\nTry asking about: email, phone, github, linkedin, contact, or anything else!',
  'thanks': 'You\'re welcome! Is there anything else I can help you with? 😊',
  'thank you': 'Happy to help! Let me know if you need anything else! 🙌',
  'default': 'Thanks for reaching out! I\'ll make sure Zakaria gets your message. You can also reach him directly at zakariaqassifi10@gmail.com or call +212 633-008210.'
};

function handleZexterMessage(event) {
  event.preventDefault();
  
  const input = document.getElementById('zexter-input');
  const userMessage = input.value.trim();
  
  if (!userMessage) return;
  
  // Display user message
  addChatMessage(userMessage, 'user');
  
  // Clear input
  input.value = '';
  input.focus();
  
  // Simulate Zexter typing and respond
  setTimeout(() => {
    const response = generateZexterResponse(userMessage);
    addChatMessage(response, 'zexter');
  }, 500);
}

function generateZexterResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  
  // Check for keywords in the message
  for (const [key, response] of Object.entries(zexterResponses)) {
    if (lowerMessage.includes(key)) {
      return response;
    }
  }
  
  // Default response
  return zexterResponses.default;
}

function addChatMessage(message, sender) {
  const chatContainer = document.getElementById('zexter-chat');
  const messageEl = document.createElement('div');
  messageEl.className = `chat-message ${sender}-message`;
  
  const prefix = sender === 'user' ? 'you@guest' : 'zexter@ai';
  const prefixClass = sender === 'user' ? 'term-user' : 'msg-prefix';
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  messageEl.innerHTML = `
    <span class="${prefixClass}">${prefix}</span>:<span class="msg-time">[${timestamp}]</span>
    <div class="msg-content">${message.replace(/\n/g, '<br>')}</div>
  `;
  
  chatContainer.appendChild(messageEl);
  
  // Scroll to bottom
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

/* --- LIGHT / DARK MODE SWITCHER --- */
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('checkbox');

  // Check saved theme in localStorage or system preferences
  const savedTheme = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  const isLight = savedTheme === 'light' || (!savedTheme && prefersLight);
  
  if (isLight) {
    document.body.classList.add('light-mode');
    if (themeToggle) themeToggle.checked = true;
  } else {
    if (themeToggle) themeToggle.checked = false;
  }

  // Toggle switch listener
  if (themeToggle) {
    themeToggle.addEventListener('change', () => {
      document.body.classList.toggle('light-mode');
      const isLight = document.body.classList.contains('light-mode');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }
});

/* --- ENHANCED PARTICLE CANVAS BACKGROUND WITH GALAXY EFFECT --- */
const canvas = document.getElementById('particle-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let stars = [];
  let verses = [];
  const numParticles = 60;
  const numStars = 200;
  const numVerses = 5;
  const charArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/%=<>!@#&_[]{}()|?;:πΩΣΔΦΨ".split("");

  const verseList = [
    "Everything's gon be fin, i been praying all night to god",
    "Break the matrix ou lqa life hack",
    "la masdaq walou i will go again",
    "i'm not perfect but i'm right",
    "3endi mission, ma gha ne7bass til i get it done",
    "People change, in every way",
    "Nothing matter, my fate's calling",
    "manqadsh nkoun nobody else",
    "Just know it won't be over",
    "kyn zwin kyn lkhayb bjoujhum fin o 3arfinhum, lisr limn khtar binhum"
  ];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Star class for galaxy background
  class Star {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * 1.5;
      this.opacity = Math.random() * 0.5 + 0.3;
      this.twinkleSpeed = Math.random() * 0.02 + 0.01;
      this.twinkleDirection = Math.random() > 0.5 ? 1 : -1;
      this.color = ['#ffffff', '#00f28b', '#38bdf8', '#e0af68'][Math.floor(Math.random() * 4)];
    }

    update() {
      this.opacity += this.twinkleSpeed * this.twinkleDirection;
      if (this.opacity >= 1) {
        this.opacity = 1;
        this.twinkleDirection = -1;
      }
      if (this.opacity <= 0.1) {
        this.opacity = 0.1;
        this.twinkleDirection = 1;
      }
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // Verse class for floating text
  class Verse {
    constructor() {
      this.text = verseList[Math.floor(Math.random() * verseList.length)];
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = 0.3;
      this.fadeDirection = Math.random() > 0.5 ? 1 : -1;
      this.fontSize = Math.random() * 10 + 8;
      this.colors = ['#00f28b', '#38bdf8', '#e0af68'];
      this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Wrap around screen
      if (this.x > canvas.width + 100) this.x = -100;
      if (this.x < -100) this.x = canvas.width + 100;
      if (this.y > canvas.height + 50) this.y = -50;
      if (this.y < -50) this.y = canvas.height + 50;

      // Fade in and out
      this.opacity += 0.005 * this.fadeDirection;
      if (this.opacity >= 0.5) this.fadeDirection = -1;
      if (this.opacity <= 0.15) this.fadeDirection = 1;
    }

    wrapText(text, maxWidth) {
      const words = text.split(' ');
      const lines = [];
      let currentLine = '';

      for (let word of words) {
        const testLine = currentLine ? currentLine + ' ' + word : word;
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      
      if (currentLine) lines.push(currentLine);
      return lines;
    }

    draw() {
      ctx.font = `${this.fontSize}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.opacity;

      // Wrap text and draw multiple lines
      const lines = this.wrapText(this.text, 350);
      lines.forEach((line, index) => {
        ctx.fillText(line, this.x, this.y + (index * this.fontSize * 1.4));
      });

      ctx.globalAlpha = 1;
    }
  }

  // Enhanced particle with trajectory trail
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.fontSize = Math.random() * 14 + 6;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.speedY = (Math.random() - 0.5) * 0.8;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.char = charArray[Math.floor(Math.random() * charArray.length)];
      this.charChangeCounter = 0;
      this.charChangeInterval = Math.floor(Math.random() * 20 + 10);
      this.trail = [];
      this.trailLength = 12;
      this.glowIntensity = Math.random() * 0.5 + 0.5;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Wrap around screen boundaries
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;

      // Add to trail
      this.trail.push({ x: this.x, y: this.y });
      if (this.trail.length > this.trailLength) {
        this.trail.shift();
      }

      this.charChangeCounter++;
      if (this.charChangeCounter >= this.charChangeInterval) {
        this.char = charArray[Math.floor(Math.random() * charArray.length)];
        this.charChangeCounter = 0;
      }
    }

    draw() {
      // Draw trail/shadow effect
      for (let i = 0; i < this.trail.length; i++) {
        const trailOpacity = (i / this.trail.length) * this.opacity * 0.4;
        ctx.fillStyle = `rgba(0, 242, 139, ${trailOpacity})`;
        ctx.font = `${this.fontSize * (i / this.trail.length)}px 'JetBrains Mono', monospace`;
        ctx.fillText(this.char, this.trail[i].x, this.trail[i].y);
      }

      // Draw main particle with glow
      ctx.shadowColor = `rgba(0, 242, 139, ${this.glowIntensity})`;
      ctx.shadowBlur = 10 + this.glowIntensity * 5;
      ctx.fillStyle = `rgba(0, 242, 139, ${this.opacity})`;
      ctx.font = `${this.fontSize}px 'JetBrains Mono', monospace`;
      ctx.fillText(this.char, this.x, this.y);
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push(new Star());
    }
  }

  function initVerses() {
    verses = [];
    for (let i = 0; i < numVerses; i++) {
      verses.push(new Verse());
    }
  }

  function animateParticles() {
    // Dynamic galaxy background
    const isLightMode = document.body.classList.contains('light-mode');
    
    // Create gradient background for galaxy effect
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    if (isLightMode) {
      gradient.addColorStop(0, 'rgba(248, 250, 252, 0.15)');
      gradient.addColorStop(0.5, 'rgba(226, 232, 240, 0.1)');
      gradient.addColorStop(1, 'rgba(248, 250, 252, 0.15)');
      ctx.fillStyle = gradient;
    } else {
      gradient.addColorStop(0, 'rgba(1, 10, 27, 0.25)');
      gradient.addColorStop(0.5, 'rgba(13, 16, 23, 0.2)');
      gradient.addColorStop(1, 'rgba(1, 10, 27, 0.25)');
      ctx.fillStyle = gradient;
    }
    
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw stars
    stars.forEach((star) => {
      star.update();
      star.draw();
    });

    // Update and draw verses
    verses.forEach((verse) => {
      verse.update();
      verse.draw();
    });

    // Update and draw particles
    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animateParticles);
  }

  initParticles();
  initStars();
  initVerses();
  animateParticles();
}

/* --- SCROLL ANIMATION INTERSECTION OBSERVER --- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* --- MOBILE OPTIMIZATION --- */
document.addEventListener('DOMContentLoaded', () => {
  // Prevent zoom on input focus for mobile
  const inputs = document.querySelectorAll('input, textarea, button, a');
  inputs.forEach(input => {
    if (input.type !== 'text' && input.type !== 'email' && input.type !== 'textarea') return;
    input.style.fontSize = '16px';
  });

  // Add touch feedback for buttons
  const buttons = document.querySelectorAll('button, .btn-nav-outline, .btn-nav-accent, .btn-hero-primary, .btn-hero-secondary');
  buttons.forEach(btn => {
    btn.addEventListener('touchstart', function() {
      this.style.opacity = '0.8';
    });
    btn.addEventListener('touchend', function() {
      this.style.opacity = '1';
    });
  });

  // Smooth scroll for mobile
  if (navigator.userAgent.match(/mobile/i)) {
    document.documentElement.style.scrollBehavior = 'smooth';
  }
});
