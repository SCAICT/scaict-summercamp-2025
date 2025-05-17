const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = Array.from({ length: 150 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5 + 0.5,
  dx: (Math.random() - 0.5) * 0.1,
  dy: (Math.random() - 0.5) * 0.1,
}));

let meteors = [];

function spawnMeteor() {
  meteors.push({
    x: Math.random() * canvas.width,
    y: -50,
    length: Math.random() * 80 + 50,
    speed: Math.random() * 4 + 4,
    angle: Math.PI / 4,
    alpha: 1.0,
  });
}

setInterval(spawnMeteor, Math.random() * 2000 + 2000);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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

document.addEventListener("DOMContentLoaded", () => {
  const endTime = new Date("2025-07-04T23:59:59").getTime() / 1000;
  new FlipDown(endTime, 'flipdown', {
    headings: ["天", "時", "分", "秒"]
  }).start();
});

const mentorData = [
  {
    name: "chao28661",
    detail: `講師資訊`
  },
  {
    name: "毛哥EM",
    detail: `講師資訊`
  }
];

function openModal(index) {
  document.getElementById("modal-name").innerHTML = mentorData[index].name;
  document.getElementById("modal-detail").innerHTML = mentorData[index].detail;
  document.getElementById("mentor-modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("mentor-modal").style.display = "none";
}
