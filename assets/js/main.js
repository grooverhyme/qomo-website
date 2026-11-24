/* QOMO — interactions
   Vanilla JS, no dependencies. Every block guards for its own markup,
   so one file serves all pages. */
(() => {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const page = document.body.dataset.page || "";
  const IMG = "assets/img/";

  /* ------------------------------------------------------------------
     Shared chrome: header, mobile menu, mini footer, mega footer
     ------------------------------------------------------------------ */
  const NAV = [
    ["spatial", "spatial-design.html", "SPATIAL DESIGN"],
    ["kala", "kala.html", "Kalā"],
    ["practice", "practice.html", "practice"],
    ["shop", "shop.html", "SHOP"],
    ["enquire", "enquire.html", "enquire"],
  ];
  const navLinks = () =>
    NAV.map(([k, href, label]) =>
      `<a href="${href}"${page === k ? ' aria-current="page"' : ""}>${label}</a>`).join("");

  const headerSlot = $("[data-include='header']");
  if (headerSlot) {
    headerSlot.outerHTML = `
      <header class="site-header" id="top">
        <div class="wrap">
          <a class="brand" href="index.html" aria-label="QOMO — home">
            <img src="${IMG}logo-mark.png" alt="" width="43" height="42">
            <span>QOMO</span>
          </a>
          <nav class="nav" aria-label="Primary">${navLinks()}</nav>
          <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span></button>
        </div>
      </header>
      <nav class="mobile-menu" id="mobile-menu" aria-label="Mobile">
        <span class="mm-word" aria-hidden="true">QOMO</span>
        ${navLinks()}
      </nav>`;
  }

  const footerSlot = $("[data-include='footer']");
  if (footerSlot) {
    footerSlot.outerHTML = `
      <footer class="site-footer">
        <div class="wrap">
          <a class="foot-id" href="index.html">
            <strong>QOMO</strong><span class="bar">|</span><span class="studio">Studio</span><span class="copy">© 2026. All rights reserved.</span>
          </a>
          <nav class="foot-nav" aria-label="Footer">
            <a href="spatial-design.html">SPATIAL Design</a>
            <a href="kala.html">Kalā</a>
            <a href="practice.html">Practice</a>
            <a href="enquire.html">Enquire</a>
          </nav>
          <div class="foot-social">
            <a href="https://www.instagram.com/annu_salimath?utm_source=ig_web_button_share_sheet&amp;bqrl=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener">INSTAGRAM</a>
            <a href="shop.html">SHOP</a>
            <a href="#">TERMS</a>
          </div>
        </div>
      </footer>`;
  }

  const megaSlot = $("[data-include='mega']");
  if (megaSlot) {
    const grass = megaSlot.dataset.variant === "grass";
    const script = grass ? "store-qomo-script.png" : "qomo-script-white.png";
    megaSlot.outerHTML = `
      <section class="mega${grass ? " mega--grass" : ""}"${grass ? ` style="background-image:url('${IMG}store-footer-bg.png')"` : ""}>
        <div class="wrap">
          <div class="mega-cols">
            <div>
              <h4>PRACTICE DIRECTORY</h4>
              <ul>
                <li><a href="spatial-design.html">Architecture Archive</a></li>
                <li><a href="practice.html">QOMO Atelier</a></li>
                <li><a href="shop.html">Print Studio</a></li>
                <li><a href="things.html">Art Pop up</a></li>
                <li><a href="enquire.html">Private Commissions</a></li>
              </ul>
            </div>
            <div>
              <h4>FLow State</h4>
              <ul>
                <li><a href="kala.html">Cosmos</a></li>
                <li><a href="kala.html#sun-sky">Sun &amp; Sky</a></li>
                <li><a href="kala.html#forest-floor">Forest Floor</a></li>
                <li><a href="kala.html#terrain">The Terrain</a></li>
              </ul>
            </div>
            <div>
              <h4>Socials</h4>
              <ul>
                <li><a href="https://www.instagram.com/annu_salimath?utm_source=ig_web_button_share_sheet&amp;bqrl=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener">Instagram</a></li>
                <li><a href="https://www.linkedin.com/in/annapurna-salimath-576740175/" target="_blank" rel="noopener">Linkedin</a></li>
                <li><a href="#" rel="noopener">Substack</a></li>
              </ul>
            </div>
            <div class="personal">
              <h4>Personal</h4>
              <ul>
                <li><a href="practice.html#gallery">Field Notes</a></li>
                <li><a href="practice.html#gallery">Visual Blog</a></li>
                <li><a href="practice.html#gallery">Sketches</a></li>
              </ul>
              <a class="touch" href="enquire.html">● Get in touch</a>
            </div>
          </div>
          <a class="mega-script" href="#top" aria-label="Back to top">
            <img src="${IMG}${script}" alt="QOMO" width="1024" height="333" loading="lazy">
          </a>
          <div class="mega-fine">
            <span class="sig">Curated by Annu</span>
            <small>© 2026. QOMO Studio. All rights reserved.</small>
          </div>
        </div>
      </section>`;
  }

  /* Favicon — design.md: monogram as favicon */
  if (!$("link[rel='icon']")) {
    const l = document.createElement("link");
    l.rel = "icon"; l.type = "image/png"; l.href = IMG + "logo-mark.png";
    document.head.appendChild(l);
  }

  /* ------------------------------------------------------------------
     Preloader + page veil
     ------------------------------------------------------------------ */
  const pre = document.createElement("div");
  pre.className = "preloader";
  pre.innerHTML = `<img src="${IMG}logo-mark.png" alt="">`;
  const veil = document.createElement("div");
  veil.className = "veil";
  document.body.append(pre, veil);

  let loadedOnce = false;
  const finishLoad = () => {
    if (loadedOnce) return;
    loadedOnce = true;
    pre.classList.add("is-done");
    document.documentElement.classList.add("loaded");
    document.body.classList.add("loaded");
    setTimeout(() => pre.remove(), 900);
  };
  if (document.readyState === "complete") setTimeout(finishLoad, 250);
  else window.addEventListener("load", () => setTimeout(finishLoad, 250));
  setTimeout(finishLoad, 2200); // never hold the page hostage

  window.addEventListener("pageshow", (e) => { if (e.persisted) veil.classList.remove("is-active"); });

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || reduce) return;
    const href = a.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin && location.protocol !== "file:") return;
    if (url.pathname === location.pathname && url.hash) return;
    e.preventDefault();
    veil.classList.add("is-active");
    setTimeout(() => { location.href = a.href; }, 520);
  });

  /* ------------------------------------------------------------------
     Header behaviour + mobile menu
     ------------------------------------------------------------------ */
  const header = $(".site-header");
  if (header) {
    let lastY = scrollY;
    addEventListener("scroll", () => {
      const y = scrollY;
      const hide = y > lastY && y > 160 && !document.body.classList.contains("menu-open");
      header.classList.toggle("is-hidden", hide);
      lastY = y;
    }, { passive: true });

    const toggle = $(".menu-toggle", header);
    const setMenu = (open) => {
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    toggle.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
    addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
    $$(".mobile-menu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  }

  /* ------------------------------------------------------------------
     Cursor follower
     ------------------------------------------------------------------ */
  if (finePointer && !reduce) {
    const c = document.createElement("div");
    c.className = "cursor";
    document.body.appendChild(c);
    let x = -100, y = -100, cx = x, cy = y;
    addEventListener("mousemove", (e) => { x = e.clientX; y = e.clientY; c.classList.add("is-visible"); }, { passive: true });
    document.addEventListener("mouseleave", () => c.classList.remove("is-visible"));
    document.addEventListener("mouseover", (e) => {
      c.classList.toggle("is-hover", !!e.target.closest("a, button, .curve__item, .reel__item, .tile, select, input, textarea"));
    });
    const loop = () => {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      c.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ------------------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------------------ */
  $$(".stagger").forEach((g) => [...g.children].forEach((el, i) => el.style.setProperty("--i", i)));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  $$(".reveal, .img-reveal, .line-mask, [data-reveal], .mega-script").forEach((el) => io.observe(el));

  /* ------------------------------------------------------------------
     Generic scroll-driven parallax: [data-parallax="0.15"]
     ------------------------------------------------------------------ */
  const parallaxEls = $$("[data-parallax]");
  const realms = $$(".realm");
  const galleryCols = $$(".gallery__col");
  let ticking = false;
  const onScroll = () => {
    const vh = innerHeight;
    if (!reduce) {
      parallaxEls.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const speed = parseFloat(el.dataset.parallax) || 0.1;
        const mid = r.top + r.height / 2 - vh / 2;
        el.style.transform = `translate3d(0, ${(-mid * speed).toFixed(1)}px, 0)`;
      });
      if (galleryCols.length && innerWidth > 900) {
        const g = galleryCols[0].parentElement.getBoundingClientRect();
        const p = (vh - g.top) / (vh + g.height); // 0 → 1 across the section
        const speeds = [0, -60, 30, -90];
        galleryCols.forEach((col, i) => { col.style.transform = `translate3d(0, ${(p * speeds[i]).toFixed(1)}px, 0)`; });
      }
    }
    // Kalā realms: text fades in, image settles as each panel arrives
    if (realms.length) {
      const wrapTop = realms[0].parentElement.getBoundingClientRect().top;
      realms.forEach((rm, k) => {
        const naturalTop = wrapTop + k * rm.offsetHeight; // where the panel would sit if it weren't sticky
        const arrive = 1 - Math.min(Math.max(naturalTop / vh, 0), 1); // 0 below the fold → 1 pinned
        const o = Math.min(Math.max((arrive - 0.35) / 0.45, 0), 1);
        rm.style.setProperty("--o", reduce ? 1 : o.toFixed(3));
        rm.style.setProperty("--y", reduce ? 0 : ((1 - o) * 40).toFixed(1));
        rm.style.setProperty("--s", reduce ? 1 : (1.12 - arrive * 0.12).toFixed(4));
      });
    }
    ticking = false;
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener("resize", onScroll);
  onScroll();

  /* ------------------------------------------------------------------
     Background footage: play only while on screen; hold the poster
     frame for visitors who ask for reduced motion
     ------------------------------------------------------------------ */
  const footage = $$(".realm__bg video, .logo-mask video, .card__media video, .store__index video, .pdp-fig video");
  if (footage.length) {
    if (reduce) footage.forEach((v) => { v.removeAttribute("autoplay"); v.pause(); });
    else {
      const vio = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          const v = en.target;
          if (en.isIntersecting) { const p = v.play(); if (p && p.catch) p.catch(() => {}); }
          else v.pause();
        });
      }, { threshold: 0.05 });
      footage.forEach((v) => { v.muted = true; vio.observe(v); });
    }
  }

  /* ------------------------------------------------------------------
     HOME — hero script follows the pointer slightly
     ------------------------------------------------------------------ */
  const heroScript = $(".home-hero__script .logo-mask");
  if (heroScript && finePointer && !reduce) {
    addEventListener("mousemove", (e) => {
      const dx = (e.clientX / innerWidth - 0.5) * 2;
      const dy = (e.clientY / innerHeight - 0.5) * 2;
      heroScript.style.transform = `translate3d(${dx * -10}px, ${dy * -6}px, 0) rotate(${dx * -0.6}deg)`;
    }, { passive: true });
  }

  /* ------------------------------------------------------------------
     HOME — "The selection": endless curved reel with drag
     ------------------------------------------------------------------ */
  const curveTrack = $(".curve__track");
  if (curveTrack) {
    const items = [...curveTrack.children];
    items.forEach((n) => { const c = n.cloneNode(true); c.setAttribute("aria-hidden", "true"); curveTrack.appendChild(c); });
    const all = [...curveTrack.children];
    let pos = 0, vel = reduce ? 0 : -0.45, dragging = false, startX = 0, startPos = 0, lastX = 0, half = 0;
    const measure = () => { half = curveTrack.scrollWidth / 2; };
    measure(); addEventListener("resize", measure);
    const curveBox = curveTrack.parentElement;
    const tick = () => {
      if (!dragging) pos += vel;
      if (half) { if (pos <= -half) pos += half; if (pos > 0) pos -= half; }
      curveTrack.style.transform = `translate3d(${pos}px,0,0)`;
      // curved screen: cards rotate & sink toward the edges
      const w = curveBox.clientWidth;
      all.forEach((it) => {
        const r = it.getBoundingClientRect();
        const c = (r.left + r.width / 2) / w - 0.5; // -0.5 … 0.5
        const k = Math.max(-0.75, Math.min(0.75, c));
        it.style.transform = reduce ? "" : `perspective(1200px) rotateY(${(-k * 26).toFixed(2)}deg) scale(${(1 - Math.abs(k) * 0.08).toFixed(3)})`;
      });
      requestAnimationFrame(tick);
    };
    tick();
    const down = (x) => { dragging = true; startX = lastX = x; startPos = pos; curveTrack.classList.add("is-drag"); };
    const move = (x) => { if (!dragging) return; pos = startPos + (x - startX); vel = (x - lastX) * 0.5; lastX = x; };
    const up = () => {
      if (!dragging) return; dragging = false; curveTrack.classList.remove("is-drag");
      const target = reduce ? 0 : -0.45; const ease = () => { vel += (target - vel) * 0.04; if (Math.abs(vel - target) > 0.01 && !dragging) requestAnimationFrame(ease); }; ease();
    };
    curveTrack.addEventListener("pointerdown", (e) => { down(e.clientX); curveTrack.setPointerCapture(e.pointerId); });
    curveTrack.addEventListener("pointermove", (e) => move(e.clientX));
    curveTrack.addEventListener("pointerup", up);
    curveTrack.addEventListener("pointercancel", up);
    curveTrack.addEventListener("mouseenter", () => { if (!dragging) vel = reduce ? 0 : -0.15; });
    curveTrack.addEventListener("mouseleave", () => { if (!dragging) vel = reduce ? 0 : -0.45; });
  }

  /* ------------------------------------------------------------------
     Lightbox (practice gallery, things by QOMO, plain arc items)
     ------------------------------------------------------------------ */
  const makeLightbox = () => {
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Image viewer");
    lb.innerHTML = `
      <button class="overlay__close" type="button" aria-label="Close"><span></span><span></span></button>
      <button class="lightbox__btn lightbox__btn--prev" type="button" aria-label="Previous image"><img src="${IMG}arrow-prev.svg" alt=""></button>
      <figure><img alt=""></figure>
      <button class="lightbox__btn lightbox__btn--next" type="button" aria-label="Next image"><img src="${IMG}arrow-next.svg" alt=""></button>
      <div class="lightbox__count" aria-live="polite"></div>`;
    document.body.appendChild(lb);
    let list = [], idx = 0, opener = null;
    const img = $("figure img", lb), count = $(".lightbox__count", lb);
    const show = () => {
      img.src = list[idx].src; img.alt = list[idx].alt || "";
      img.style.animation = "none"; void img.offsetWidth; img.style.animation = "";
      count.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(list.length).padStart(2, "0")}`;
    };
    const open = (items, i, from) => { list = items; idx = i; opener = from; show(); lb.classList.add("is-open"); document.body.style.overflow = "hidden"; $(".overlay__close", lb).focus(); };
    const close = () => { lb.classList.remove("is-open"); document.body.style.overflow = ""; if (opener) opener.focus(); };
    const step = (d) => { idx = (idx + d + list.length) % list.length; show(); };
    $(".overlay__close", lb).addEventListener("click", close);
    $(".lightbox__btn--prev", lb).addEventListener("click", () => step(-1));
    $(".lightbox__btn--next", lb).addEventListener("click", () => step(1));
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    addEventListener("keydown", (e) => {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    });
    let sx = 0;
    lb.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", (e) => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); });
    return { open };
  };
  let lightbox = null;
  const getLB = () => (lightbox ||= makeLightbox());

  $$("[data-lightbox]").forEach((group) => {
    const triggers = $$("[data-lb-item]", group);
    const items = triggers.map((t) => { const im = $("img", t); return { src: t.dataset.full || im.src, alt: im.alt }; });
    triggers.forEach((t, i) => t.addEventListener("click", (e) => { e.preventDefault(); getLB().open(items, i, t); }));
  });

  /* ------------------------------------------------------------------
     SPATIAL DESIGN — reel, grid toggle, project overlay
     ------------------------------------------------------------------ */
  const arc = $(".arc");
  if (arc) {
    const viewport = $(".reel__viewport", arc);
    const track = $(".reel__track", arc);
    const items = $$(".reel__item", arc);
    const count = $(".count", arc);
    const bar = $(".progress span", arc);
    let index = 0;

    const go = (i, animate = true) => {
      index = Math.max(0, Math.min(items.length - 1, i));
      const it = items[index];
      const offset = viewport.clientWidth / 2 - (it.offsetLeft + it.offsetWidth / 2);
      track.classList.toggle("no-anim", !animate);
      track.style.transform = `translate3d(${offset}px,0,0)`;
      items.forEach((n, k) => {
        n.classList.toggle("is-active", k === index);
        n.style.setProperty("--px", ((k - index) * -4).toString());
        n.setAttribute("aria-current", k === index ? "true" : "false");
      });
      count.textContent = `${String(index + 1).padStart(2, "0")} — ${String(items.length).padStart(2, "0")}`;
      bar.style.transform = `translateX(${index * 100}%)`;
    };
    go(0, false);
    addEventListener("resize", () => go(index, false));
    $(".reel__prev", arc).addEventListener("click", () => go(index - 1));
    $(".reel__next", arc).addEventListener("click", () => go(index + 1));
    arc.addEventListener("keydown", (e) => {
      if (e.target.closest("input, textarea, select")) return;
      if (e.key === "ArrowRight") go(index + 1);
      if (e.key === "ArrowLeft") go(index - 1);
    });

    // drag / swipe
    let down = false, sx = 0, moved = 0, base = 0;
    const currentX = () => { const m = /translate3d\(([-\d.]+)px/.exec(track.style.transform); return m ? parseFloat(m[1]) : 0; };
    viewport.addEventListener("pointerdown", (e) => { down = true; sx = e.clientX; moved = 0; base = currentX(); track.classList.add("no-anim"); viewport.classList.add("is-drag"); });
    addEventListener("pointermove", (e) => { if (!down) return; moved = e.clientX - sx; track.style.transform = `translate3d(${base + moved}px,0,0)`; });
    addEventListener("pointerup", () => {
      if (!down) return; down = false; viewport.classList.remove("is-drag");
      if (Math.abs(moved) > 60) go(index + (moved < 0 ? 1 : -1)); else go(index);
    });
    // horizontal wheel / trackpad
    let wheelLock = false;
    viewport.addEventListener("wheel", (e) => {
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : 0;
      if (!d) return;
      e.preventDefault();
      if (wheelLock || Math.abs(d) < 8) return;
      wheelLock = true; go(index + (d > 0 ? 1 : -1)); setTimeout(() => { wheelLock = false; }, 650);
    }, { passive: false });

    // grid / immersive toggle
    $$(".toggle button", arc).forEach((b) => b.addEventListener("click", () => {
      const grid = b.dataset.mode === "grid";
      arc.classList.toggle("is-grid", grid);
      $$(".toggle button", arc).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      if (!grid) requestAnimationFrame(() => go(index, false));
    }));

    // project overlay
    const PROJECTS = {
      quiet: {
        main: ["quiet-main.jpg", "quiet-thumb-1.jpg", "quiet-thumb-2.jpg", "quiet-thumb-3.jpg", "quiet-thumb-4.jpg"],
        spec: ["Residence for Annu", "2020 sq.ft", "Hubli, Karnataka"],
        strip: [],
      },
      atrium: {
        main: ["atrium-main.jpg", "atrium-plan-1.jpg", "atrium-plan-2.jpg", "atrium-plan-3.jpg", "atrium-plan-4.jpg"],
        spec: ["The Atrium", "2020 sq.ft", "Hubli, Karnataka"],
        strip: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `atrium-strip-${n}.jpg`),
      },
    };
    const SCOPE = "Designed as a home first, and an architectural object second. The spaces are modest in gesture but deliberate in detail, with the architecture and interiors growing from the same material language.";
    const ov = $(".overlay");
    let opener = null;
    const openProject = (key, from) => {
      const p = PROJECTS[key]; if (!p || !ov) return;
      opener = from;
      const mainImg = $(".overlay__main img", ov);
      mainImg.src = IMG + p.main[0];
      const thumbs = $(".overlay__thumbs", ov);
      thumbs.innerHTML = p.main.slice(1).map((f, i) =>
        `<button type="button" data-src="${IMG + f}" aria-label="Show image ${i + 2}"><img src="${IMG + f}" alt="" loading="lazy"></button>`).join("");
      $$("button", thumbs).forEach((b) => b.addEventListener("click", () => {
        const cur = mainImg.src;
        mainImg.src = b.dataset.src;
        b.dataset.src = cur; $("img", b).src = cur;
        mainImg.style.animation = "none"; void mainImg.offsetWidth; mainImg.style.animation = "";
      }));
      const dds = $$(".spec dd", ov);
      dds[0].textContent = p.spec[0]; dds[1].textContent = p.spec[1]; dds[2].textContent = p.spec[2]; dds[3].textContent = SCOPE;
      const strip = $(".overlay__strip", ov);
      strip.classList.remove("is-open");
      strip.innerHTML = (p.strip.length ? p.strip : p.main).map((f) => `<img src="${IMG + f}" alt="" loading="lazy">`).join("");
      ov.classList.add("is-open");
      ov.scrollTop = 0;
      document.body.style.overflow = "hidden";
      $(".overlay__close", ov).focus();
    };
    const closeProject = () => { ov.classList.remove("is-open"); document.body.style.overflow = ""; if (opener) opener.focus(); };
    if (ov) {
      $(".overlay__close", ov).addEventListener("click", closeProject);
      ov.addEventListener("click", (e) => { if (e.target === ov) closeProject(); });
      addEventListener("keydown", (e) => { if (e.key === "Escape" && ov.classList.contains("is-open")) closeProject(); });
      $(".view-full", ov).addEventListener("click", (e) => {
        e.preventDefault();
        const s = $(".overlay__strip", ov);
        s.classList.toggle("is-open");
        if (s.classList.contains("is-open")) setTimeout(() => s.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" }), 200);
      });
    }
    const openFrom = (el) => {
      const key = el.dataset.project;
      if (key) openProject(key, el);
      else getLB().open([{ src: $("img", el).src, alt: "" }], 0, el);
    };
    items.forEach((it, k) => it.addEventListener("click", () => {
      if (Math.abs(moved) > 6) return; // was a drag
      if (k !== index) { go(k); return; }
      openFrom(it);
    }));
    items.forEach((it) => it.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openFrom(it); } }));
    $$(".arc-grid button", arc).forEach((b) => b.addEventListener("click", () => openFrom(b)));
  }

  /* ------------------------------------------------------------------
     SHOP — grid / index switch
     ------------------------------------------------------------------ */
  const store = $(".store");
  if (store) {
    $$(".switch button", store).forEach((b) => b.addEventListener("click", () => {
      store.classList.toggle("is-index", b.dataset.view === "index");
      $$(".switch button", store).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    }));
  }

  /* ------------------------------------------------------------------
     ENQUIRE — form → composes an email to the studio address
     ------------------------------------------------------------------ */
  const form = $("#enquiry");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      $$("[required]", form).forEach((f) => {
        const bad = !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value));
        f.closest(".field").classList.toggle("is-error", bad);
        if (bad && ok) { f.focus(); ok = false; }
      });
      if (!ok) return;
      const d = Object.fromEntries(new FormData(form));
      const subject = `Enquiry — ${d.service || "QOMO"} — ${d.name}`;
      const body = [`Name: ${d.name}`, `Email: ${d.email}`, d.company ? `Company: ${d.company}` : "", d.service ? `Looking for: ${d.service}` : "", "", d.project || ""].filter((l, i) => l || i > 3).join("\n");
      location.href = `mailto:hello@qomo.studio?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
    $$("input, textarea", form).forEach((f) => f.addEventListener("input", () => f.closest(".field").classList.remove("is-error")));
  }
})();
