(function markActiveNavLink() {
  var links = document.querySelectorAll(".site-nav a");
  if (!links.length) return;

  function setActive(link) {
    links.forEach(function (a) { a.classList.toggle("is-active", a === link); });
  }

  // Highlight the link for the current page
  var path = window.location.pathname;
  links.forEach(function (a) {
    var url = new URL(a.getAttribute("href"), window.location.href);
    if (!url.hash && url.pathname === path) setActive(a);
  });

  // On the one-pager, highlight whichever section is in view
  if (!("IntersectionObserver" in window)) return;
  var byId = {};
  links.forEach(function (a) {
    var url = new URL(a.getAttribute("href"), window.location.href);
    if (url.hash && url.pathname === path) byId[url.hash.slice(1)] = a;
  });
  if (!Object.keys(byId).length) return;

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) setActive(byId[entry.target.id] || null);
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  // The hero has no nav link, so it clears the highlight
  document.querySelectorAll(".hero").forEach(function (hero) {
    sectionObserver.observe(hero);
  });
  Object.keys(byId).forEach(function (id) {
    var section = document.getElementById(id);
    if (section) sectionObserver.observe(section);
  });
})();

(function revealOnScroll() {
  var items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px" });

  items.forEach(function (el) { revealObserver.observe(el); });
})();

(function renderLastUpdated() {
  const output = document.getElementById("last-updated-value");

  if (!output) {
    return;
  }

  if (!window.LAST_UPDATED_AT) {
    output.textContent = "local copy";
    return;
  }

  const timestamp = new Date(window.LAST_UPDATED_AT);

  if (Number.isNaN(timestamp.getTime())) {
    output.textContent = "unavailable";
    return;
  }

  output.textContent = timestamp.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
})();

(function pressureDotGrid() {
  // Mouse-only enhancement; touch and reduced-motion keep the static CSS grid
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext && canvas.getContext("2d");
  if (!ctx) return;

  // Must match body::before in app.css
  var spacing = 14;
  var dotRadius = 1.15;
  var dotAlpha = 0.4;
  var maskCenter = { x: 0.5, y: 0.35 };

  // Pressure plate feel
  var reach = 90;
  var sink = 0.55;
  var dim = 0.5;
  var pull = 2.5;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var base = document.createElement("canvas");
  var baseCtx = base.getContext("2d");
  var width, height, cx, cy, maxDist, firstX;
  var target = { x: -9999, y: -9999 };
  var pos = { x: -9999, y: -9999 };
  var press = 0;
  var pressTarget = 0;
  var rafId = null;
  var lastBox = null;

  canvas.className = "dot-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);
  document.documentElement.classList.add("has-dot-canvas");

  // Same stops as the CSS mask: 1 at 0%, 0.45 at 22%, 0 at 50%
  function maskAlpha(x, y) {
    var dx = x - cx;
    var dy = y - cy;
    var t = Math.sqrt(dx * dx + dy * dy) / maxDist;
    if (t <= 0.22) return 1 - (t / 0.22) * 0.55;
    if (t <= 0.5) return 0.45 * (1 - (t - 0.22) / 0.28);
    return 0;
  }

  function dot(c, x, y, r, a) {
    c.globalAlpha = a;
    c.beginPath();
    c.arc(x, y, r, 0, Math.PI * 2);
    c.fill();
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    cx = width * maskCenter.x;
    cy = height * maskCenter.y;
    maxDist = Math.sqrt(Math.max(cx, width - cx) ** 2 + Math.max(cy, height - cy) ** 2);
    // background-position: center top puts a dot on the horizontal center line
    firstX = (width / 2) % spacing;

    [canvas, base].forEach(function (c) {
      c.width = width * dpr;
      c.height = height * dpr;
    });
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    baseCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    baseCtx.fillStyle = ctx.fillStyle = "rgb(230, 230, 230)";

    baseCtx.clearRect(0, 0, width, height);
    for (var y = spacing / 2; y < height; y += spacing) {
      for (var x = firstX; x < width; x += spacing) {
        var m = maskAlpha(x, y);
        if (m > 0) dot(baseCtx, x, y, dotRadius, dotAlpha * m);
      }
    }
    baseCtx.globalAlpha = 1;
    lastBox = null;
    render();
  }

  function render() {
    // Only repaint the patch around the cursor
    var box = lastBox || { x: 0, y: 0, w: width, h: height };
    ctx.globalAlpha = 1;
    ctx.clearRect(box.x, box.y, box.w, box.h);
    ctx.drawImage(base, box.x * dpr, box.y * dpr, box.w * dpr, box.h * dpr, box.x, box.y, box.w, box.h);
    lastBox = null;
    if (press < 0.01) return;

    var pad = reach + spacing;
    var x0 = pos.x - pad, y0 = pos.y - pad;
    lastBox = { x: Math.floor(x0), y: Math.floor(y0), w: Math.ceil(pad * 2), h: Math.ceil(pad * 2) };
    ctx.clearRect(lastBox.x, lastBox.y, lastBox.w, lastBox.h);

    var startX = firstX + Math.ceil((x0 - firstX) / spacing) * spacing;
    var startY = spacing / 2 + Math.ceil((y0 - spacing / 2) / spacing) * spacing;
    for (var y = startY; y < y0 + pad * 2; y += spacing) {
      for (var x = startX; x < x0 + pad * 2; x += spacing) {
        var m = maskAlpha(x, y);
        if (m <= 0) continue;
        var dx = x - pos.x;
        var dy = y - pos.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        var f = d < reach ? Math.pow(1 - d / reach, 2) * press : 0;
        // Dots near the cursor shrink, dim, and slide slightly inward, like a pressed surface
        var shift = d > 0 ? (pull * f) / d : 0;
        dot(ctx, x - dx * shift, y - dy * shift, dotRadius * (1 - sink * f), dotAlpha * m * (1 - dim * f));
      }
    }
  }

  function tick() {
    pos.x += (target.x - pos.x) * 0.2;
    pos.y += (target.y - pos.y) * 0.2;
    press += (pressTarget - press) * 0.12;
    render();

    var settled = Math.abs(target.x - pos.x) < 0.1 && Math.abs(target.y - pos.y) < 0.1 && Math.abs(pressTarget - press) < 0.005;
    rafId = settled ? null : requestAnimationFrame(tick);
  }

  function wake() {
    if (rafId === null) rafId = requestAnimationFrame(tick);
  }

  window.addEventListener("pointermove", function (e) {
    if (e.pointerType !== "mouse") return;
    if (pressTarget === 0) {
      pos.x = e.clientX;
      pos.y = e.clientY;
    }
    target.x = e.clientX;
    target.y = e.clientY;
    pressTarget = 1;
    wake();
  });

  document.documentElement.addEventListener("pointerleave", function () {
    pressTarget = 0;
    wake();
  });

  window.addEventListener("resize", resize);
  resize();
})();
