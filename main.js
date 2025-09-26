window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  // common intro animation
  gsap.from("#watch", {
    scale: 0.2,
    opacity: 0,
    duration: 1.5,
    ease: "power2.out"
  });

  mm.add(
    {
      // define breakpoints
      isDesktop: "(min-width: 1025px)",
      isTablet: "(min-width: 601px) and (max-width: 1024px)",
      isMobile: "(max-width: 600px)"
    },
    (context) => {
      let { isDesktop, isTablet, isMobile } = context.conditions;

      const section0 = document.querySelector("#section0");
      const section1 = document.querySelector("#section1");
      const section2 = document.querySelector("#section2");
      const section3 = document.querySelector("#section3");
      const watch = document.querySelector("#watch");

      // marker for section1 target
      const marker1 = section1.querySelector(".watch-target");
      const marker2 = section3.querySelector("#watch-target2");

      function buildTimeline() {
        const distanceY1 = section1.offsetTop - section0.offsetTop;
        const distanceY2 = section2.offsetTop - section1.offsetTop;
        const distanceY3 = section3.offsetTop - section2.offsetTop;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#section0",
            start: "top top",
            end: () => "+=" + (distanceY1 + distanceY2 + distanceY3),
            scrub: true,
            // markers: true
          }
        });

        // Step 1 → move to marker in section1
        tl.to("#watch", {
          x: () => (isDesktop ? marker1.offsetLeft - watch.offsetLeft : 0),
          y: distanceY1,
          rotation: 90,
          ease: "none"
        });

        // Step 2 → move to center of section2
        tl.to("#watch", {
          x: () =>
            (section2.offsetLeft + section2.offsetWidth / 2) -
            (watch.offsetLeft + watch.offsetWidth / 2),
          y: "+=" + distanceY2,
          rotation: 0,
          ease: "none"
        });

        // Step 3 → grow in section3
        tl.to("#watch", {
          y: () =>
            (marker2.offsetTop + marker2.offsetHeight) -
            (watch.offsetTop + watch.offsetHeight),
          width: isMobile ? "180px" : "250px",
          height: isMobile ? "180px" : "250px",
          ease: "none"
        });

        return tl;
      }

      let tl = buildTimeline();

      // rebuild timeline on refresh
      ScrollTrigger.addEventListener("refreshInit", () => {
        if (tl) tl.kill();
        tl = buildTimeline();
      });

      ScrollTrigger.refresh();
    }
  );
});
