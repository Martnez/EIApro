const date_value = document.getElementById("date_value");

var today = new Date();
var date =
  +today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
var time = today.getHours() + ":" + today.getMinutes();

var day = today.getDay();
var hours = today.getHours();
var minutes = today.getMinutes();
var ampm = hours >= 12 ? "PM" : "AM";
hours = hours % 12;
hours = hours ? hours : 12; // the hour '0' should be '12'
minutes = minutes < 10 ? "0" + minutes : minutes;
var strTime = hours + ":" + minutes + " " + ampm;

if (day == 0) {
  day = "Sun";
} else if (day == 1) {
  day = "Mon";
} else if (day == 2) {
  day = "Tue";
} else if (day == 3) {
  day = "Wed";
} else if (day == 4) {
  day = "Thur";
} else if (day == 5) {
  day = "Fri";
} else if (day == 6) {
  day = "Sat";
}

date_value.innerHTML = strTime + " " + day + "   " + date;
