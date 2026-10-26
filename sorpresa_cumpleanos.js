/* ====== Personaliza aquí ====== */
const CONFIG = {
  nombre: "Mili",
  recuerdo: "[ESCRIBE AQUÍ UN RECUERDO BONITO QUE COMPARTAN]",
};
const RECUERDO_GENERAL = "Gracias por los momentos compartidos, los grandes y los pequeños.";
const CARTA = [
  "Feliz cumpleaños, Mili. Quería decirte que valoro mucho todo lo que has hecho por mí. Has estado a mi lado con paciencia y con esa forma tan tuya de cuidar a los demás. Para mí eres más que una prima: eres como una segunda mamá, y siempre he podido confiar en ti.",
  "Gracias por escucharme, aconsejarme y aceptarme tal como soy. Me siento agradecido de tenerte en mi vida. Ojalá este nuevo año te devuelva un poco de todo lo que das a quienes te rodean.",
  "Te deseo un cumpleaños tranquilo, con buena compañía y buenos momentos. ¡Feliz cumpleaños!"
];
const NUM_VELAS = 5;
/* ============================== */

const $ = (id) => document.getElementById(id);
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const NS = "http://www.w3.org/2000/svg";

// Nombre y recuerdo
document.querySelectorAll("[data-nombre]").forEach((el) => { el.textContent = CONFIG.nombre; });
const recuerdoListo = CONFIG.recuerdo && !/^\[.*\]$/.test(CONFIG.recuerdo.trim());
$("recuerdoTexto").textContent = recuerdoListo ? CONFIG.recuerdo : RECUERDO_GENERAL;

// Carta con palabras que aparecen poco a poco
(function construirCarta() {
  const cont = $("cartaTexto");
  let i = 0;
  CARTA.forEach((parrafo) => {
    const p = document.createElement("p");
    parrafo.split(" ").forEach((palabra, k, arr) => {
      const s = document.createElement("span");
      s.className = "w";
      s.style.setProperty("--i", i++);
      s.textContent = palabra;
      p.appendChild(s);
      if (k < arr.length - 1) p.appendChild(document.createTextNode(" "));
    });
    cont.appendChild(p);
  });
  const fin = document.createElementNS(NS, "svg");
  fin.setAttribute("class", "corazon-fin i");
  fin.setAttribute("aria-hidden", "true");
  fin.innerHTML = '<use href="#flor"/>';
  cont.appendChild(fin);
})();

const carta = $("cartaTexto");
let cartaLista = false;
function reproducirCarta() {
  cartaLista = true;
  carta.classList.remove("play");
  void carta.offsetWidth;
  carta.classList.add("play");
}
if ("IntersectionObserver" in window) {
  new IntersectionObserver((entradas) => {
    if (!cartaLista && entradas.some((e) => e.isIntersecting)) reproducirCarta();
  }, { threshold: 0.15 }).observe(carta);
}

// Confeti
const cv = $("confeti"), ctx = cv.getContext("2d");
const COLORES = ["#EBA3B8", "#F7BC9C", "#D3A04A", "#E57399", "#F4A6A0", "#FFD08A", "#C2577A"];
let piezas = [], raf = 0;
function ajustar() {
  const r = window.devicePixelRatio || 1;
  cv.width = innerWidth * r; cv.height = innerHeight * r;
  ctx.setTransform(r, 0, 0, r, 0, 0);
}
addEventListener("resize", ajustar); ajustar();
function confeti(n = 150) {
  const total = reduce ? Math.min(n, 36) : n;
  for (let i = 0; i < total; i++) {
    piezas.push({
      x: Math.random() * innerWidth, y: -20 - Math.random() * innerHeight * 0.5,
      vx: (Math.random() - 0.5) * 2.4, vy: 2 + Math.random() * 3.4,
      w: 6 + Math.random() * 6, h: 8 + Math.random() * 8, a: Math.random() * 6.28, va: (Math.random() - 0.5) * 0.25,
      c: COLORES[(Math.random() * COLORES.length) | 0], redondo: Math.random() < 0.3, t: Math.random() * 6.28,
    });
  }
  if (!raf) raf = requestAnimationFrame(paso);
}
function paso() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  piezas = piezas.filter((p) => p.y < innerHeight + 30);
  for (const p of piezas) {
    p.t += 0.04; p.x += p.vx + Math.sin(p.t) * 0.7; p.y += p.vy; p.a += p.va;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.c;
    if (p.redondo) { ctx.beginPath(); ctx.arc(0, 0, p.w / 2, 0, 6.28); ctx.fill(); }
    else ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
  }
  raf = piezas.length ? requestAnimationFrame(paso) : 0;
  if (!raf) ctx.clearRect(0, 0, innerWidth, innerHeight);
}

