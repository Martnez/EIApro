//////////////////////////////////////////////////////////
// COVER TYPE CODE STATEMENT
/////////////////////////////////////////////////////////
var cover = document.getElementById("cover_type");
var sum_insured = document.getElementById("sum_insured_input");
var sum_insured_poa = document.getElementById("sum_insured_poa");
var rate = document.getElementById("rate_input");
var policy_remarks = document.getElementById("policy_remarks");
var benefits_list = document.getElementById("benefits_list");
var sum_insured_label = document.getElementById("sum_insured_label");

var basic_prem = document.getElementById("basic_prem");
var basic_prem_poa = document.getElementById("basic_prem_poa");
var sum_insured_holder = document.getElementById("sum_insured_holder");
var rate_holder = document.getElementById("rate_holder");

if (
  cover.options[cover.selectedIndex].value == "" ||
  cover.options[cover.selectedIndex].value == "Comprehensive" ||
  cover.options[cover.selectedIndex].value == "Third Party Fire and Theft"
) {
  rate.style.display = "initial";
  rate.required = true;
  rate_holder.style.display = "flex";
  policy_remarks.rows = "10";
  policy_remarks.style.maxHeight = "140px";
  sum_insured_holder.style.display = "flex";
  sum_insured.required = true;
  sum_insured_poa.required = true;
} else {
  rate.style.display = "none";
  rate_holder.style.display = "none";
  rate.required = false;
  policy_remarks.rows = "8";
  policy_remarks.style.maxHeight = "175px";
  sum_insured_holder.style.display = "none";
  sum_insured.required = false;
  sum_insured_poa.required = false;

  // if (sum_insured_label != null) {
  //   sum_insured_label.innerHTML = "Basic Premium";
  // }
}

cover.addEventListener("change", function () {
  if (
    cover.options[cover.selectedIndex].value == "" ||
    cover.options[cover.selectedIndex].value == "Comprehensive" ||
    cover.options[cover.selectedIndex].value == "Third Party Fire and Theft"
  ) {
    rate.style.display = "initial";
    rate.required = true;
    rate_holder.style.display = "flex";
    policy_remarks.rows = "20";
    policy_remarks.style.maxHeight = "140px";
    sum_insured_holder.style.display = "flex";
    sum_insured.required = true;
    sum_insured_poa.required = true;
  } else {
    rate.style.display = "none";
    rate_holder.style.display = "none";
    rate.required = false;
    policy_remarks.rows = "12";
    policy_remarks.style.maxHeight = "175px";
    sum_insured_holder.style.display = "none";
    sum_insured.required = false;
    sum_insured_poa.required = false;
  }
});

// if (
//   cover.options[cover.selectedIndex].value == "" ||
//   cover.options[cover.selectedIndex].value == "Comprehensive"
// ) {
//   benefits_list.style.display = "flex";
// } else {
//   benefits_list.style.display = "none";
// }

// cover.addEventListener("change", function () {
//   if (
//     cover.options[cover.selectedIndex].value == "" ||
//     cover.options[cover.selectedIndex].value == "Comprehensive"
//   ) {
//     benefits_list.style.display = "flex";
//   } else {
//     benefits_list.style.display = "none";
//   }
// });

//////////////////////////////////////////////////////////
// CASH CONCUTINATION JS
/////////////////////////////////////////////////////////
cashConcut();
function cashConcut() {
  var cash = sum_insured.value;
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
    sum_insured.value = "";
    sum_insured_poa.value = 0;
  } else {
    var no_Nans = clean_up2.replace("NaN", "");
    // var no_zeros = parseInt(no_Nans);
    var new_cash = no_Nans.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    sum_insured.value = "Kshs " + new_cash;
    sum_insured_poa.value = no_Nans;
  }
}

basicPremConcut();
function basicPremConcut() {
  var cash = basic_prem.value;
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
    basic_prem.value = "";
    basic_prem_poa.value = 0;
  } else {
    var no_Nans = clean_up2.replace("NaN", "");
    // var no_zeros = parseInt(no_Nans);
    var new_cash = no_Nans.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    basic_prem.value = "Kshs " + new_cash;
    basic_prem_poa.value = no_Nans;
  }
}

//////////////////////////////////////////////////////////
// MV CLASS SELECTION CODE STATEMENT
/////////////////////////////////////////////////////////
var mv_class = document.getElementById("class_selection");
var selected = mv_class.options[mv_class.selectedIndex].value;

var benefits_list = document.getElementById("benefits_list");

if (mv_class.options[mv_class.selectedIndex].value == "") {
  benefits_list.style.display = "none";
} else {
  benefits_list.style.display = "flex";
}

mv_class.addEventListener("change", function () {
  if (mv_class.options[mv_class.selectedIndex].value == "") {
    benefits_list.style.display = "none";
  } else if (
    cover.options[cover.selectedIndex].value == "Third Party Fire and Theft" ||
    cover.options[cover.selectedIndex].value == "Third Party"
  ) {
    benefits_list.style.display = "none";
  } else {
    benefits_list.style.display = "flex";
  }
});

//////////////////////////////////////////////////////////
// MV CLASSSELECTIONCODE STATEMENT
/////////////////////////////////////////////////////////

