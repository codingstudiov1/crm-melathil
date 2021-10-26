$(document).ready(function () {
  setTimeout(function () {
    $("#loader").hide();
  }, 1000);

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

  document
    .getElementById("formAdminLogin")
    .addEventListener("submit", function (evt) {
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
});