// Bienvenida
const contenido = $("contenido");
const desplazar = (el) => el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
$("abrir").addEventListener("click", () => {
  const primera = contenido.hidden;
  if (primera) { contenido.hidden = false; contenido.classList.add("abierto"); $("abrir").textContent = "Ver tu sorpresa otra vez"; }
  cartaLista = false; carta.classList.remove("play");
  confeti();
  setTimeout(() => {
    desplazar($("carta"));
    setTimeout(() => { if (!cartaLista) reproducirCarta(); }, 1400);
  }, primera ? 500 : 250);
});

// Abrazo
const btnAbrazo = $("btnAbrazo"), panelAbrazo = $("panelAbrazo");
btnAbrazo.addEventListener("click", () => {
  const abrir = panelAbrazo.hidden;
  panelAbrazo.hidden = !abrir;
  btnAbrazo.setAttribute("aria-expanded", String(abrir));
  if (abrir) {
    if (!reduce) for (let i = 0; i < 8; i++) {
      const h = document.createElementNS(NS, "svg");
      h.setAttribute("class", "mini i");
      h.setAttribute("aria-hidden", "true");
      h.innerHTML = '<use href="#corazon"/>';
      h.style.left = 6 + Math.random() * 88 + "%";
      h.style.width = h.style.height = 14 + Math.random() * 20 + "px";
      h.style.animationDelay = Math.random() * 0.9 + "s";
      panelAbrazo.appendChild(h);
      setTimeout(() => h.remove(), 3800);
    }
    panelAbrazo.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
  }
});

// Deseo y velas
const btnDeseo = $("btnDeseo"), panelDeseo = $("panelDeseo"), velas = $("velas");
let encendidas = 0;
function encenderVelas() {
  velas.innerHTML = ""; encendidas = NUM_VELAS;
  $("deseoFinal").innerHTML = ""; $("encender").hidden = true; $("consigna").hidden = false;
  for (let i = 1; i <= NUM_VELAS; i++) {
    const v = document.createElement("button");
    v.type = "button"; v.className = "vela";
    v.setAttribute("aria-label", "Apagar la vela " + i + " de " + NUM_VELAS);
    v.innerHTML = '<span class="llama"></span><span class="humo"></span>';
    v.style.height = 48 + ((i * 7) % 4) * 4 + "px";
    v.addEventListener("click", () => apagar(v));
    velas.appendChild(v);
  }
}
function apagar(v) {
  if (v.classList.contains("apagada")) return;
  v.classList.add("apagada");
  v.setAttribute("aria-label", "Vela apagada");
  encendidas--;
  if (encendidas === 0) {
    $("consigna").hidden = true;
    const m = document.createElement("p");
    m.className = "mensaje";
    m.textContent = "Que este nuevo año te traiga todo lo bonito que mereces.";
    $("deseoFinal").appendChild(m);
    $("encender").hidden = false;
    confeti(110);
  }
}
btnDeseo.addEventListener("click", () => {
  const abrir = panelDeseo.hidden;
  panelDeseo.hidden = !abrir;
  btnDeseo.setAttribute("aria-expanded", String(abrir));
  if (abrir) {
    if (!velas.children.length || encendidas === 0) encenderVelas();
    panelDeseo.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
  }
});
$("encender").addEventListener("click", encenderVelas);

// Cierre
$("btnConfeti").addEventListener("click", () => confeti(170));
$("btnInicio").addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }));
