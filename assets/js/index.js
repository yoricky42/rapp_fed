//_________________TOGGLE NAVBAR MENU MOBILE____________

gsap.registerPlugin(ScrollTrigger)
let tl = gsap.timeline(); //time line of animation of navbar on mobile
tl.to("body", { overflow: "hidden" });
tl.to(".overlay__one", { x: 0, ease: "linear", opacity: 0.7 }, "-=.5");
tl.to(".overlay__two", { x: 0, ease: "linear", opacity: 0.7 }, "-=.2");
tl.to(".navbar-links", { left: 0, ease: "linear" }, "-=.3");
tl.pause(); //pause sequencing

$(".menu-toggler").on("click", () => {
  tl.play(); // show menu
});
$(".close-btn").on("click", () => {
  tl.reverse(); // hide menu
});
$(".overlay").on("click", () => {
  tl.reverse(); // show menu
});

//________________ANNIMATION OF CLASS .animate-text-in-slogant _________________

const slogantLetters = $(".animate-text-in-slogant").text().split(''); //Get letters of element
$(".animate-text-in-slogant").empty(); // empty the element

slogantLetters.forEach((el,i) => { // replace all letter in span for animation
  $(".animate-text-in-slogant").append(`<span class='anim-letter'>${el}</>`)
});

gsap.timeline({repeat:-1,repeatDelay:0}).to(".anim-letter", {
  duration: .5,
  scale: 1.2,
  y: -10,
  ease: "power1.inOut",
  stagger: {
    each:0.1,
    from: "start",
  }
})
.to(".anim-letter", {
  duration: .5,
  scale: 1,
  y: 0,
  ease: "power1.inOut",
  stagger: {
    each:0.1,
    from: "start",
  }
},"-=.5")

var titles = gsap.utils.toArray(".fade-up");

titles.forEach((title) => {
  gsap.from(title, {
    y: 50,
    duration: 1,
    opacity: 0,
    scrollTrigger: {
      trigger: title,
      end: "-=500",
    },
  });
});

var sections = gsap.utils.toArray(".image");

sections.forEach((section) => {
  gsap.from(section, {
    y: 100,
    duration: 1,
    opacity: 0,
    scrollTrigger: {
      trigger: section,
      end: "-=500",
    },
  });
});

gsap.from(".text-message", {
  x: -200,
  duration: 2,
  opacity: 0,
  scrollTrigger: {
    trigger: '.text-message',
    end: "-=500",
  },
});






