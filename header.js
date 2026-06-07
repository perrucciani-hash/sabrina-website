<style>
  /* Grundzustand der Topbar (z.B. transparent) */
  .topbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000; /* Sorgt dafür, dass die Navbar immer oben ist */
    background-color: transparent;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }

  /* Zustand beim Scrollen (wird via JS aktiviert) */
  .topbar.solid {
    background-color: #ffffff !important; /* Wechselt auf Weiß */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Optional: Leichter Schatten */
  }

  /* Sorgt dafür, dass die Links in der weißen Navbar lesbar sind (Beispiel) */
  .topbar.solid .menu a, 
  .topbar.solid .termin-nav-btn {
    color: #000000; 
  }

  /* Verhindert, dass das mobile Menü im Hintergrund Klicks blockiert, wenn es geschlossen ist */
  .mobile {
    position: fixed;
    top: 0;
    right: -100%; /* Oder display: none; je nach deinem Design */
    z-index: 999;
    transition: right 0.3s ease;
  }
  .mobile.open {
    right: 0;
  }

  /* CSS-Reset für den neuen "Termin"-Button, damit er wie ein Link aussieht */
  .termin-nav-btn {
    background: none;
    border: none;
    font: inherit;
    cursor: pointer;
    color: inherit;
    padding: 0;
  }
</style>

<header class="topbar" id="topbar">
  <a href="/" class="logo">
    <img src="/images/logos/logo-weiss.png" alt="Sabrina Fiechter Photography" class="logo-img">
  </a>
  
  <ul class="menu">
    <li><a href="/portfolio/">Portfolio</a></li>
    <li><a href="/shooting/">Shooting</a></li>
    <li><a href="/ueber-mich/">Über mich</a></li>
    <li><a href="/blog/">Blog</a></li>
    <li class="lang-li">
      <div class="lang-toggle">
        <button class="lang-btn active" onclick="setLang('de'); event.stopPropagation();" id="btnDE">DE</button>
        <button class="lang-btn" onclick="setLang('en'); event.stopPropagation();" id="btnEN">EN</button>
      </div>
    </li>
    <li>
      <button onclick="openFormModal()" class="termin-nav-btn" data-de="Termin anfragen" data-en="Book now">Termin anfragen</button>
    </li>
  </ul>
  
  <button class="burger" onclick="document.querySelector('.mobile').classList.add('open')" aria-label="Menü">
    <span></span><span></span><span></span>
  </button>
</header>

<div class="mobile">
  <button class="close" onclick="document.querySelector('.mobile').classList.remove('open')">✕</button>
  <a href="/portfolio/">Portfolio</a>
  <a href="/shooting/">Shooting</a>
  <a href="/ueber-mich/">Über mich</a>
  <a href="/blog/">Blog</a>
  <button onclick="openFormModal(); document.querySelector('.mobile').classList.remove('open')" class="termin-nav-btn" data-de="Termin anfragen" data-en="Book now">Termin anfragen</button>
</div>

