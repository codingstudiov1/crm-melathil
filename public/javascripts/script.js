$(document).ready(function () {
  setTimeout(function () {
    $("#loader").hide();
  }, 1000);
  var success = new bootstrap.Modal(document.getElementById("successModal"), {
    keyboard: false,
  });
  // document
  //   .querySelector("#formAdminRegister")
  //   .addEventListener("submit", function () {
  //     var formData = new FormData(this);
  //     console.log(formData);
  //     $("#loader").show();
  //     $.ajax({
  //       url: "/dashboard/register",
  //       method: "POST",
  //       data: formData,
  //       success: (response) => {
  //         console.log(response);
  //       },
  //     });
  //   });

  $("#formRegisterEmployee").on("submit", function (evt) {
    evt.preventDefault();
    if ($("#formRegisterEmployee").valid()) {
      $("#loader").show();
      let data = $(this).serialize();
      console.log(data);
      $.ajax({
        url: "/register",
        method: "post",
        data: data,
        success: (response) => {
          $("#loader").hide();
          document.querySelector("#successModalBody").innerHTML =
            response.message;
          success.show();
          document
            .querySelector("#btnClose")
            .addEventListener("click", function () {
              window.location.replace("/");
            });
        },
        error: (error) => {
          $("#loader").hide();
          document.querySelector("#successModalBody").innerHTML =
            error.responseJSON.message;
          success.show();
        },
      });
    }
  });
  $("#formAdminLogin").on("submit", function (evt) {
    evt.preventDefault();
    $("#loader").show();
    var data = $("#formAdminLogin").serialize();
    $.ajax({
      url: "/dashboard/login",
      method: "post",
      data: data,
      success: (response) => {
        $("#loader").hide();
        if (response.status) {
          window.location.replace("/dashboard/home");
        } else {
          window.location.replace("/dashboard/login");
        }
      },
      error: (response) => {
        $("#loader").hide();
        document.getElementById("textError").innerHTML =
          response.responseJSON.message;
      },
    });
  });
  $("#formEmployeeLogin").on("submit", function (evt) {
    evt.preventDefault();
    $("#loader").show();
    let data = $(this).serialize();
    $.ajax({
      url: "/login",
      method: "post",
      data: data,
      success: (response) => {
        console.log(response);
        $("#loader").hide();
        if (response.status) {
          window.location.replace("/dashboard/home");
        } else {
          $("#loader").hide();
          document.querySelector("#successModalBody").innerHTML =
            response.message;
          success.show();
          document
            .querySelector("#btnClose")
            .addEventListener("click", function () {
              window.location.replace("/");
            });
        }
      },
      error: (error) => {
        $("#loader").hide();
        document.querySelector("#successModalBody").innerHTML =
          error.responseJSON.message;
        success.show();
      },
    });
  });

  $("#formCreateClient").on("submit", function (evt) {
    evt.preventDefault();
    let formData = new FormData(document.querySelector("#formCreateClient"));
    console.log(formData);
  });

  // $("#formCreateUsertype").on("submit", function (evt) {
  //   evt.preventDefault();
  //   const formData = new FormData(
  //     document.querySelector("#formCreateUsertype")
  //   );
  //   $.ajax({
  //     url: "/dashboard/usertypes/create",
  //     method: "post",
  //     data: formData,
  //     success: (response) => {
  //       console.log(response);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // });
});
