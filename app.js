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
