let basic_premium_main = document.getElementById("basic_prem");
let PHCF = document.getElementById("PHCF");
let levy = document.getElementById("levy");
let stampDuty = document.getElementById("stampDuty");

var com_rate = document.getElementById("com_rate");
var com_amount = document.getElementById("com_amount");
var com_amount_poa = document.getElementById("com_amount_poa");

var overide_rate = document.getElementById("overide_rate");
var overide_amount = document.getElementById("overide_amount");
var overide_amount_poa = document.getElementById("overide_amount_poa");

var special_discount = document.getElementById("special_discount");
var special_discount_poa = document.getElementById("special_discount_poa");

var net_premium_poa = document.getElementById("net_premium_poa");
var payment_due_poa = document.getElementById("payment_due_poa");
var net_premium_poa = document.getElementById("net_premium_poa");
var payment_due_poa = document.getElementById("payment_due_poa");

let phcf_poa = PHCF.value;
let levy_poa = levy.value;
let stampDuty_poa = stampDuty.value;
let basic_premium_poa = basic_premium_main.value;

let phcf_clean = phcf_poa.replace(/,/g, "");
let levy_clean = levy_poa.replace(/,/g, "");
let stampDuty_clean = stampDuty_poa.replace(/,/g, "");
let basic_premium_clean = basic_premium_poa.replace(/,/g, "");

if (phcf_clean == "") {
  phcf_clean = 0;
}
if (levy_clean == "") {
  levy_clean = 0;
}
if (stampDuty_clean == "") {
  stampDuty_clean = 0;
}
if (basic_premium_clean == "") {
  basic_premium_clean = 0;
}

/////////////////////////////////////////////////////////////////////////
//////////////////CALC RATE CALCULATIONS CODE REFRESH////////////////////
/////////////////////////////////////////////////////////////////////////
let new_com_amount = basic_premium_clean * (com_rate.value / 100);

com_amount.value = "0";

let whole_cash = Math.round(new_com_amount);
var new_cash = whole_cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
com_amount.value = "Kshs " + new_cash;
com_amount_poa.value = whole_cash;
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
////////////////OVVERIDE RATE CALCULATIONS CODE REFRESH//////////////////
/////////////////////////////////////////////////////////////////////////
let new_ovr_amount = basic_premium_clean * (overide_rate.value / 100);

overide_amount.value = "0";

let whole_cash_new = Math.round(new_ovr_amount);
var new_cash = whole_cash_new.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
overide_amount.value = "Kshs " + new_cash;
overide_amount_poa.value = whole_cash_new;
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////
////////////////SPECIAL DISC CALCULATIONS CODE REFRESH//////////////////
/////////////////////////////////////////////////////////////////////////
var cash = special_discount.value;
var clean_up = cash.replace("Kshs ", "");
var clean_up2 = clean_up
  .replace(/,/g, "")
  .replace("N", "")
  .replace("NaN", "")
  .replace("n", "")
  .replace("E", "")
  .replace("e", "")
  .replace("A", "")
  .replace("a", "")
  .replace("Q", "")
  .replace("q", "");

if (clean_up2 == "") {
  special_discount.value = "";
  special_discount_poa.value = "0";
} else {
  var no_Nans = clean_up2.replace("NaN", "");
  var no_zeros = parseInt(no_Nans);
  var new_cash = no_zeros.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  special_discount.value = "Kshs " + new_cash;
  special_discount_poa.value = no_zeros;
}
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
//////////////////NET CALCULATIONS CODE REFRESH//////////////////////////
/////////////////////////////////////////////////////////////////////////

var comm_cash2 = com_amount_poa.value;
if (comm_cash2 == "") {
  comm_cash2 = 0;
}
var over_cash2 = overide_amount_poa.value;
if (over_cash2 == "") {
  over_cash2 = 0;
}
var special_cash2 = special_discount_poa.value;
if (special_cash2 == "") {
  special_cash2 = 0;
}

var totals =
  parseInt(comm_cash2) + parseInt(over_cash2) + parseInt(special_cash2);

var net_prem = basic_premium_clean - totals;
var new_cash = net_prem.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
net_premium.value = "Kshs " + new_cash;
net_premium_poa.value = net_prem;

let total_premiums =
  parseInt(phcf_clean) + parseInt(levy_clean) + parseInt(stampDuty_clean);

let pend_due = net_prem + total_premiums;
var new_cash = pend_due.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
payment_due.value = "Kshs " + new_cash;
payment_due_poa.value = pend_due;
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

