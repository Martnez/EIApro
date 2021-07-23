let payment_making = document.getElementById("payment_making");
let payment_pending = document.getElementById("payment_pending");

let clean_pending = payment_pending.innerText.replace("Kshs ", "");
let clean_pending2 = clean_pending.replace(/,/g, "");

if (clean_pending2 == "0" || clean_pending2 < "0") {
  payment_making.style.display = "none";
} else {
  payment_making.style.display = "flex";
}
