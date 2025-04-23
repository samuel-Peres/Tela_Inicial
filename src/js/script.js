const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

let fontSize = 14;
let drops = [];
let letters = "{}[]()<>=!&|^~*+-/%$#@?.:;";

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const columns = Math.floor(canvas.width / fontSize);
  drops = Array.from({ length: columns }).fill(1);
}

function getRandomChar() {
  return letters[Math.floor(Math.random() * letters.length)];
}

function drawMatrix() {
  // Fundo com transparência para efeito de rastro
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = fontSize + "px monospace";

  drops.forEach((y, i) => {
    const char = getRandomChar();
    const x = i * fontSize;
    
    // Cor com brilho e variação
    ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
    ctx.fillText(char, x, y * fontSize);

    if (y * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  });
}

// FPS controlado (opcional)
let lastTime = 0;
const frameInterval = 1000 / 30;

function animate(time) {
  if (time - lastTime > frameInterval) {
    drawMatrix();
    lastTime = time;
  }
  requestAnimationFrame(animate);
}

// Inicializa tudo
resizeCanvas();
animate();

// Redimensiona responsivamente
window.addEventListener("resize", resizeCanvas);
