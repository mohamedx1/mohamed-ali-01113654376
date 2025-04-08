document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
    });
  });
});
function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".count");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const end = parseInt(el.getAttribute("data-end"));
          animateValue(el, 0, end, 2000);
          observer.unobserve(el); // stop observing after animation
        }
      });
    },
    {
      threshold: 0.5, // trigger when 50% of element is visible
    }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
});
