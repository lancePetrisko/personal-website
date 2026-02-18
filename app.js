function alertButton() {
  alert("Halo!");
}

const scrollIndicatorFill = document.querySelector(".scroll-indicator-fill");

if (scrollIndicatorFill) {
  const updateScrollIndicator = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent =
      scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    scrollIndicatorFill.style.height = `${Math.min(Math.max(scrollPercent, 0), 100)}%`;
  };

  window.addEventListener("scroll", updateScrollIndicator, { passive: true });
  window.addEventListener("resize", updateScrollIndicator);
  updateScrollIndicator();
}
