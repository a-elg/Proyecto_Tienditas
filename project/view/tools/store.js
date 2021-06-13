/* globals Chart:false, feather:false */
window.addEventListener('load', load)

function load() {
    document.getElementById("dashboardLink").addEventListener("click", function() { showTabs(0); });
    document.getElementById("ordersLink").addEventListener("click", function() { showTabs(1); });
    document.getElementById("productsLink").addEventListener("click", function() { showTabs(2); });
    document.getElementById("clientsLink").addEventListener("click", function() { showTabs(3); });
    document.getElementById("deliveryMenLink").addEventListener("click", function() { showTabs(4); });
    showTabs(0);
    chartFn();
}

function showTabs(i) {
    switch (i) {
        case 1:
            document.getElementById("dashboardLink").className = "nav-link";
            document.getElementById("ordersLink").className = "nav-link active";
            document.getElementById("productsLink").className = "nav-link";
            document.getElementById("clientsLink").className = "nav-link";
            document.getElementById("deliveryMenLink").className = "nav-link";
            document.getElementById("dashboard").style.display = "none";
            document.getElementById("dashboardLinks").style.display = "none";
            document.getElementById("orders").style.display = "block";
            document.getElementById("products").style.display = "none";
            document.getElementById("clients").style.display = "none";
            document.getElementById("deliveryMen").style.display = "none";
            break;
        case 2:
            document.getElementById("dashboardLink").className = "nav-link";
            document.getElementById("ordersLink").className = "nav-link";
            document.getElementById("productsLink").className = "nav-link active";
            document.getElementById("clientsLink").className = "nav-link";
            document.getElementById("deliveryMenLink").className = "nav-link";
            document.getElementById("dashboard").style.display = "none";
            document.getElementById("dashboardLinks").style.display = "none";
            document.getElementById("orders").style.display = "none";
            document.getElementById("products").style.display = "block";
            document.getElementById("clients").style.display = "none";
            document.getElementById("deliveryMen").style.display = "none";
            break;
        case 3:
            document.getElementById("dashboardLink").className = "nav-link";
            document.getElementById("ordersLink").className = "nav-link";
            document.getElementById("productsLink").className = "nav-link";
            document.getElementById("clientsLink").className = "nav-link active";
            document.getElementById("deliveryMenLink").className = "nav-link";
            document.getElementById("dashboard").style.display = "none";
            document.getElementById("dashboardLinks").style.display = "none";
            document.getElementById("orders").style.display = "none";
            document.getElementById("products").style.display = "none";
            document.getElementById("clients").style.display = "block";
            document.getElementById("deliveryMen").style.display = "none";
            break;
        case 4:
            document.getElementById("dashboardLink").className = "nav-link";
            document.getElementById("ordersLink").className = "nav-link";
            document.getElementById("productsLink").className = "nav-link";
            document.getElementById("clientsLink").className = "nav-link";
            document.getElementById("deliveryMenLink").className = "nav-link active";
            document.getElementById("dashboard").style.display = "none";
            document.getElementById("dashboardLinks").style.display = "none";
            document.getElementById("orders").style.display = "none";
            document.getElementById("products").style.display = "none";
            document.getElementById("clients").style.display = "none";
            document.getElementById("deliveryMen").style.display = "block";
            break;
        default:
            document.getElementById("dashboardLink").className = "nav-link active";
            document.getElementById("ordersLink").className = "nav-link";
            document.getElementById("productsLink").className = "nav-link";
            document.getElementById("clientsLink").className = "nav-link";
            document.getElementById("deliveryMenLink").className = "nav-link";
            document.getElementById("dashboard").style.display = "block";
            document.getElementById("dashboardLinks").style.display = "block";
            document.getElementById("orders").style.display = "none";
            document.getElementById("products").style.display = "none";
            document.getElementById("clients").style.display = "none";
            document.getElementById("deliveryMen").style.display = "none";
            break;
    }
}

function chartFn() {
    (function() {
        'use strict'

        feather.replace()

        // Graphs
        var ctx = document.getElementById('myChart')
            // eslint-disable-next-line no-unused-vars
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday'
                ],
                datasets: [{
                    data: [
                        15339,
                        21345,
                        18483,
                        24003,
                        23489,
                        24092,
                        12034
                    ],
                    lineTension: 0,
                    backgroundColor: 'transparent',
                    borderColor: '#007bff',
                    borderWidth: 4,
                    pointBackgroundColor: '#007bff'
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        }
                    }]
                },
                legend: {
                    display: false
                }
            }
        })
    })()
}