<div class="modal-overlay" id="modalOverlay" onclick="if(event.target===this)closeFormModal()">
  <div class="modal">
    <button class="modal-close" onclick="closeFormModal()" aria-label="Schliessen">✕</button>
    <h2 data-de="Termin anfragen" data-en="Book now">Termin anfragen</h2>
    <p class="sub" data-de="Ich melde mich so schnell wie möglich bei dir — versprochen." data-en="I'll get back to you as soon as possible — promise.">Ich melde mich so schnell wie möglich bei dir — versprochen.</p>
    
    <div id="formContent">
      <form name="termin-anfrage" method="POST" data-netlify="true" netlify-honeypot="bot-field" onsubmit="handleSubmit(event)">
        <input type="hidden" name="form-name" value="termin-anfrage">
        <p style="display:none"><input name="bot-field"></p>
        
        <div class="form-row">
          <div class="form-group">
            <label for="vorname" data-de="Vorname" data-en="First name">Vorname</label>
            <input type="text" id="vorname" name="vorname" placeholder="Sabrina"
                   data-placeholder-de="Sabrina" data-placeholder-en="Anna" required>
            <span class="field-error" data-de="Bitte gib deinen Vornamen ein." data-en="Please enter your first name.">Bitte gib deinen Vornamen ein.</span>
          </div>
          <div class="form-group">
            <label for="nachname" data-de="Nachname" data-en="Last name">Nachname</label>
            <input type="text" id="nachname" name="nachname" placeholder="Fiechter"
                   data-placeholder-de="Fiechter" data-placeholder-en="Smith" required>
            <span class="field-error" data-de="Bitte gib deinen Nachnamen ein." data-en="Please enter your last name.">Bitte gib deinen Nachnamen ein.</span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="email" data-de="E-Mail-Adresse" data-en="Email address">E-Mail-Adresse</label>
          <input type="email" id="email" name="email" placeholder="hallo@beispiel.ch"
                 data-placeholder-de="hallo@beispiel.ch" data-placeholder-en="hello@example.com" required>
          <span class="field-error" data-de="Bitte gib eine gültige E-Mail-Adresse ein." data-en="Please enter a valid email address.">Bitte gib eine gültige E-Mail-Adresse ein.</span>
        </div>
        
        <div class="form-group">
          <label for="telefon" data-de="Telefonnummer" data-en="Phone number">Telefonnummer</label>
          <input type="tel" id="telefon" name="telefon" placeholder="+41 76 000 00 00"
                 data-placeholder-de="+41 76 000 00 00" data-placeholder-en="+41 76 000 00 00" required>
          <span class="field-error" data-de="Bitte gib deine Telefonnummer ein." data-en="Please enter your phone number.">Bitte gib deine Telefonnummer ein.</span>
        </div>
        
        <div class="form-group">
          <label for="nachricht" data-de="Deine Nachricht" data-en="Your message">Deine Nachricht</label>
          <textarea id="nachricht" name="nachricht" required
                    placeholder="Erzähl mir von deinem Wunsch-Shooting..."
                    data-placeholder-de="Erzähl mir von deinem Wunsch-Shooting..."
                    data-placeholder-en="Tell me about your dream shoot..."></textarea>
          <span class="field-error" data-de="Bitte schreib mir eine kurze Nachricht." data-en="Please write a short message.">Bitte schreib mir eine kurze Nachricht.</span>
        </div>
        
        <button type="submit" class="form-submit" data-de="Los geht's →" data-en="Let's go →">Los geht's →</button>
      </form>
    </div>
    
    <div class="form-success" id="formSuccess" style="display:none;">
      <div class="check">✉️</div>
      <h3 data-de="Nachricht gesendet!" data-en="Message sent!">Nachricht gesendet!</h3>
      <p data-de="Danke — ich melde mich bald bei dir." data-en="Thank you — I'll be in touch soon.">Danke — ich melde mich bald bei dir.</p>
    </div>
  </div>
</div>

<script>
// --- 1. Scroll-Verhalten (Topbar) ---
const tb = document.getElementById('topbar');
if (tb) {
  window.addEventListener('scroll', () => {
    // Schaltet die Klasse "solid" ein, wenn mehr als 60px gescrollt wurde
    tb.classList.toggle('solid', window.scrollY > 60);
  }, { passive: true });
}

// --- 2. Modal Steuerung ---
function openFormModal() {
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

// Globaler Sprach-State aus LocalStorage holen (Standard: 'de')
let sfLang = localStorage.getItem('sf_lang') || 'de';

function closeFormModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// --- 3. Formular-Validierung ---
function validateField(f) {
  const g = f.closest('.form-group');
  if (!g) return true;
  
  const isEmail = f.type === 'email';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = isEmail ? emailRegex.test(f.value.trim()) : f.value.trim().length > 0;
  
  f.classList.toggle('invalid', !isValid);
  f.classList.toggle('valid', isValid);
  g.classList.toggle('has-error', !isValid);
  return isValid;
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('#modalOverlay input, #modalOverlay textarea').forEach(f => {
    f.addEventListener('blur', () => validateField(f));
    f.addEventListener('input', () => {
      if (f.classList.contains('invalid')) validateField(f);
    });
  });
  
  // Sprache direkt beim Laden der Seite initialisieren
  applyLang(sfLang);
});

// --- 4. Netlify Formular-Übermittlung ---
async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const fields = form.querySelectorAll('input[required], textarea[required]');
  let ok = true;
  let first = null;
  
  fields.forEach(f => {
    if (!validateField(f)) {
      ok = false;
      if (!first) first = f;
    }
  });
  
  if (!ok) {
    if (first) first.focus();
    return;
  }
  
  try {
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    });
    document.getElementById('formContent').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
    setTimeout(closeFormModal, 3000);
  } catch (err) {
    alert('Fehler beim Senden. Bitte versuche es nochmals.');
  }
}

// --- 5. Sprachumschaltung ---
function setLang(l) {
  sfLang = l;
  localStorage.setItem('sf_lang', l);
  
  const de = document.getElementById('btnDE');
  const en = document.getElementById('btnEN');
  if (de) de.classList.toggle('active', l === 'de');
  if (en) en.classList.toggle('active', l === 'en');
  
  applyLang(l);
}

function applyLang(l) {
  // Texte übersetzen
  document.querySelectorAll('[data-de]').forEach(el => {
    el.innerHTML = l === 'en' ? (el.getAttribute('data-en') || el.getAttribute('data-de')) : el.getAttribute('data-de');
  });
  // Placeholders übersetzen
  document.querySelectorAll('[data-placeholder-de]').forEach(el => {
    el.setAttribute('placeholder', l === 'en' ? el.getAttribute('data-placeholder-en') : el.getAttribute('data-placeholder-de'));
  });
}
</script>
