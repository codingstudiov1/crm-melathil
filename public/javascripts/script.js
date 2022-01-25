$(document).ready(function () {
  $('#formCreateClientType').on("submit", function (evt) {
    evt.preventDefault();
    let data = $(this).serialize();
    axios.post('/admin/create-client-type', data).then((response) => {
      if (response.data.status) {
        alert(response.data.message);
        window.location.replace('/admin/client-types');
      }
    })
  })
  var success = new bootstrap.Modal(document.getElementById("successModal"), {
    keyboard: false,
  });
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

  $("#formUserLogin").on("submit", function (evt) {
    evt.preventDefault();
    $("#loader").show();
    let data = $(this).serialize();
    console.log(data)

    axios.post('/login', data).then((response) => {
      if (response.data.status) {
        window.localStorage.userToken = response.data.token;
        $("#loader").hide();
        switch (response.data.usertype) {
          case 'admin':
            window.location.replace('/admin');
            break;
        }
      }
    }).catch((error) => {
      console.log(error);
    })
  });

});
