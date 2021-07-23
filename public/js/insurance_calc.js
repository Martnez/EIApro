//INPUT VARIABLES
let sum_insured = document.getElementById("sum_insured");
let basic_prem_rate = document.getElementById("basic_prem_rate");
let basic_prem_amount = document.getElementById("basic_prem_amount");
let phcf = document.getElementById("phcf");
let training_levy = document.getElementById("training_levy");
let comm_rate = document.getElementById("comm_rate");
let comm_amount = document.getElementById("comm_amount");
let special_discount = document.getElementById("special_discount");
let net_premium = document.getElementById("net_premium");
let loading_prem_amount = document.getElementById("loading_prem_amount");
let total_prem_amount = document.getElementById("total_prem_amount");
let basic_total_new = document.getElementById("basic_total_new");

//BENEFITS & GLOBAL VARIABLES
let exPro = document.getElementById("exPro").value;
let poliTe = document.getElementById("poliTe").value;
let perAcc = document.getElementById("perAcc").value;
let lossOfUse = document.getElementById("lossOfUse").value;
let pll = document.getElementById("pll").value;
let rescueBenefit = document.getElementById("rescueBenefit").value;
let windscreen = document.getElementById("windscreen").value;
let pvt = document.getElementById("pvt").value;
let mp = document.getElementById("mp").value;
let pal = document.getElementById("pal").value;
let tpl = document.getElementById("tpl").value;

let phcf_val = document.getElementById("phcf_poa");
let training_levy_val = document.getElementById("training_levy_poa");
let stamp_duty_val = document.getElementById("stamp_duty_poa");
let basic_prem_val = document.getElementById("basic_prem_poa");
let comm_amount_val = document.getElementById("comm_amount_poa");
let special_discount_val = document.getElementById("special_discount_poa");
let net_premium_val = document.getElementById("net_premium_poa");
let total_prem_amount_val = document.getElementById("total_prem_amount_poa");

let phcf_poa = phcf_val.value;
let training_levy_poa = training_levy_val.value;
let stamp_duty_poa = stamp_duty_val.value;
let basic_prem_poa = basic_prem_val.value;
let comm_amount_poa = comm_amount_val.value;
let special_discount_poa = special_discount_val.value;
let net_premium_poa = net_premium_val.value;
let total_prem_amount_poa = total_prem_amount_val.value;

//GLOBAL WORKINGS

if (phcf_poa == "") {
  phcf_poa = 0;
}
if (training_levy_poa == "") {
  training_levy_poa = 0;
}
if (stamp_duty_poa == "") {
  stamp_duty_poa = 0;
}
if (basic_prem_poa == "") {
  basic_prem_poa = 0;
}
if (comm_amount_poa == "") {
  comm_amount_poa = 0;
}
if (special_discount_poa == "") {
  special_discount_poa = 0;
}
if (net_premium_poa == "") {
  net_premium_poa = 0;
}

let total_benefits =
  parseFloat(exPro) +
  parseFloat(poliTe) +
  parseFloat(perAcc) +
  parseFloat(lossOfUse) +
  parseFloat(pll) +
  parseFloat(rescueBenefit) +
  parseFloat(windscreen) +
  parseFloat(pvt) +
  parseFloat(mp) +
  parseFloat(pal) +
  parseFloat(tpl);

let kshs_total_benefits = total_benefits
  .toString()
  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

loading_prem_amount.value = "Kshs " + kshs_total_benefits;

// ON WINDOW LOAD FUNCTION CALLING
basicPremCalc();
special_disc();
///////////////////////////////////////
//Functions Begin here-----
//////////////////////////////////////

