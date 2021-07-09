var start_date = document.getElementById("start_date");
var next_date = document.getElementById("end_date");

start_date.addEventListener("change", function () {
  // next_date= (start_date.value + 365)
  var end_date = new Date(start_date.value);
  end_date.setDate(end_date.getDate() + 364);

  var month = end_date.getUTCMonth() + 1; //months from 1-12
  var day = end_date.getUTCDate();
  var year = end_date.getUTCFullYear();

  if (month < 10) {
    month = "0" + month;
  } else {
    month = month;
  }

  if (day < 10) {
    day = "0" + day;
  } else {
    day = day;
  }

  var newdate = year + "-" + month + "-" + day;
  next_date.value = newdate;
});
