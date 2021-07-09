const hamburger = document.getElementById("hover_hamburger");
const other_hamburger = document.getElementById("other_hover_hamburger");
const side_bar = document.getElementById("side_bar");
const overlay = document.getElementById("overlay");

other_hamburger.addEventListener("click", () => {
  side_bar.classList.toggle("show");
  overlay.classList.toggle("show");
  hamburger.classList.toggle("show");
});

hamburger.addEventListener("click", () => {
  side_bar.classList.toggle("show");
  overlay.classList.toggle("show");
  hamburger.classList.toggle("show");
});

overlay.addEventListener("click", () => {
  side_bar.classList.remove("show");
  overlay.classList.remove("show");
  hamburger.classList.toggle("show");
});
