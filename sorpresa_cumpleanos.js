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
