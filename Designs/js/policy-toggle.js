const policy_btn = document.getElementById("policy_btn");
const popup_overlay = document.getElementById("popup_overlay");
const popup_selection = document.getElementById("popup_selection");

policy_btn.addEventListener("click", () => {
  popup_overlay.classList.toggle("show");
  popup_selection.classList.toggle("show");
});
popup_overlay.addEventListener("click", () => {
  popup_overlay.classList.toggle("show");
  popup_selection.classList.toggle("show");
});
popup_selection.addEventListener("click", () => {
  popup_overlay.classList.toggle("show");
  popup_selection.classList.toggle("show");
});
