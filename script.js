const arena = document.getElementById("arena");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const msg = document.getElementById("msg");

let escapes = 0;
let scale = 1;

centerYes();

function centerYes() {
  const rect = arena.getBoundingClientRect();
  yesBtn.style.left = `${rect.width / 2}px`;
  yesBtn.style.top = `${rect.height / 2}px`;
  yesBtn.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function moveYesAway() {
  const rect = arena.getBoundingClientRect();

  const btnRect = yesBtn.getBoundingClientRect();
  const btnW = btnRect.width;
  const btnH = btnRect.height;

  const pad = 10;

  const maxX = rect.width - btnW / 2 - pad;
  const minX = btnW / 2 + pad;
  const maxY = rect.height - btnH / 2 - pad;
  const minY = btnH / 2 + pad;

  const newX = Math.random() * (maxX - minX) + minX;
  const newY = Math.random() * (maxY - minY) + minY;

  escapes += 1;
  scale = clamp(1 + escapes * 0.12, 1, 2.2);

  yesBtn.style.left = `${newX}px`;
  yesBtn.style.top = `${newY}px`;
  yesBtn.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

yesBtn.addEventListener("pointerenter", () => {
  moveYesAway();
  msg.textContent = "¡Uy! Casi… 😅";
});

yesBtn.addEventListener("click", () => {
  msg.textContent = "¡SÍÍÍ! 💖💖💖 ¡Sabía que dirías que sí!";
  yesBtn.style.position = "static";
  yesBtn.style.transform = "none";
  yesBtn.disabled = true;
  noBtn.disabled = true;
});

noBtn.addEventListener("click", () => {
  msg.textContent = "¿Seguro? 🥺 Vuelve a intentarlo…";
  noBtn.textContent = "Mejor sí 😳";
});

window.addEventListener("resize", () => {
  const rect = arena.getBoundingClientRect();
  yesBtn.style.left = `${rect.width / 2}px`;
  yesBtn.style.top = `${rect.height / 2}px`;
  yesBtn.style.transform = `translate(-50%, -50%) scale(${scale})`;
});
