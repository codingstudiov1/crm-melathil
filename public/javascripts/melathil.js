function processLogin(evt) {
    evt.preventDefault();
    const formData = new URLSearchParams(new FormData(evt.target).entries());
    console.log(formData);
    axios.post(evt.target.action, formData).then((response) => {
        if (response.data.status) {
            console.log(response.data)
            window.location.replace(response.data.redirect);
        }
        else {
            alert(response.data.message);
        }
    })

}

function processSearch() {
    let drp = $('#reportrange').data('daterangepicker');
    let startDate = drp.startDate._d;
    let endDate = drp.endDate._d;
    let status = $('#status').val();
    let temp = $('#temparature').val();
    let client = $('#client').val();
    console.log(`Status ${status} Temparature ${temp} Client ${client}`);
    window.location.href = `/dashboard/reports/enquiries/search?startDate=${startDate}&endDate=${endDate}&status=${status}&temp=${temp}&client=${client}`;
}

// function getReport(evt) {
//     evt.preventDefault();
//     let drp = $('#reportrange').data('daterangepicker');
//     let from = drp.startDate._d;
//     let to = drp.endDate._d;
//     let formData = $(evt.target).serialize();
//     // console.log(`${evt.target.action}?from=${from}&to=${to}`)
//     window.location.href = `${evt.target.action}?from=${from}&to=${to}&${formData}`;
// }