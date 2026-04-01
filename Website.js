// --- 1. Matrix Background ---
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
const letters = "MA0101HAPPYBIRTHDAY❤️";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ff3385"; ctx.font = fontSize + "px monospace";
    drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    });
}
setInterval(drawMatrix, 50);

// --- 2. Sequence Control ---
const countdownEl = document.getElementById('countdown');
const surpriseSection = document.getElementById('surprise-section');
const typingEl = document.getElementById('typing-text');
const envelopeWrapper = document.getElementById('envelopeWrapper');
const cardInside = document.getElementById('cardInside');
const heartStage = document.getElementById('heart-collage-stage');

let count = 3;
const timer = setInterval(() => {
    count--;
    if (count > 0) { countdownEl.textContent = count; }
    else {
        clearInterval(timer);
        countdownEl.classList.add('hidden');
        surpriseSection.classList.remove('hidden');
        startTyping("HAPPY BIRTHDAY TO ❤️ KUU ❤️", () => {
            envelopeWrapper.classList.remove('hidden');
        });
    }
}, 1000);

function startTyping(text, callback) {
    let i = 0;
    function type() {
        if (i < text.length) { typingEl.innerHTML += text.charAt(i); i++; setTimeout(type, 120); }
        else { setTimeout(callback, 500); }
    }
    type();
}

// Tap to Open Logic
function openEnvelope() {
    envelopeWrapper.classList.add('launching');
    setTimeout(() => {
        envelopeWrapper.style.display = 'none';
        cardInside.classList.remove('hidden');
        setTimeout(() => {
            cardInside.classList.add('open');
            new Swiper(".mySwiper", { 
                loop: true, 
                pagination: { el: ".swiper-pagination", clickable: true } 
            });
        }, 100);
    }, 800);
}

// --- Slide တစ်ခုချင်းစီအတွက် ပြောင်းလဲချင်သော စာသားများ ---
const slideTexts = [
    "HAPPY BIRTHDAY KUU ❤️",
    "YOU ARE SO BEAUTIFUL ✨",
    "HAVE A AMAZING DAY 🎂",
    "ALWAYS BE HAPPY 😊",
    "MY SPECIAL SOMEONE 💖"
];

const bdayTextElement = document.querySelector('.happy-bday-text');

// Swiper Initialization ကို ဒီအတိုင်း ပြင်ပါ
const swiper = new Swiper(".mySwiper", { 
    loop: true, 
    pagination: { el: ".swiper-pagination", clickable: true },
    on: {
        slideChange: function () {
            // လက်ရှိ ရောက်နေတဲ့ slide index ကို ယူတယ်
            // loop: true သုံးထားရင် realIndex ကို သုံးရပါမယ်
            let currentIndex = this.realIndex;
            
            // စာသားကို array ထဲက တန်ဖိုးအတိုင်း ပြောင်းလဲပေးတယ်
            if (slideTexts[currentIndex]) {
                bdayTextElement.textContent = slideTexts[currentIndex];
            }
        },
    }
});

// Final Explosion to Hollow Heart
function triggerExplosion() {
    cardInside.style.display = 'none';
    heartStage.classList.remove('hidden');
    
    const container = document.getElementById('photo-heart-container');
    // Hollow Heart Points (ဗဟိုလွတ် အသည်းပုံစံ)
    const points = [
        {x: 175, y: 50}, {x: 120, y: 30}, {x: 230, y: 30}, {x: 70, y: 60}, {x: 280, y: 60},
        {x: 40, y: 110}, {x: 310, y: 110}, {x: 30, y: 170}, {x: 320, y: 170}, {x: 50, y: 230},
        {x: 300, y: 230}, {x: 90, y: 290}, {x: 260, y: 290}, {x: 130, y: 340}, {x: 220, y: 340},
        {x: 175, y: 370}
    ];

    points.forEach((pt, i) => {
        const img = document.createElement('img');
        img.src = `Ma_${(i % 5) + 1}.jpg`; 
        img.className = 'mini-photo';
        img.style.left = pt.x - 35 + 'px';
        img.style.top = pt.y - 35 + 'px';
        container.appendChild(img);

        setTimeout(() => {
            img.style.opacity = '1';
            img.style.transform = 'scale(1) rotate(' + (Math.random() * 20 - 10) + 'deg)';
        }, i * 100);
    });
}