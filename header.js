<!-- NAVBAR CSS -->
<style>
/* ── HEADER ── */
.topbar{
  position:fixed;top:0;left:0;right:0;z-index:300;
  display:flex;align-items:center;justify-content:space-between;
  padding:0 2.5rem;height:80px;
  background:linear-gradient(180deg,rgba(0,0,0,.55) 0%,rgba(0,0,0,.0) 100%);
  transition:background .35s,height .35s,box-shadow .35s;
}
.topbar.solid{background:#fff;height:70px;box-shadow:0 2px 20px rgba(0,0,0,.06)}
.logo{text-decoration:none;display:flex;align-items:center;line-height:0}
.logo-img{height:56px;width:auto;display:block;
  mix-blend-mode:screen;
  transition:filter .35s,mix-blend-mode .35s}
.topbar.solid .logo-img{mix-blend-mode:multiply;filter:none}
.menu{display:flex;align-items:center;gap:2.2rem;list-style:none}
.menu a{font-family:'Jost',sans-serif;font-size:.95rem;font-weight:400;letter-spacing:.02em;
  color:#fff;text-decoration:none;transition:color .25s;position:relative;padding-bottom:3px}
.topbar.solid .menu a{color:var(--black)}
.menu a::after{content:'';position:absolute;left:0;bottom:0;width:0;height:1.5px;
  background:currentColor;transition:width .3s}
.menu a:hover::after{width:100%}
.menu .termin{
  background:#fff;color:var(--black) !important;
  padding:.6rem 1.4rem;border-radius:2px;font-weight:500;
  transition:background .25s,color .25s}
.menu .termin::after{display:none}
.topbar.solid .menu .termin{background:var(--black);color:#fff !important}
.menu .termin:hover{background:var(--accent);color:#fff !important}
.burger{display:none;flex-direction:column;gap:6px;background:none;border:none;cursor:pointer}
.burger span{width:26px;height:2px;background:#fff;display:block;transition:background .35s}
.topbar.solid .burger span{background:var(--black)}
.mobile{position:fixed;inset:0;z-index:290;background:#fff;display:none;
  flex-direction:column;justify-content:center;padding:3rem;gap:.4rem}
.mobile.open{display:flex}
.mobile a{font-family:'Jost';font-size:1.6rem;color:var(--black);text-decoration:none;
  padding:.7rem 0;border-bottom:1px solid var(--line)}
.mobile .close{position:absolute;top:1.8rem;right:2.5rem;font-size:2rem;background:none;border:none;cursor:pointer}
/* LANG TOGGLE */
.lang-toggle{display:flex;align-items:center;gap:4px}
.lang-li{list-style:none;display:flex;align-items:center;margin-left:.5rem}
.lang-btn{padding:.35rem .65rem;font-family:'Jost',sans-serif;font-size:.78rem;font-weight:600;
  letter-spacing:.08em;cursor:pointer;border:1.5px solid rgba(255,255,255,.5);
  border-radius:2px;background:rgba(255,255,255,.15);color:rgba(255,255,255,.9);
  transition:all .2s;line-height:1}
.lang-btn.active{background:#fff;color:#1a1a1a;border-color:#fff}
.topbar.solid .lang-btn{border-color:#d0d0d0;background:#fff;color:#666}
.topbar.solid .lang-btn.active{background:#1a1a1a;color:#fff;border-color:#1a1a1a}
@media(max-width:920px){
  .topbar{padding:0 1.3rem}
  .menu{display:none}
  .burger{display:flex}
}
</style>

<!-- NAVBAR HTML -->
<nav class="topbar" id="topbar">
  <a href="/" class="logo">
    <img src="/images/assets/logo.png" alt="Sabrina Fiechter" class="logo-img">
  </a>
  <ul class="menu">
    <li><a href="/shooting/">Shooting</a></li>
    <li><a href="/bewerbungsfotos/">Bewerbungsfotos</a></li>
    <li><a href="/portfolio/">Portfolio</a></li>
    <li><a href="/ueber-mich/">Über mich</a></li>
    <li><a href="/kontakt/">Kontakt</a></li>
    <li class="lang-li">
      <div class="lang-toggle">
        <button class="lang-btn active" id="btnDE" onclick="switchLang('de')">DE</button>
        <button class="lang-btn" id="btnEN" onclick="switchLang('en')">EN</button>
      </div>
    </li>
    <li><a href="#" onclick="openFormModal();return false;" class="termin">Termin anfragen</a></li>
  </ul>
  <button class="burger" id="burger" aria-label="Menü">
    <span></span><span></span><span></span>
  </button>
</nav>

<!-- MOBILE MENU -->
<div class="mobile" id="mobileMenu">
  <button class="close" id="mobileClose">✕</button>
  <a href="/shooting/">Shooting</a>
  <a href="/bewerbungsfotos/">Bewerbungsfotos</a>
  <a href="/portfolio/">Portfolio</a>
  <a href="/ueber-mich/">Über mich</a>
  <a href="/kontakt/">Kontakt</a>
  <a href="#" onclick="openFormModal();return false;">Termin anfragen</a>
</div>

<!-- NAVBAR JAVASCRIPT -->
<script>
// Scroll: transparent → weiss
window.addEventListener('scroll', () => {
  document.getElementById('topbar').classList.toggle('solid', window.scrollY > 60);
});

// Burger / Mobile Menu
document.getElementById('burger').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.add('open');
});
document.getElementById('mobileClose').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.remove('open');
});

// Sprache umschalten
function switchLang(lang) {
  localStorage.setItem('sf_lang', lang);
  document.getElementById('btnDE').classList.toggle('active', lang === 'de');
  document.getElementById('btnEN').classList.toggle('active', lang === 'en');
  applyLang(lang);
}

function applyLang(lang) {
  document.querySelectorAll('[data-' + lang + ']').forEach(el => {
    el.innerHTML = el.getAttribute('data-' + lang);
  });
}

// Beim Laden gespeicherte Sprache anwenden
(function() {
  const lang = localStorage.getItem('sf_lang') || 'de';
  if (lang === 'en') {
    document.getElementById('btnDE').classList.remove('active');
    document.getElementById('btnEN').classList.add('active');
  }
  applyLang(lang);
})();
</script>