function calc_rate(basic_premium) {
  let new_com_amount = basic_premium * (com_rate.value / 100);

  com_amount.value = "0";
  net_premium.value = "0";

  let whole_cash = Math.round(new_com_amount);
  var new_cash = whole_cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  com_amount.value = "Kshs " + new_cash;
  com_amount_poa.value = whole_cash;

  ///////////////////////////////////////////////////////////
  let phcf_poa = PHCF.value;
  let levy_poa = levy.value;
  let stampDuty_poa = stampDuty.value;

  let phcf_clean = phcf_poa.replace(/,/g, "");
  let levy_clean = levy_poa.replace(/,/g, "");
  let stampDuty_clean = stampDuty_poa.replace(/,/g, "");
  if (phcf_clean == "") {
    phcf_clean = 0;
  }
  if (levy_clean == "") {
    levy_clean = 0;
  }
  if (stampDuty_clean == "") {
    stampDuty_clean = 0;
  }

  var comm_cash2 = com_amount_poa.value;
  if (comm_cash2 == "") {
    comm_cash2 = 0;
  }
  var over_cash2 = overide_amount_poa.value;
  if (over_cash2 == "") {
    over_cash2 = 0;
  }
  var special_cash2 = special_discount_poa.value;
  if (special_cash2 == "") {
    special_cash2 = 0;
  }

  var totals =
    parseInt(comm_cash2) + parseInt(over_cash2) + parseInt(special_cash2);

  var net_prem = basic_premium - totals;
  var new_cash = net_prem.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  net_premium.value = "Kshs " + new_cash;
  net_premium_poa.value = net_prem;

  let total_premiums =
    parseInt(phcf_clean) + parseInt(levy_clean) + parseInt(stampDuty_clean);
  console.log(total_premiums);

  let pend_due = net_prem + total_premiums;
  var new_cash = pend_due.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  payment_due.value = "Kshs " + new_cash;
  payment_due_poa.value = pend_due;
}

function calc_ovr(basic_premium) {
  let new_ovr_amount = basic_premium * (overide_rate.value / 100);

  overide_amount.value = "0";
  net_premium.value = "0";

  let whole_cash = Math.round(new_ovr_amount);
  var new_cash = whole_cash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  overide_amount.value = "Kshs " + new_cash;
  overide_amount_poa.value = whole_cash;

  ///////////////////////////////////////////////////////////
  let phcf_poa = PHCF.value;
  let levy_poa = levy.value;
  let stampDuty_poa = stampDuty.value;

  let phcf_clean = phcf_poa.replace(/,/g, "");
  let levy_clean = levy_poa.replace(/,/g, "");
  let stampDuty_clean = stampDuty_poa.replace(/,/g, "");
  if (phcf_clean == "") {
    phcf_clean = 0;
  }
  if (levy_clean == "") {
    levy_clean = 0;
  }
  if (stampDuty_clean == "") {
    stampDuty_clean = 0;
  }

  var comm_cash2 = com_amount_poa.value;
  if (comm_cash2 == "") {
    comm_cash2 = 0;
  }
  var over_cash2 = overide_amount_poa.value;
  if (over_cash2 == "") {
    over_cash2 = 0;
  }
  var special_cash2 = special_discount_poa.value;
  if (special_cash2 == "") {
    special_cash2 = 0;
  }

  var totals =
    parseInt(comm_cash2) + parseInt(over_cash2) + parseInt(special_cash2);

  var net_prem = basic_premium - totals;
  var new_cash = net_prem.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  net_premium.value = "Kshs " + new_cash;
  net_premium_poa.value = net_prem;

  let total_premiums =
    parseInt(phcf_clean) + parseInt(levy_clean) + parseInt(stampDuty_clean);
  console.log(total_premiums);

  let pend_due = net_prem + total_premiums;
  var new_cash = pend_due.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  payment_due.value = "Kshs " + new_cash;
  payment_due_poa.value = pend_due;
}

function special_disc(basic_premium) {
  var cash = special_discount.value;
  var clean_up = cash.replace("Kshs ", "");
  var clean_up2 = clean_up
    .replace(/,/g, "")
    .replace("N", "")
    .replace("NaN", "")
    .replace("n", "")
    .replace("E", "")
    .replace("e", "")
    .replace("A", "")
    .replace("a", "")
    .replace("Q", "")
    .replace("q", "");

  if (clean_up2 == "") {
    special_discount.value = "";
    special_discount_poa.value = "0";
  } else {
    var no_Nans = clean_up2.replace("NaN", "");
    var no_zeros = parseInt(no_Nans);
    var new_cash = no_zeros.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    special_discount.value = "Kshs " + new_cash;
    special_discount_poa.value = no_zeros;
  }
  //////////////////////////////////////////////////////////////////
  let phcf_poa = PHCF.value;
  let levy_poa = levy.value;
  let stampDuty_poa = stampDuty.value;

  let phcf_clean = phcf_poa.replace(/,/g, "");
  let levy_clean = levy_poa.replace(/,/g, "");
  let stampDuty_clean = stampDuty_poa.replace(/,/g, "");
  if (phcf_clean == "") {
    phcf_clean = 0;
  }
  if (levy_clean == "") {
    levy_clean = 0;
  }
  if (stampDuty_clean == "") {
    stampDuty_clean = 0;
  }

  net_premium.value = "0";
  var comm_cash2 = com_amount_poa.value;
  if (comm_cash2 == "") {
    comm_cash2 = 0;
  }
  var over_cash2 = overide_amount_poa.value;
  if (over_cash2 == "") {
    over_cash2 = 0;
  }
  var special_cash2 = special_discount_poa.value;
  if (special_cash2 == "") {
    special_cash2 = 0;
  }

  var totals =
    parseInt(comm_cash2) + parseInt(over_cash2) + parseInt(special_cash2);

  var net_prem = basic_premium - totals;
  var new_cash = net_prem.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  net_premium.value = "Kshs " + new_cash;
  net_premium_poa.value = net_prem;

  let total_premiums =
    parseInt(phcf_clean) + parseInt(levy_clean) + parseInt(stampDuty_clean);
  console.log(total_premiums);

  let pend_due = net_prem + total_premiums;
  var new_cash = pend_due.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  payment_due.value = "Kshs " + new_cash;
  payment_due_poa.value = pend_due;
}
