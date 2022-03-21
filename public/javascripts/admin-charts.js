const ctxFiveDays = document.getElementById('fiveDaysBarChart');
const ctxSixMonths = document.getElementById('sixMonthsLineChart');
const ctxTenDaysSales = document.getElementById('tenDaysSales');

axios.get('/api/v1/last-five-days-counts').then(response => {
    const myChart = new Chart(ctxFiveDays, {
        type: 'bar',
        data: {
            labels: response.data.days,
            datasets: [{
                label: '# of Enquiries',
                data: response.data.success,
                backgroundColor: [
                    '#1FA3B7',
                ]
            },
            {
                label: '# of closed nquiries',
                data: response.data.closed,
                backgroundColor: [
                    '#2FA64D',
                ]
            },
            {
                label: '# of failed nquiries',
                data: response.data.failed,
                backgroundColor: [
                    '#DB3447',
                ]
            }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
})
axios.get('/api/v1/last-six-months-counts').then(response => {
    const myChart = new Chart(ctxSixMonths, {
        type: 'line',
        data: {
            labels: response.data.months,
            datasets: [{
                label: '# of Enquiries',
                data: response.data.success,
                borderColor: [
                    '#1FA3B7',
                ],
                backgroundColor: [
                    '#1FA3B7',
                ]
            },
            {
                label: '# of closed nquiries',
                data: response.data.closed,
                borderColor: [
                    '#2FA64D',
                ],
                backgroundColor: [
                    '#2FA64D',
                ]
            },
            {
                label: '# of failed nquiries',
                data: response.data.failed,
                borderColor: [
                    '#DB3447',
                ],
                backgroundColor: [
                    '#DB3447',
                ]
            }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
})
axios.get('/api/v1/last-ten-days-sales-user').then(response => {
    const myChart = new Chart(ctxTenDaysSales, {
        type: 'bar',
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
})