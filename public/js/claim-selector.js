
var policy_number = document.getElementById("policy_tag_get");
var data_value_list = document.getElementById("policy_lists");

var claim_policy_id = document.getElementById("claim_policy_id");
var claim_policy_number = document.getElementById("claim_policy_number");
var claim_cover_type = document.getElementById("claim_cover_type");
var claim_insurer = document.getElementById("claim_insurer");
var claim_policy_holder = document.getElementById("claim_policy_holder");
var claim_period_start = document.getElementById("claim_period_start");
var claim_period_end = document.getElementById("claim_period_end");
var claim_sum_insured = document.getElementById("claim_sum_insured");

var claim_compensation = document.getElementById("claim_compensation");
var claim_garaged_at = document.getElementById("claim_garaged_at");
var claim_garaged_contact = document.getElementById("claim_garaged_contact");
var claim_description = document.getElementById("claim_description");





policy_number.addEventListener('change', () => {
    let _value = null;
  
    let input_value = policy_number.value;
    let options = data_value_list.children;
    let i = options.length;
  
    while(i--) {
      let option = options[i];
  
      if(option.value == input_value) {
        _value = option.getAttribute('data-value');;
        break;
      }
    }
  
    if(_value == null) {
      // console.warn('Value does not exist');
      return false;
    }
  
    // console.log('The value is:', _value );
    var myArr = _value.split("|");

    for(var x=0; x <myArr.length;x++){
        if(x==0){
          claim_policy_id.value = myArr[x];
        }else if(x==1){
          claim_policy_number.value = myArr[x];
        }else if(x==2){
          if (myArr[x].includes("NonMotor") ) {
            claim_compensation.style.display = "none";
            claim_compensation.style.margin = "0";
            // claim_compensation.required = "true";

            claim_garaged_at.style.display = "none";
            claim_garaged_at.style.margin = "0";
            // claim_garaged_at.required = "true";

            claim_garaged_contact.style.display = "none";
            claim_garaged_contact.style.margin = "0";
            // claim_garaged_contact.required = "true";

            claim_description.rows = "5";
            claim_description.style.maxHeight = "120px";

          }else{
            claim_compensation.style.display = "flex";
            claim_compensation.style.margin = "0.1rem 0";
            // claim_compensation.required = "false";
            
            claim_garaged_at.style.display = "flex";
            claim_garaged_at.style.margin = "0.1rem 0";
            // claim_garaged_at.required = "false";
            
            claim_garaged_contact.style.display = "flex";
            claim_garaged_contact.style.margin = "0.1rem 0";
            // claim_garaged_contact.required = "false";

            claim_description.rows = "9";
            claim_description.style.maxHeight = "143px";

          }


        }else if(x==3){
          claim_insurer.value = myArr[x];
        }else if(x==4){
          var no_zeros = parseInt(myArr[x]);
          var new_cash = no_zeros.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          claim_sum_insured.value = "Kshs " + new_cash;
        }else if(x==5){
          claim_policy_holder.value = myArr[x];
        }else if(x==6){
          claim_cover_type.value = myArr[x];
        }else if(x==7){
          claim_period_start.value = myArr[x];
        }else if(x==8){
          claim_period_end.value = myArr[x];
        }
    }
  });
