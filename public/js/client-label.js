var business_type = document.getElementById("business_type");
var firstname = document.getElementById("firstname_label");
var lastname = document.getElementById("lastname_label");
var id_num = document.getElementById("id_num_label");

    if (
        business_type.options[business_type.selectedIndex].value == "" ||
        business_type.options[business_type.selectedIndex].value == "Individual"
    ) {
        firstname.innerHTML = "First name";
        lastname.innerHTML = "Last name";
        id_num.innerHTML = "ID Number";
    } else if (
        business_type.options[business_type.selectedIndex].value == "Corporate"
    ) {
        firstname.innerHTML = "Corporate Name";
        lastname.innerHTML = "Short name";
        id_num.innerHTML = "Corporate Number";
    } else {
    }
  
  business_type.addEventListener("change", function () {
    if (
        business_type.options[business_type.selectedIndex].value == "" ||
        business_type.options[business_type.selectedIndex].value == "Individual"
    ) {
        firstname.innerHTML = "First name";
        lastname.innerHTML = "Last name";
        id_num.innerHTML = "ID Number";
    } else if (
        business_type.options[business_type.selectedIndex].value == "Corporate"
    ) {
        firstname.innerHTML = "Corporate Name";
        lastname.innerHTML = "Short name";
        id_num.innerHTML = "Corporate Number";
    } else {
    }
  });
  