var business_type = document.getElementById("business_type");
var firstname = document.getElementById("firstname");
var lastname = document.getElementById("lastname");
var id_num = document.getElementById("id_num");

if (
  business_type.options[business_type.selectedIndex].value == "" ||
  business_type.options[business_type.selectedIndex].value == "Individual"
) {
  firstname.placeholder = "First name";
  lastname.placeholder = "Last name";
  id_num.placeholder = "ID Number";

  firstname_label.innerHTML = "First name";
  lastname_label.innerHTML = "Last name";
  id_num_label.innerHTML = "ID Number";
} else if (
  business_type.options[business_type.selectedIndex].value == "Corporate"
) {
  firstname.placeholder = "Corporate Name";
  lastname.placeholder = "Short name";
  id_num.placeholder = "Corporate Number";

  firstname_label.innerHTML = "Corporate Name";
  lastname_label.innerHTML = "Short name";
  id_num_label.innerHTML = "Corporate Number";

} else {
}

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
