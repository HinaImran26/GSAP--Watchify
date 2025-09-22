window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollTrigger);

  const section0 = document.querySelector("#section0");
  const section1 = document.querySelector("#section1");
  const section2 = document.querySelector("#section2");
  const section3 = document.querySelector("#section3");

  const watch = document.querySelector("#watch");

  if (!section0 || !section1 || !section2 || !watch) {
    console.warn("Missing one of: #section0, #section1, #section2, #watch");
    return;
  }

  // --- Distances ---
  const distanceY1 = section1.offsetTop - section0.offsetTop;
  const distanceY2 = section2.offsetTop - section1.offsetTop;
  const distanceY3 = section3.offsetTop - section2.offsetTop;

  // --- Horizontal shift for section1 ---
  const rightCol1 = section1.querySelector(".right");
  const targetX1 =
    rightCol1.getBoundingClientRect().left -
    watch.getBoundingClientRect().left +
    -100;

  const targetX2 =
    ((section2.getBoundingClientRect().left + section2.getBoundingClientRect().right) / 2) -
    ((watch.getBoundingClientRect().left + watch.getBoundingClientRect().right) / 2);


  // Step 0: Intro zoom (before scroll animation kicks in)
  gsap.from("#watch", {
    scale: 0.2,      
    opacity: 0,       // fade in
    duration: 1.5,    // animation length
    ease: "power2.out"
  });

  // --- Timeline controlled by ScrollTrigger ---
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#section0",
      start: "top top",
      end: () => "+=" + (distanceY1 + distanceY2 + distanceY3), // whole scroll distance
      scrub: true,
      // markers: true
    }
  });

  // Step 1: move from section0 → section1
  tl.to("#watch", {
    x: targetX1,
    y: distanceY1,
    rotation: 90,
    ease: "none"
  });

  // Step 2: move from section1 → section2
  tl.to("#watch", {
    x: targetX2,
    y: "+=" + distanceY2,
    rotation: 0,
    ease: "none"
  });


  // Step 3: move from section2 → section3
  tl.to("#watch", {
    // x: targetX2,
    y: "+=" + distanceY3,
    width: "250px",
    height: "250px",
    ease: "none"
  });
});
