(function() {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    }
    return document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (!selectEl) {
      return;
    }

    if (all) {
      selectEl.forEach((item) => item.addEventListener(type, listener));
      return;
    }

    selectEl.addEventListener(type, listener);
  };

  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  const scrollto = (el) => {
    const target = select(el);
    if (!target) {
      return;
    }

    window.scrollTo({
      top: target.offsetTop,
      behavior: "smooth"
    });
  };

  const navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    const position = window.scrollY + 220;

    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) {
        return;
      }

      const section = select(navbarlink.hash);
      if (!section) {
        return;
      }

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };

  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  const backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };

    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  on("click", ".mobile-nav-toggle", function() {
    select("body").classList.toggle("mobile-nav-active");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  on("click", ".scrollto", function(e) {
    if (!this.hash) {
      return;
    }

    const target = select(this.hash);
    if (!target) {
      return;
    }

    e.preventDefault();

    const body = select("body");
    if (body.classList.contains("mobile-nav-active")) {
      body.classList.remove("mobile-nav-active");
      const navbarToggle = select(".mobile-nav-toggle");
      if (navbarToggle) {
        navbarToggle.classList.toggle("bi-list");
        navbarToggle.classList.toggle("bi-x");
      }
    }

    scrollto(this.hash);
  }, true);

  window.addEventListener("load", () => {
    if (!window.location.hash) {
      return;
    }

    const target = select(window.location.hash);
    if (target) {
      scrollto(window.location.hash);
    }
  });

  const preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  const typed = select(".typed");
  if (typed) {
    let typedStrings = typed.getAttribute("data-typed-items");
    typedStrings = typedStrings.split(",");

    new Typed(".typed", {
      strings: typedStrings,
      loop: true,
      typeSpeed: 70,
      backSpeed: 40,
      backDelay: 1800
    });
  }

  window.addEventListener("load", () => {
    const portfolioContainer = select(".portfolio-container");
    if (!portfolioContainer) {
      return;
    }

    const portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: ".portfolio-item"
    });

    const portfolioFilters = select("#portfolio-flters li", true);
    portfolioIsotope.on("arrangeComplete", () => {
      AOS.refresh();
    });

    on("click", "#portfolio-flters li", function(e) {
      e.preventDefault();

      portfolioFilters.forEach((el) => el.classList.remove("filter-active"));
      this.classList.add("filter-active");

      portfolioIsotope.arrange({
        filter: this.getAttribute("data-filter")
      });
    }, true);
  });

  if (select(".portfolio-details-slider")) {
    new Swiper(".portfolio-details-slider", {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true
      }
    });
  }

  window.addEventListener("load", () => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });
})();
