window.setTimeout(() => {
  AOS.init({ offset: 100 });
}, 500);

$(function () {
  $(".address button").on("click", function () {
    const addressEl = $(this).closest(".address").find("span");
    const address = addressEl.text();
    const tempInput = $("<input>");
    $("body").append(tempInput);
    tempInput.val(address).select();
    // Copy the text to the clipboard
    document.execCommand("copy");
    // Remove the temporary input
    tempInput.remove();
    addressEl.addClass("copied");
    setTimeout(() => {
      addressEl.removeClass("copied");
    }, 1000);
  });
});

var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  const elements = document.getElementsByClassName("typewrite");
  for (const element of elements) {
    const toRotate = element.getAttribute("data-type");
    const period = element.getAttribute("data-period");
    if (toRotate) {
      new TxtType(element, JSON.parse(toRotate), period);
    }
  }
};
["#c0", "#c1", "#c2", "#c3"].forEach((item, index) => {
  const canvas = document.querySelector(item);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = index == 0 ? window.innerWidth : 992;
  let height = index == 0 ? 600 : 400;
  canvas.height = index == 1 || index == 2 ? 200 : height;
  let letters =
    "010101010101010101001010101010101010100101010101010101010010101010101010101001010101010101010100101010101010101010010101010101010101001010101010101010";
  letters = letters.split("");
  const fontSize = index == 0 ? 10 : 12,
    columns = canvas.width / fontSize;
  const drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }

  // Setting up the draw function
  function draw() {
    ctx.fillStyle = index == 0 ? "rgba(9, 9, 9, 0.2)" : "rgba(8, 19, 4, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillStyle = "#43ed00";
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      drops[i]++;
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
        drops[i] = 0;
      }
    }
  }

  // Loop the animation
  setInterval(draw, index == 0 ? 100 : 50);
});
