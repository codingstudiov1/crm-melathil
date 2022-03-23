const ctxTenDaysSales = document.getElementById('tenDaysSales');
const ctxSixMonthsSales = document.getElementById('sixMonthSales');


axios.get(`/api/v1/last-ten-days-sales-user`).then(response => {
    const myChart = new Chart(ctxTenDaysSales, {
        type: 'line',
        data: {
            labels: response.data.days,
            datasets: [{
                label: 'Amount of Sales',
                data: response.data.sales,
                backgroundColor: [
                    '#1FA3B7',
                ],
                borderColor: [
                    '#1FA3B7',
                ]
            },
            ]
        },
    });
});
axios.get('/api/v1/last-six-months-sales-user').then(resp => {
    const chart = new Chart(ctxSixMonthsSales, {
        type: 'line',
        data: {
            labels: resp.data.months,
            datasets: [{
                label: 'Amount of Sales',
                data: resp.data.monthlySales,
                backgroundColor: [
                    '#1FA3B7',
                ],
                borderColor: [
                    '#1FA3B7',
                ]
            },
            ]
        },
    });
})