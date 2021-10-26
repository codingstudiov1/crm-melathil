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
  //       url: "/admin/register",
  //       method: "POST",
  //       data: formData,
  //       success: (response) => {
  //         console.log(response);
  //       },
  //     });
  //   });

  $("#formRegisterEmployee").on("submit", function (evt) {
    evt.preventDefault();
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
        document
        .querySelector("#btnClose")
        .addEventListener("click", function () {
          window.location.replace("/");
        });
      },
    });
  });
});
$("#formAdminLogin").on("submit", function (evt) {
  evt.preventDefault();
  $("#loader").show();
  var data = $("#formAdminLogin").serialize();
  $.ajax({
    url: "/admin/login",
    method: "post",
    data: data,
    success: (response) => {
      $("#loader").hide();
      if (response.status) {
        window.location.replace("/admin/home");
      } else {
        window.location.replace("/admin/login");
      }
    },
    error: (response) => {
      $("#loader").hide();
      document.getElementById("textError").innerHTML =
        response.responseJSON.message;
    },
  });
});
