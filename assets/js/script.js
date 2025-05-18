/* ───────────────────────────────
🌌 星空動畫背景
─────────────────────────────── */
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ⭐ 星點生成
const stars = Array.from({ length: 150 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5 + 0.5,
  dx: (Math.random() - 0.5) * 0.1,
  dy: (Math.random() - 0.5) * 0.1,
}));

// 🌠 流星陣列
let meteors = [];

function spawnMeteor() {
  meteors.push({
    x: Math.random() * canvas.width,
    y: -50,
    length: Math.random() * 80 + 50,
    speed: Math.random() * 4 + 4,
    angle: Math.PI / 4, // 45 度角
    alpha: 1.0,
  });
}

// 每 2～4 秒隨機產生一顆流星
setInterval(spawnMeteor, Math.random() * 2000 + 2000);

// 🎨 畫星星與流星
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 星星繪製
  ctx.fillStyle = '#fff';
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
    ctx.fill();
    s.x += s.dx;
    s.y += s.dy;
    if (s.x < 0 || s.x > canvas.width) s.dx *= -1;
    if (s.y < 0 || s.y > canvas.height) s.dy *= -1;
  });

  // 流星繪製
  meteors.forEach((m, i) => {
    const xEnd = m.x + m.length * Math.cos(m.angle);
    const yEnd = m.y + m.length * Math.sin(m.angle);

    ctx.strokeStyle = `rgba(255,255,255,${m.alpha})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(xEnd, yEnd);
    ctx.stroke();

    m.x += m.speed * Math.cos(m.angle);
    m.y += m.speed * Math.sin(m.angle);
    m.alpha -= 0.01;

    if (m.alpha <= 0) meteors.splice(i, 1);
  });

  requestAnimationFrame(draw);
}

draw();
/* ───────────────────────────────
⏱️ Flipdown 倒數計時器
─────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  const endTime = new Date("2025-07-04T23:59:59").getTime() / 1000;
  new FlipDown(endTime, 'flipdown', {
    headings: ["天", "時", "分", "秒"]
  }).start();
});
/* ───────────────────────────────
🎓 講師資料與 Modal 控制
─────────────────────────────── */
const mentorData = [
  {
    name: "chao28661",
    img: "assets/images/chao.png",
    detail: `講師資訊`,
    link: ""
  },
  {
    name: "毛哥EM",
    img: "assets/images/EM.webp",
    detail: `交大網路安群策進會 竹狐戰隊成員<br>
            Awwwards 常態評審<br>
            2024 iThome 鐵人賽 DevOps 組佳作<br>
            中電會 第三屆資訊組組長`,
    link: "https://elvismao.com/"
  }
];

function openModal(index) {
  const data = mentorData[index];
  document.getElementById("modal-name").innerHTML = data.name;
  document.getElementById("modal-detail").innerHTML = data.detail;
  document.getElementById("modal-img").src = data.img;

  const linkHTML = data.link
    ? `<a href="${data.link}" target="_blank">🌐 前往個人網站</a>`
    : "";
  document.getElementById("modal-link").innerHTML = linkHTML;

  document.getElementById("mentor-modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("mentor-modal").style.display = "none";
}
/* ───────────────────────────────
📅 活動流程 Tab 切換邏輯
─────────────────────────────── */
document.querySelectorAll('.neon-schedule .tab').forEach(tab => {
  tab.addEventListener('click', e => {
    // 切換 active 樣式
    document.querySelectorAll('.neon-schedule .tab')
      .forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // 顯示對應日程內容
    const day = tab.dataset.day;
    document.querySelectorAll('.timeline-wrapper')
      .forEach(w => w.classList.toggle('show', w.id === day));
  });
});
