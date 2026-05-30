(function markActiveNavLink() {
  var allNavLinks = document.querySelectorAll(".nav-name, .nav-center a, .nav-right a");

  function clearActive() {
    allNavLinks.forEach(function (a) { a.classList.remove("nav-active"); });
  }

  // Highlight current page link on load
  var path = window.location.pathname;
  document.querySelectorAll(".nav-center a, .nav-right a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (!href || href.startsWith("#")) return;
    var hrefPath = new URL(href, window.location.href).pathname;
    if (path === hrefPath || path.endsWith("/" + hrefPath)) {
      a.classList.add("nav-active");
    }
  });

  // Highlight any nav link on click (covers anchor links like #about, #experience)
  allNavLinks.forEach(function (a) {
    a.addEventListener("click", function () {
      clearActive();
      a.classList.add("nav-active");
    });
  });
})();

function alertButton() {
  alert("Halo!");
}

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
