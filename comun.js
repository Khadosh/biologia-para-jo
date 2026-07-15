"use strict";
/* ===========================================================
   Utilidades compartidas de La Carpeta de Biología
   =========================================================== */
window.RM = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (id) => document.getElementById(id);

const COL = {
  tinta:"#1C5D4C", rojo:"#D9331C", verde:"#1E8A5A", violeta:"#7A3E9D",
  azul:"#3A6EA5", naranja:"#E4572E", amarillo:"#FFE24A", gris:"#8A968F"
};
/* alias en mayúsculas, accesibles desde los scripts de cada página */
const TINTA=COL.tinta, ROJO=COL.rojo, VERDE=COL.verde, VIOLETA=COL.violeta,
      AZUL=COL.azul, NARANJA=COL.naranja, AMARILLO=COL.amarillo, GRIS=COL.gris;

function setupCanvas(cv){
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = cv.width, H = cv.height;
  cv.width = W * dpr; cv.height = H * dpr;
  cv.style.aspectRatio = W + " / " + H;
  const ctx = cv.getContext("2d");
  ctx.scale(dpr, dpr);
  return { ctx, W, H };
}
function etiqueta(ctx, texto, x, y, color, tam, peso){
  ctx.font = (peso||700) + " " + (tam||14) + "px Nunito, sans-serif";
  ctx.fillStyle = color || COL.tinta;
  ctx.fillText(texto, x, y);
}
function flecha(ctx, x1, y1, x2, y2, color, ancho){
  ancho = ancho || 3;
  const a = Math.atan2(y2 - y1, x2 - x1);
  ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = ancho; ctx.lineCap = "round";
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - 10*Math.cos(a-0.45), y2 - 10*Math.sin(a-0.45));
  ctx.lineTo(x2 - 10*Math.cos(a+0.45), y2 - 10*Math.sin(a+0.45));
  ctx.closePath(); ctx.fill();
  ctx.lineCap = "butt";
}
function posPuntero(cv, e, W, H){
  const r = cv.getBoundingClientRect();
  const t = e.touches ? e.touches[0] : e;
  return { x: (t.clientX - r.left) * (W / r.width), y: (t.clientY - r.top) * (H / r.height) };
}

/* Quiz genérico: botones .opcion con data-q y data-ok="0" en la correcta.
   Las explicaciones se leen de window.EXPLICA = { "1": "...", ... } */
function activarQuiz(){
  const ex = window.EXPLICA || {};
  document.querySelectorAll(".opcion").forEach(function(btn){
    btn.addEventListener("click", function(){
      const q = btn.dataset.q;
      const ok = btn.dataset.ok === "0";
      document.querySelectorAll('.opcion[data-q="'+q+'"]').forEach(function(b){ b.classList.remove("bien","mal"); });
      btn.classList.add(ok ? "bien" : "mal");
      const f = $("f"+q);
      if(f){ f.classList.add("visible");
        f.innerHTML = (ok ? "<b style='color:#1E8A5A'>✓ Exacto.</b> " : "<b style='color:#D9331C'>✗ Casi.</b> ") + (ex[q]||""); }
    });
  });
}
document.addEventListener("DOMContentLoaded", activarQuiz);