function basicPremCalc() {
  let sum_insured_val = sum_insured.value;
  let basic_prem_rate_val = basic_prem_rate.value;

  if (basic_prem_rate_val == "") {
    basic_prem_rate_val = 0;
  }

  let sum_insured_clean = sum_insured_val.replace(/,/g, "");
  let sum_insured_clean2 = sum_insured_clean.replace("Kshs ", "");

  let basic_prem =
    (parseFloat(sum_insured_clean2) * parseFloat(basic_prem_rate_val)) / 100;
  let new_basic_prem = (
    Math.round((basic_prem + Number.EPSILON) * 100) / 100
  ).toFixed(2);

  let basic_total = parseFloat(basic_prem) + parseFloat(total_benefits);
  let basic_total_newer = (
    Math.round((basic_total + Number.EPSILON) * 100) / 100
  ).toFixed(2);

  let kshs_new_basic_prem = new_basic_prem
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  let kshs_basic_total = basic_total_newer
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  /////////////////////////////////////////////////////////////////////////////

  let sub_basic_prem = parseFloat(new_basic_prem) + parseFloat(total_benefits);

  let kshs_sub_basic_prem = sub_basic_prem
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  let phcf_amount = parseFloat(sub_basic_prem) * 0.0025;
  let training_levy_amount = parseFloat(sub_basic_prem) * 0.002;

  let new_phcf_amount = (
    Math.round((phcf_amount + Number.EPSILON) * 100) / 100
  ).toFixed(2);
  let new_training_levy_amount = (
    Math.round((training_levy_amount + Number.EPSILON) * 100) / 100
  ).toFixed(2);

  let kshs_phcf_amount = new_phcf_amount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  let kshs_training_levy_amount = new_training_levy_amount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  let total_basic_prem = (
    parseFloat(basic_prem) +
    parseFloat(phcf_amount) +
    parseFloat(training_levy_amount) +
    parseFloat(stamp_duty_val.value)
  ).toFixed(2);

  let total_basic_prem2 = (
    parseFloat(basic_prem) +
    parseFloat(phcf_amount) +
    parseFloat(training_levy_amount) +
    parseFloat(total_benefits) +
    parseFloat(stamp_duty_val.value)
  ).toFixed(2);

  let kshs_total_basic_prem = total_basic_prem2
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  phcf.value = "Kshs " + kshs_phcf_amount;
  phcf_val.value = new_phcf_amount;
  training_levy.value = "Kshs " + kshs_training_levy_amount;
  training_levy_val.value = new_training_levy_amount;

  let basic_prem_newer = total_basic_prem;
  let better = basic_prem_newer;

  let kshs_basic_prem = better.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  basic_prem_amount.value = "Kshs " + kshs_new_basic_prem;
  basic_prem_val.value = new_basic_prem;

  basic_total_new.value = "Kshs " + kshs_basic_total;

  total_prem_amount.value = "Kshs " + kshs_total_basic_prem;
  total_prem_amount_val.value = total_basic_prem2;

  commRateCalc();
  netPremiumCalc();
}

function commRateCalc() {
  let comm_amt =
    parseFloat(basic_prem_val.value) * parseFloat(comm_rate.value / 100);

  let new_comm_amt = (
    Math.round((comm_amt + Number.EPSILON) * 100) / 100
  ).toFixed(2);

  let kshs_comm_amt = new_comm_amt
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  comm_amount.value = "Kshs " + kshs_comm_amt;
  comm_amount_val.value = new_comm_amt;
  netPremiumCalc();
}

function special_disc() {
  let cash = special_discount.value;
  let clean_up = cash.replace("Kshs ", "");
  let clean_up2 = clean_up
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
    special_discount_val.value = "0";
  } else {
    let no_Nans = clean_up2.replace("NaN", "");
    let no_zeros = no_Nans;
    let new_cash = no_zeros.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    special_discount.value = "Kshs " + new_cash;
    special_discount_val.value = no_zeros;
  }
  netPremiumCalc();
}

function netPremiumCalc() {
  let deductions =
    parseFloat(comm_amount_val.value) + parseFloat(special_discount_val.value);
  let additions =
    parseFloat(phcf_val.value) +
    parseFloat(training_levy_val.value) +
    parseFloat(stamp_duty_val.value);
  let net_prem =
    parseFloat(total_prem_amount_val.value) - parseFloat(deductions);

  let new_net_prem = (
    Math.round((net_prem + Number.EPSILON) * 100) / 100
  ).toFixed(2);

  console.log("total prem is: " + total_prem_amount_val.value);
  console.log("additions are: " + additions);
  console.log("Deductions are: " + deductions);

  let kshs_net_prem = new_net_prem
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  net_premium.value = "Kshs " + kshs_net_prem;
  net_premium_val.value = new_net_prem;
}
