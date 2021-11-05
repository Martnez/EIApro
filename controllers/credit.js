const Policies = require("../models/policy");
const Clients = require("../models/Client");
const Vehicles = require("../models/Vehicle");
const Credit = require("../models/creditCollection");
const insurancePayment = require("../models/insurancePayment");
const creditPayment = require("../models/creditPayment");
const Logs = require("../models/Logs");
const Policy = require("../models/policy");

exports.getPayDelete = async (req, res, next) => {
  const user =req.user;
  let today = new Date()
    let month = today.getMonth() + 1;
    let date= today.getDate();
    let year = today.getFullYear();
    let hour = today.getHours();
    let min = today.getMinutes();
    let secs = today.getSeconds();
    const current_date = `${month}/${date}/${year}`;
    const current_time = `${hour}:${min}:${secs}`;
  const payId = req.params.payId;
  const policyId = req.params.policyId;
  const pay = await creditPayment.findOne({ where: { id: payId } });
  const log= new Logs({
    task: `Deleted insurance payment Id: ${payId}`,
    userId: user.id,
    time: current_time,
    date:current_date
    });
      log.save();
  pay.destroy();

  res.redirect(`/insurancePay/${policyId}`);
};
exports.getCollectDelete = async (req, res, next) => {
  const user= req.user;
  let today = new Date()
    let month = today.getMonth() + 1;
    let date= today.getDate();
    let year = today.getFullYear();
    let hour = today.getHours();
    let min = today.getMinutes();
    let secs = today.getSeconds();
    const current_date = `${month}/${date}/${year}`;
    const current_time = `${hour}:${min}:${secs}`;
  const creditId = req.params.creditId;
  const policyId = req.params.policyId;
  const credit = await Credit.findOne({ where: { id: creditId } });
  const log= new Logs({
    task: `Deleted Credit collection Id: ${creditId}`,
    userId: user.id,
    time: current_time,
    date:current_date
    });
      log.save();
  credit.destroy();
  res.redirect(`/credit/${policyId}`);
};
exports.getCredit = (req, res, next) => {
  const policyId = req.params.policyId;
  const user = req.user;
  Policies.findOne({ where: { id: policyId }, include: { model: Clients } })
    .then((policy) => {
      Credit.findAll({
        where: { delete: "0" },
        include: {
          model: Policies,
          where: [{ id: policyId }, { delete: "0" }],
          include: { model: Clients },
        },
      })
        .then((credit) => {
          const firstName = policy.client.firstName;
          const lastName = policy.client.lastName;
          const GrandTotal = policy.GrandTotal + policy.otherCharges;
          const sumInsured = policy.sumInsured;
          const PHCF = policy.PHCF;
          const levy = policy.levy;
          const stampDuty = policy.stampDuty;
          const i = credit.length;
          let t_paid = 0;
          let x = 0;
          for (x = 0; x < i; x++) {
            t_paid += credit[x].p_paid;
          }
          console.log(t_paid);
          const pending = GrandTotal - t_paid;
          console.log(pending);
          res.render("credit_collection", {
            user: user,
            policy: Policy,
            pending: pending.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            lastName: lastName,
            firstName: firstName,
            GrandTotal: GrandTotal.toString().replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ","
            ),
            sumInsured: sumInsured
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            PHCF: PHCF.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            levy: levy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            stampDuty: stampDuty
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            credit: credit,
            policyId: policyId,
            pageTitle: "credit collection",
            path: "/credit_collection",
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
exports.postCredit = (req, res, next) => {
  const user = req.user;
  const policyId = req.params.policyId;
  let today = new Date();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let year = today.getFullYear();
  let hour = today.getHours();
  let min = today.getMinutes();
  let secs = today.getSeconds();
  const current_date = `${month}/${date}/${year}`;
  const current_time = `${hour}:${min}:${secs}`;

  const log = new Logs({
    task: "Added a credit: ",
    userId: user.id,
    time: current_time,
    date: current_date,
  });
  log.save();
  let collectionFile = "";
  if (req.files.creditCollectFile != undefined) {
    collectionFile = req.files.creditCollectFile[0].originalname;
  }
  const p_date = req.body.p_date;
  const p_paid = req.body.p_paid;
  const p_mode = req.body.p_mode;
  const refNumber = req.body.refNumber;
  console.log(refNumber);
  const credit = new Credit({
    p_paid: p_paid,
    p_mode: p_mode,
    p_date: p_date,
    refNumber: refNumber,
    policyId: policyId,
    crediCollectionFile: collectionFile,
  });
  credit.save();
  res.redirect(`/credit/${policyId}`);
};
exports.getInsurancePay = async (req, res, next) => {
  const policyId = req.params.policyId;
  const user = req.user;
  try {
    const xpolicy = await Policies.findOne({
      where: { id: policyId },
      include: { model: creditPayment },
    });
    const creditPay = xpolicy.creditPayments;
    const policy = await Policies.findOne({
      where: { id: policyId },
      include: { model: Clients },
    });
    const insurancePay = await insurancePayment.findAll({
      include: {
        model: Policies,
        where: { id: policyId },
        include: { model: Clients },
      },
    });
    let netPremium = 0;
    if (insurancePay[0] != undefined) {
      netPremium = insurancePay[0].netPremium;
    }
    let phcf = 0;
    if (insurancePay[0] != undefined) {
      phcf = insurancePay[0].phcf;
    }
    let levy = 0;
    if (insurancePay[0] != undefined) {
      levy = insurancePay[0].levy;
    }
    let comm_rate = "";
    if (insurancePay[0] != undefined) {
      comm_rate = insurancePay[0].comm_rate;
    }
    let premium_rate = policy.rate;
    if (insurancePay[0] != undefined) {
      premium_rate = insurancePay[0].premium_rate;
    }
    let comm_amount = 0;
    if (insurancePay[0] != undefined) {
      comm_amount = insurancePay[0].comm_amount;
    }
    let special_disc = 0;
    if (insurancePay[0] != undefined) {
      special_disc = insurancePay[0].special_disc;
    }
    let basicPremium_b = 0;
    if (insurancePay[0] != undefined) {
      basicPremium_b = insurancePay[0].basicPremium;
    }
    let basicPremium_ = 0;
    if (
      policy.coverType == "Work Injury Benefit" ||
      policy.coverType == "Personal Accident" ||
      policy.coverType == "Group Personal Accident" ||
      policy.coverType == "Third Party"
    ) {
      basicPremium_b = basicPremium_;
    }
    const firstName = policy.client.firstName;
    const lastName = policy.client.lastName;
    const GrandTotal = policy.GrandTotal;
    const sumInsured = policy.sumInsured;
    const basicPremium = policy.basicPremium;
    const exPro = policy.exPro;
    const poliTe = policy.poliTe;
    const perAcc = policy.perAcc;
    const lossOfUse = policy.lossOfUse;
    const pll = policy.pll;
    const rescueBenefit = policy.rescueBenefit;
    const Windscreen = policy.Windscreen;
    const PVT = policy.PVT;
    const MP = policy.MP;
    const PAL = policy.PAL;
    const TPL = policy.TPL;
    const stampDuty = policy.stampDuty;
    console.log(basicPremium_b);
    res.render("insurancePayment", {
      user: user,
      policy: Policy,
      premium_rate: premium_rate,
      comm_rate: comm_rate,
      special_discount: special_disc,
      special_discountKsh: special_disc
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      basicPremium: basicPremium,
      basicPremiumKsh: basicPremium
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      exPro: exPro,
      poliTe: poliTe,
      perAcc: perAcc,
      lossOfUse: lossOfUse,
      pll: pll,
      Windscreen: Windscreen,
      rescueBenefit: rescueBenefit,
      PVT: PVT,
      MP: MP,
      PAL: PAL,
      TPL: TPL,
      policytype: policy.policytype,
      basicPremium_b: basicPremium_b,
      basicPremium_bKsh: basicPremium_b
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      coverType: policy.coverType,
      creditPay: creditPay,
      lastName: lastName,
      firstName: firstName,
      GrandTotal: GrandTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      sumInsured: sumInsured.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      stampDuty: stampDuty,
      stampDutyKsh: stampDuty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      levy: levy,
      levyKsh: levy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      phcf: phcf,
      phcfKsh: phcf.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      comm_amount: comm_amount,
      comm_amountKsh: comm_amount
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      netPremium: netPremium,
      netPremiumKsh: netPremium
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      policyId: policyId,
      pageTitle: "Insurance Payment",
      path: "/insurancePayment",
    });
  } catch {
    (err) => {
      console.log(err);
    };
  }
};
exports.postInsurancePay = (req, res, next) => {
  const user = req.user;
  const policyId = req.params.policyId;
  const comm_rate = req.body.comm_rate;
  console.log(comm_rate);
  const comm_amount = req.body.comm_amount;
  console.log(comm_amount);
  const special_disc = req.body.special_discount;
  const netPremium = req.body.netPremium;
  const basicPremium = req.body.basicPremium;
  const premium_rate = req.body.premium_rate;
  const PHCF = req.body.PHCF;
  const levy = req.body.levy;
  const stampDuty = req.body.stampDuty;
  insurancePayment.findOne({ where: { policyId: policyId } }).then((pay) => {
    if (pay != undefined) {
      pay.comm_rate = comm_rate;
      pay.premium_rate = premium_rate;
      pay.netPremium = netPremium;
      pay.comm_rate = comm_rate;
      pay.comm_amount = comm_amount;
      pay.netPremium = netPremium;
      pay.special_disc = special_disc;
      pay.levy = levy;
      pay.phcf = PHCF;
      pay.basicPremium = basicPremium;
      pay.premium_rate = premium_rate;
      pay.save();
      res.redirect(`/insurancePay/${policyId}`);
    } else {
      const insurancePay = new insurancePayment({
        comm_rate: comm_rate,
        comm_amount: comm_amount,
        netPremium: netPremium,
        special_disc: special_disc,
        stampDuty: stampDuty,
        levy: levy,
        phcf: PHCF,
        basicPremium: basicPremium,
        premium_rate: premium_rate,
        policyId: policyId,
      });
      insurancePay.save();
      res.redirect(`/insurancePay/${policyId}`);
    }
  });
};
exports.postCreditPay = (req, res, next) => {
  const user = req.user;
  let payFile = "";
  if (req.files.creditPayFile != undefined) {
    payFile = req.files.creditPayFile[0].originalname;
  }
  const policyId = req.params.policyId;
  const p_paid = req.body.p_paid;
  const p_date = req.body.p_date;
  const p_mode = req.body.p_mode;
  const refNumber = req.body.refNumber;
  const creditPay = new creditPayment({
    p_paid: p_paid,
    p_date: p_date,
    p_mode: p_mode,
    refNumber: refNumber,
    policyId: policyId,
    creditPayFile: payFile,
  });
  creditPay.save();
  res.redirect(`/insurancePay/${policyId}`);
};
