class SfHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        .topbar{
          position:fixed;top:0;left:0;right:0;z-index:300;
          display:flex;align-items:center;justify-content:space-between;
          padding:0 2.5rem;height:80px;
          background:linear-gradient(180deg,rgba(0,0,0,.55) 0%,rgba(0,0,0,0) 100%);
          transition:background .35s,height .35s,box-shadow .35s;
        }
        .topbar.solid{background:#fff;height:70px;box-shadow:0 2px 20px rgba(0,0,0,.06)}
        .topbar.always-solid{
          background:#fff !important;height:70px !important;
          box-shadow:0 2px 20px rgba(0,0,0,.06) !important;
        }
        .logo{text-decoration:none;display:flex;align-items:center;line-height:0}
        .logo-img{height:56px;width:auto;display:block;
          mix-blend-mode:screen;transition:filter .35s,mix-blend-mode .35s}
        .topbar.solid .logo-img,
        .topbar.always-solid .logo-img{mix-blend-mode:multiply;filter:none}
        .menu{display:flex;align-items:center;gap:2.2rem;list-style:none}
        .menu a{
          font-family:'Jost',sans-serif;font-size:.95rem;font-weight:400;
          letter-spacing:.02em;color:#fff;text-decoration:none;
          transition:color .25s;position:relative;padding-bottom:3px
        }
        .topbar.solid .menu a,
        .topbar.always-solid .menu a{color:#1a1a1a}
        .menu a::after{
          content:'';position:absolute;left:0;bottom:0;
          width:0;height:1.5px;background:currentColor;transition:width .3s
        }
        .menu a:hover::after,.menu a.active::after{width:100%}
        .menu a.active{color:#1f7a72}
        .topbar.solid .menu a.active,
        .topbar.always-solid .menu a.active{color:#1f7a72}
        .menu .termin{
          background:#fff;color:#1a1a1a !important;
          padding:.6rem 1.4rem;border-radius:2px;font-weight:500;
          transition:background .25s,color .25s
        }
        .menu .termin::after{display:none}
        .topbar.solid .menu .termin,
        .topbar.always-solid .menu .termin{background:#1a1a1a;color:#fff !important}
        .menu .termin:hover{background:#1f7a72 !important;color:#fff !important}
        .burger{display:none;flex-direction:column;gap:6px;background:none;border:none;cursor:pointer}
        .burger span{width:26px;height:2px;background:#fff;display:block;transition:background .35s}
        .topbar.solid .burger span,
        .topbar.always-solid .burger span{background:#1a1a1a}
        .mobile{
          position:fixed;inset:0;z-index:290;background:#fff;display:none;
          flex-direction:column;justify-content:center;padding:3rem;gap:.4rem
        }
        .mobile.open{display:flex}
        .mobile a{
          font-family:'Jost';font-size:1.6rem;color:#1a1a1a;
          text-decoration:none;padding:.7rem 0;border-bottom:1px solid #e6e6e6
        }
        .mobile .close-btn{
          position:absolute;top:1.8rem;right:2.5rem;font-size:2rem;
          background:none;border:none;cursor:pointer;color:#1a1a1a
        }
        .lang-toggle{display:flex;align-items:center;gap:4px}
        .lang-li{list-style:none;display:flex;align-items:center;margin-left:.5rem}
        .lang-btn{
          padding:.35rem .65rem;font-family:'Jost',sans-serif;font-size:.78rem;
          font-weight:600;letter-spacing:.08em;cursor:pointer;
          border:1.5px solid rgba(255,255,255,.5);border-radius:2px;
          background:rgba(255,255,255,.15);color:rgba(255,255,255,.9);
          transition:all .2s;line-height:1
        }
        .lang-btn.active{background:#fff;color:#1a1a1a;border-color:#fff}
        .topbar.solid .lang-btn,
        .topbar.always-solid .lang-btn{border-color:#d0d0d0;background:#fff;color:#666}
        .topbar.solid .lang-btn.active,
        .topbar.always-solid .lang-btn.active{background:#1a1a1a;color:#fff;border-color:#1a1a1a}
        @media(max-width:920px){
          .topbar{padding:0 1.3rem}
          .menu{display:none}
          .burger{display:flex}
        }
      </style>

      <nav class="topbar" id="sf-topbar">
        <a href="/" class="logo">
          <img src="/images/logos/logo-weiss.png" alt="Sabrina Fiechter" class="logo-img">
        </a>
        <ul class="menu">
          <li><a href="/shooting/">Shooting</a></li>
          <li><a href="/bewerbungsfotos/">Bewerbungsfotos</a></li>
          <li><a href="/portfolio/">Portfolio</a></li>
          <li><a href="/ueber-mich/">Über mich</a></li>
          <li><a href="/kontakt/">Kontakt</a></li>
          <li class="lang-li">
            <div class="lang-toggle">
              <button class="lang-btn active" id="sf-btnDE">DE</button>
              <button class="lang-btn" id="sf-btnEN">EN</button>
            </div>
          </li>
          <li><a href="#" class="termin" id="sf-termin-btn">Termin anfragen</a></li>
        </ul>
        <button class="burger" id="sf-burger" aria-label="Menue">
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div class="mobile" id="sf-mobile">
        <button class="close-btn" id="sf-mobile-close">X</button>
        <a href="/shooting/">Shooting</a>
        <a href="/bewerbungsfotos/">Bewerbungsfotos</a>
        <a href="/portfolio/">Portfolio</a>
        <a href="/ueber-mich/">Über mich</a>
        <a href="/kontakt/">Kontakt</a>
        <a href="#" id="sf-termin-mobile">Termin anfragen</a>
      </div>
    `;

    this._init();
  }

  _init() {
    const topbar = this.querySelector('#sf-topbar');

    // Seiten ohne Hero: Topbar immer weiss (z.B. ueber-mich, kontakt, portfolio)
    const alwaysSolid = !document.querySelector('.hero');
    if (alwaysSolid) {
      topbar.classList.add('always-solid');
    } else {
      window.addEventListener('scroll', () => {
        topbar.classList.toggle('solid', window.scrollY > 60);
      }, { passive: true });
    }

    // Aktive Seite markieren
    const path = window.location.pathname;
    this.querySelectorAll('.menu a').forEach(a => {
      const href = a.getAttribute('href');
      if (href && href !== '#' && path.startsWith(href) && href !== '/') {
        a.classList.add('active');
      }
    });

    // Burger / Mobile Menu
    this.querySelector('#sf-burger').addEventListener('click', () => {
      this.querySelector('#sf-mobile').classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    this.querySelector('#sf-mobile-close').addEventListener('click', () => {
      this.querySelector('#sf-mobile').classList.remove('open');
      document.body.style.overflow = '';
    });

    // Termin-Button
    const openModal = (e) => {
      e.preventDefault();
      if (typeof openFormModal === 'function') openFormModal();
    };
    this.querySelector('#sf-termin-btn').addEventListener('click', openModal);
    this.querySelector('#sf-termin-mobile').addEventListener('click', openModal);

    // Sprache
    const btnDE = this.querySelector('#sf-btnDE');
    const btnEN = this.querySelector('#sf-btnEN');

    const applyLang = (lang) => {
      document.querySelectorAll('[data-de]').forEach(el => {
        el.innerHTML = lang === 'en'
          ? (el.getAttribute('data-en') || el.getAttribute('data-de'))
          : el.getAttribute('data-de');
      });
      document.querySelectorAll('[data-placeholder-de]').forEach(el => {
        el.setAttribute('placeholder',
          lang === 'en'
            ? el.getAttribute('data-placeholder-en')
            : el.getAttribute('data-placeholder-de')
        );
      });
      btnDE.classList.toggle('active', lang === 'de');
      btnEN.classList.toggle('active', lang === 'en');
      localStorage.setItem('sf_lang', lang);
    };

    btnDE.addEventListener('click', () => applyLang('de'));
    btnEN.addEventListener('click', () => applyLang('en'));

    // Global verfügbar machen
    window.applyLang = applyLang;

    // Gespeicherte Sprache anwenden
    applyLang(localStorage.getItem('sf_lang') || 'de');

    // Signal: Header bereit
    document.dispatchEvent(new Event('sf-header-ready'));
  }
}

customElements.define('sf-header', SfHeader);
