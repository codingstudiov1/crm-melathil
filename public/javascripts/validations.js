$(document).ready(function () {
  $("#formRegisterEmployee").validate({
    errorPlacement: (error, element) => {
      error.addClass("invalid-feedback");
      error.appendTo(element.parent("div"));
    },
    rules: {
      firstName: {
        required: true,
      },
      lastName: {
        required: true,
      },
      address: {
        required: true,
      },
      email: {
        required: true,
        validEmailid: true,
      },
      gender: {
        required: true,
      },
      phone: {
        required: true,
        indianMobileNumber: true,
      },
      dob: {
        required: true,
      },
      password: {
        required: true,
        minlength: 7,
      },
      confirm: {
        required: true,
        equalTo: "#confirm",
      },
    },
    messages: {
      firstName: {
        required: "Please enter your first name",
      },
      lastName: {
        required: "Please enter your last name",
      },
      address: {
        required: "Please enter your full address",
      },
      email: {
        required: "Please enter your email address",
      },
      phone: {
        required: "Please enter your phone number",
      },
      gender: {
        required: "Please pick your gender",
      },
      dob: {
        required: "Please enter your date of birth",
      },
      password: {
        required: "Create a new password",
        minlength: "password must contain atleast 7 charecters",
      },
      confirm: {
        required: "Please repeat your password",
        equalTo: "Passwords not matchng",
      },
    },
  });

  //   Custom validators
  //Custom validator for input is a Mobile Phone Number
  $.validator.addMethod(
    "indianMobileNumber",
    function (value, element) {
      return (
        this.optional(element) ||
        /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[6789]\d{9}|(\d[ -]?){10}\d$/.test(
          value
        )
      );
    },
    "Enter a valid mobile number without country code"
  );
  //Custom validator for input is an email address
  $.validator.addMethod(
    "validEmailid",
    function (value, element) {
      return (
        this.optional(element) || /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
      );
    },
    "Enter email address like yourname@example.com"
  );
});