var ep = document.getElementById("excess_protector");
var ep_basic_premium = document.getElementById("ep_basic_premium");
var pll = document.getElementById("pll");
var pll_benefit_basic_premium = document.getElementById(
  "pll_benefit_basic_premium"
);
var rescue_benefit = document.getElementById("rescue_benefit");
var rescue_benefit_basic_premium = document.getElementById(
  "rescue_benefit_basic_premium"
);
var pvt = document.getElementById("pvt");
var pvt_basic_premium = document.getElementById("pvt_basic_premium");
var windscreen_benefit = document.getElementById("windscreen_benefit");
var windscreen_benefit_basic_premium = document.getElementById(
  "windscreen_benefit_basic_premium"
);
var personal_accident = document.getElementById("personal_accident");
var personal_accident_basic_premium = document.getElementById(
  "personal_accident_basic_premium"
);
var loss_of_use = document.getElementById("loss_of_use");
var loss_of_use_basic_premium = document.getElementById(
  "loss_of_use_basic_premium"
);

// if (ep.checked) {
//   ep_basic_premium.disabled = false;
//   ep_basic_premium.required = true;
// } else {
//   ep_basic_premium.disabled = true;
//   ep_basic_premium.required = true;
// }
// ep.addEventListener("change", function () {
//   if (ep.checked) {
//     ep_basic_premium.disabled = false;
//     ep_basic_premium.required = true;
//   } else {
//     ep_basic_premium.disabled = true;
//     ep_basic_premium.required = true;
//   }
// });
//////////////////////////////////////////
// if (windscreen_benefit.checked) {
//   windscreen_benefit_basic_premium.disabled = false;
//   windscreen_benefit_basic_premium.required = true;
// } else {
//   windscreen_benefit_basic_premium.disabled = true;
//   windscreen_benefit_basic_premium.required = false;
// }
// windscreen_benefit.addEventListener("change", function () {
//   if (windscreen_benefit.checked) {
//     windscreen_benefit_basic_premium.disabled = false;
//     windscreen_benefit_basic_premium.required = true;
//   } else {
//     windscreen_benefit_basic_premium.disabled = true;
//     windscreen_benefit_basic_premium.required = false;
//   }
// });
// ///////////////////////////////////////////////
// if (pvt.checked) {
//   pvt_basic_premium.disabled = false;
//   pvt_basic_premium.required = true;
// } else {
//   pvt_basic_premium.disabled = true;
//   pvt_basic_premium.required = false;
// }
// pvt.addEventListener("change", function () {
//   if (pvt.checked) {
//     pvt_basic_premium.disabled = false;
//     pvt_basic_premium.required = true;
//   } else {
//     pvt_basic_premium.disabled = true;
//     pvt_basic_premium.required = false;
//   }
// });
// ///////////////////////////////////////////////////
// if (rescue_benefit.checked) {
//   rescue_benefit_basic_premium.disabled = false;
//   rescue_benefit_basic_premium.required = true;
// } else {
//   rescue_benefit_basic_premium.disabled = true;
//   rescue_benefit_basic_premium.required = false;
// }
// rescue_benefit.addEventListener("change", function () {
//   if (rescue_benefit.checked) {
//     rescue_benefit_basic_premium.disabled = false;
//     rescue_benefit_basic_premium.required = true;
//   } else {
//     rescue_benefit_basic_premium.disabled = true;
//     rescue_benefit_basic_premium.required = false;
//   }
// });
// ///////////////////////////////////////////////////
// if (pll.checked) {
//   pll_benefit_basic_premium.disabled = false;
//   pll_benefit_basic_premium.required = true;
// } else {
//   pll_benefit_basic_premium.disabled = true;
//   pll_benefit_basic_premium.required = false;
// }
// pll.addEventListener("change", function () {
//   if (pll.checked) {
//     pll_benefit_basic_premium.disabled = false;
//     pll_benefit_basic_premium.required = true;
//   } else {
//     pll_benefit_basic_premium.disabled = true;
//     pll_benefit_basic_premium.required = false;
//   }
// });
// //////////////////////////////////////////////////////
// if (personal_accident.checked) {
//   personal_accident_basic_premium.disabled = false;
//   personal_accident_basic_premium.required = true;
// } else {
//   personal_accident_basic_premium.disabled = true;
//   personal_accident_basic_premium.required = false;
// }
// personal_accident.addEventListener("change", function () {
//   if (personal_accident.checked) {
//     personal_accident_basic_premium.disabled = false;
//     personal_accident_basic_premium.required = true;
//   } else {
//     personal_accident_basic_premium.disabled = true;
//     personal_accident_basic_premium.required = false;
//   }
// });
// /////////////////////////////////////////////////////
// if (loss_of_use.checked) {
//   loss_of_use_basic_premium.disabled = false;
//   loss_of_use_basic_premium.required = true;
// } else {
//   loss_of_use_basic_premium.disabled = true;
//   loss_of_use_basic_premium.required = false;
// }
// loss_of_use.addEventListener("change", function () {
//   if (loss_of_use.checked) {
//     loss_of_use_basic_premium.disabled = false;
//     loss_of_use_basic_premium.required = true;
//   } else {
//     loss_of_use_basic_premium.disabled = true;
//     loss_of_use_basic_premium.required = false;
//   }
// });
