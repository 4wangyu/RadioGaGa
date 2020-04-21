//#region Particles
tsParticles.load("tsparticles", {
  fps_limit: 60,
  interactivity: {
    detect_on: "canvas",
    events: {
      onclick: { enable: true, mode: "repulse" },
      onhover: {
        enable: true,
        mode: "bubble",
        parallax: { enable: false, force: 60, smooth: 10 },
      },
      resize: true,
    },
    modes: {
      bubble: { distance: 400, duration: 2, opacity: 0.8, size: 40, speed: 3 },
      grab: { distance: 400, line_linked: { opacity: 1 } },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
      repulse: { distance: 200, duration: 0.4 },
    },
  },
  particles: {
    color: { value: "random" },
    line_linked: {
      color: "random",
      distance: 150,
      enable: true,
      opacity: 0.4,
      width: 3,
    },
    move: {
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
      bounce: false,
      direction: "none",
      enable: true,
      out_mode: "out",
      random: false,
      speed: 3,
      straight: false,
    },
    number: { density: { enable: true, value_area: 800 }, value: 100 },
    opacity: {
      anim: { enable: true, opacity_min: 0.5, speed: 1, sync: false },
      random: false,
      value: 1,
    },
    shape: {
      character: [
        {
          fill: true,
          font: "Font Awesome 5 Brands",
          style: "",
          value: ["\uf179", "\uf38b", "\uf3b9", "\uf13b", "\uf1cb"],
          weight: "400",
        },
        {
          fill: true,
          font: "Font Awesome 5 Free",
          style: "",
          value: ["\uf06a", "\uf7ba", "\uf3ed", "\uf55f", "\uf013"],
          weight: "900",
        },
      ],
      image: {
        height: 100,
        replace_color: true,
        src: "images/github.svg",
        width: 100,
      },
      polygon: { nb_sides: 5 },
      stroke: { color: "#ffffff", width: 1 },
      type: "char",
    },
    size: {
      anim: { enable: true, size_min: 10, speed: 10, sync: false },
      random: false,
      value: 16,
    },
  },
  polygon: {
    draw: { enable: false, lineColor: "#ffffff", lineWidth: 0.5 },
    move: { radius: 10 },
    scale: 1,
    type: "none",
    url: "",
  },
  retina_detect: true,
});
//#endregion

//#region Radio
var audio = document.getElementById("audio");
var audioSrc =
  "https://radiogaga-server.df.r.appspot.com/bruni/outputlist.m3u8";
var hls = new Hls();
hls.loadSource(audioSrc);
hls.attachMedia(audio);
var audioControl = document.getElementById("power");

function playPause() {
  if (audioControl.checked) {
    audio.play();
  } else {
    audio.pause();
  }
}
//#endregion

//#region Click effect
function updateCoords(e) {
  (pointerX =
    (e.clientX || e.touches[0].clientX) -
    canvasEl.getBoundingClientRect().left),
    (pointerY =
      e.clientY || e.touches[0].clientY - canvasEl.getBoundingClientRect().top);
}
function setParticuleDirection(e) {
  var t = (anime.random(0, 360) * Math.PI) / 180,
    a = anime.random(50, 180),
    n = [-1, 1][anime.random(0, 1)] * a;
  return {
    x: e.x + n * Math.cos(t),
    y: e.y + n * Math.sin(t),
  };
}
function createParticule(e, t) {
  var a = {};
  return (
    (a.x = e),
    (a.y = t),
    (a.color = colors[anime.random(0, colors.length - 1)]),
    (a.radius = anime.random(16, 32)),
    (a.endPos = setParticuleDirection(a)),
    (a.draw = function () {
      ctx.beginPath(),
        ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0),
        (ctx.fillStyle = a.color),
        ctx.fill();
    }),
    a
  );
}
function createCircle(e, t) {
  var a = {};
  return (
    (a.x = e),
    (a.y = t),
    (a.color = "#F00"),
    (a.radius = 0.1),
    (a.alpha = 0.5),
    (a.lineWidth = 6),
    (a.draw = function () {
      (ctx.globalAlpha = a.alpha),
        ctx.beginPath(),
        ctx.arc(a.x, a.y, a.radius, 0, 2 * Math.PI, !0),
        (ctx.lineWidth = a.lineWidth),
        (ctx.strokeStyle = a.color),
        ctx.stroke(),
        (ctx.globalAlpha = 1);
    }),
    a
  );
}
function renderParticule(e) {
  for (var t = 0; t < e.animatables.length; t++) e.animatables[t].target.draw();
}
function animateParticules(e, t) {
  for (var a = createCircle(e, t), n = [], i = 0; i < numberOfParticules; i++)
    n.push(createParticule(e, t));
  anime
    .timeline()
    .add({
      targets: n,
      x: function (e) {
        return e.endPos.x;
      },
      y: function (e) {
        return e.endPos.y;
      },
      radius: 0.1,
      duration: anime.random(1200, 1800),
      easing: "easeOutExpo",
      update: renderParticule,
    })
    .add({
      targets: a,
      radius: anime.random(80, 160),
      lineWidth: 0,
      alpha: {
        value: 0,
        easing: "linear",
        duration: anime.random(600, 800),
      },
      duration: anime.random(1200, 1800),
      easing: "easeOutExpo",
      update: renderParticule,
      offset: 0,
    });
}
function debounce(fn, delay) {
  var timer;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}
var canvasEl = document.querySelector(".fireworks");
if (canvasEl) {
  var ctx = canvasEl.getContext("2d"),
    numberOfParticules = 30,
    pointerX = 0,
    pointerY = 0,
    tap = "mousedown",
    colors = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"],
    setCanvasSize = debounce(function () {
      (canvasEl.width = 2 * window.innerWidth),
        (canvasEl.height = 2 * window.innerHeight),
        (canvasEl.style.width = window.innerWidth + "px"),
        (canvasEl.style.height = window.innerHeight + "px"),
        canvasEl.getContext("2d").scale(2, 2);
    }, 500),
    render = anime({
      duration: 1 / 0,
      update: function () {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      },
    });
  document.addEventListener(
    tap,
    function (e) {
      "sidebar" !== e.target.id &&
        "toggle-sidebar" !== e.target.id &&
        "A" !== e.target.nodeName &&
        "IMG" !== e.target.nodeName &&
        (render.play(), updateCoords(e), animateParticules(pointerX, pointerY));
    },
    !1
  ),
    setCanvasSize(),
    window.addEventListener("resize", setCanvasSize, !1);
}
//#endregion
