


$(document).ready(function () {
  $('#loader').hide();
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
  $('#formApproveUser').on('submit', function (evt) {
    evt.preventDefault();
    let data = $(this).serialize();
    axios.post('/admin/approve-user', data).then((response) => {
      window.location.replace('/admin/employee-requests')
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
      axios.post(evt.target.action, data).then((response) => {
        $("#loader").hide();
        console.log(response.data);
        if (response.data.status) {
          document.querySelector("#successModalBody").innerHTML = response.data.message;
          success.show();
          document
            .querySelector("#btnClose")
            .addEventListener("click", function () {
              window.location.replace("/login/user");
            });
        }
        else {
          document.querySelector("#successModalBody").innerHTML = response.data.message;
          success.show();
        }
      })
    }
  });
  $("#formUserLogin").on("submit", function (evt) {
    evt.preventDefault();
    $("#loader").show();
    let data = $(this).serialize();
    axios.post(evt.target.action, data).then((response) => {
      if (response.data.status) {
        $("#loader").hide();
        window.location.replace(redirect);
      }
      else {
        $("#loader").hide();
        alert(response.data.message)
      }
    }).catch((error) => {
      console.log(error);
    })
  });
});
function getUserReport(evt) {
  evt.preventDefault();
  let data = $(evt.target).serialize();
  console.log(data);
  axios.get('/dashboard/reports/enquiries?' + data).then((response) => {
  })
}
function pathHighlight() {
  let anchors = document.querySelectorAll('.nav-item .nav-link');
  for (var i = 0; i < anchors.length; i = i + 2) {
    console.log(i)
    if (window.location.pathname == anchors[i].pathname) {
      $(anchors[i]).closest('li').addClass('active menu-open');
      $(anchors[i]).addClass('active');
    }
    else {
      $(anchors[i]).closest('li').removeClass('active menu-open');
      $(anchors[i]).removeClass("active");
    }
  }
}