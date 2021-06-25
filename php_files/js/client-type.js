var business_type = document.getElementById("business_type");
var firstname = document.getElementById("firstname");
var lastname = document.getElementById("lastname");
var id_num = document.getElementById("id_num");

business_type.addEventListener("change", function () {
  if (
    business_type.options[business_type.selectedIndex].value == "" ||
    business_type.options[business_type.selectedIndex].value == "Individual"
  ) {
    firstname.placeholder = "First name";
    lastname.placeholder = "Last name";
    id_num.placeholder = "ID Number";
  } else if (
    business_type.options[business_type.selectedIndex].value == "Corporate"
  ) {
    firstname.placeholder = "Corporate Name";
    lastname.placeholder = "Short name";
    id_num.placeholder = "Corporate Number";
  } else {
  }
});
