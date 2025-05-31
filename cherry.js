gsap.registerPlugin(ScrollTrigger, TextPlugin, SplitText);

gsap.from(".div1", {
  backgroundColor: "#111",
  duration: 3,
  borderRadius: "80%",
});

gsap.to(".div5" , {
  
  duration: 3,
 borderTopLeftRadius: "80px",
  borderTopRightRadius: "80px",
});

gsap.to(".div4" , {
  
  duration: 3,
 borderTopLeftRadius: "80px",
  borderTopRightRadius: "80px",
});

gsap.from(".div3" , {
  backgroundColor: " #0b3026",
  duration: 3,
 

});

function animateSquareText(squareSelector, divSelector) {
  gsap.fromTo(
    squareSelector,
    { opacity: 0, y: 50, immediateRender: false },
    {
      delay: 3,
      opacity: 1,
      y: 0,
      duration: 3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: divSelector,
        start: "top 100%",
        toggleActions: "play none none none",
        once: true,
      },
    }
  );
}

animateSquareText(".square3", ".div3");
animateSquareText(".square4", ".div4");
animateSquareText(".square5", ".div5");

// Animate first square
gsap.from(".square1", {
  scrollTrigger: {
    trigger: ".div1",
    start: "top center",
    toggleActions: "play none none none",
  },
  delay: 1,
  y: 100,
  opacity: 0,
  duration: 3,
  ease: "power3.out",
});

// Scale effect for .div1
gsap.to(".square1", {
  scale: 2.5,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".div1",
    start: "top top",
    end: "bottom top",
    scrub: true,
    pin: true,
    anticipatePin: 1,
  },
});

// Animate .fixed-text in div2
gsap.fromTo(
  ".div2 .fixed-text",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 3,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".div2",
      start: "top center",
      toggleActions: "play none none none",
    },
  }
);

gsap.registerPlugin(ScrollTrigger);

const horizontalWrapper = document.querySelector(".div2 .horizontal-wrapper");
const images = horizontalWrapper.querySelectorAll("img");
const totalImages = images.length;

// Set wrapper and images CSS
gsap.set(horizontalWrapper, {
  position: "relative",
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
});
images.forEach((img, i) => {
  gsap.set(img, {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    objectFit: "cover",
    transformOrigin: "center center",
    scale: i === 0 ? 1 : 0, // first image visible, others hidden (scale 0)
    opacity: i === 0 ? 1 : 0, // first visible, others hidden
    zIndex: totalImages - i, // higher index on top
  });
});

const scrollLength = window.innerHeight * (totalImages - 1);

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".div2",
    start: "top top",
    end: () => "+=" + scrollLength,
    scrub: true,
    pin: true,
  },
});

for (let i = 0; i < totalImages - 1; i++) {
  // Zoom next image from 0 → 1 scale and fade opacity 0 → 1
  tl.to(images[i + 1], { scale: 1, opacity: 1, ease: "none" }, i);

  // Fade out previous image (opacity 1 → 0) and scale down to 0.8 for smooth vanish
  tl.to(images[i], { scale: 5, opacity: 0, ease: "none" }, i);
}

// === THE KEY FIX: overlay div3 AFTER horizontal scroll of div2 ===
ScrollTrigger.create({
  trigger: ".div3",
  start: "top top",
  end: "+=100%",
  pin: true,
  pinSpacing: false,
  scrub: true,
  // This makes sure the overlay appears only *after* div2 scroll ends
  onEnter: () => {
    document.querySelector(".div3").style.zIndex = 5;
  },
});

// Optional fade-in overlay between div2 and div3
const overlay = document.createElement("div");
overlay.classList.add("overlay-fade");
document.querySelector(".div2").appendChild(overlay);

gsap.to(overlay, {
  scrollTrigger: {
    trigger: ".div3",
    start: "top bottom",
    end: "top top",
    scrub: true,
  },
  backgroundColor: "rgba(0,0,0,0.4)",
});

// === Continue pin overlays for .div4 and .div5 as before ===
[".div4", ".div5"].forEach((selector) => {
  const section = document.querySelector(selector);
  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "+=100%",
    pin: true,
    pinSpacing: false,
    scrub: true,
  });

  const overlay = document.createElement("div");
  overlay.classList.add("overlay-fade");
  section.previousElementSibling.appendChild(overlay);

  gsap.to(overlay, {
    scrollTrigger: {
      trigger: section,
      start: "top bottom",
      end: "top top",
      scrub: true,
    },
    backgroundColor: "rgba(0,0,0,0.4)",
  });
});








 const heart = document.querySelector(".bi-heart-fill");

  // Animate heart when scrolling after div5
  gsap.to(heart, {
    scale: 1,
    opacity: 1,
    scrollTrigger: {
      trigger: ".div5",
      start: "bottom bottom",
      end: "+=300",
      scrub: true
    },
    ease: "power2.out",
    transformOrigin: "50% 50%"
  });
