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
