
const myChart = document.getElementById('last--ten--chart').getContext('2d');

new Chart(myChart, {
    type : 'bar',
    data : {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        datasets: [{
            label : 'Last 10 results',
            data : [12, 19, 3, 5, 2, 3, 10, 7, 8, 6],
            backgroundColor : 'rgba(54, 162, 235, 0.2)',
            borderColor : 'rgba(54, 162, 235, 1)',
            borderWidth : 1
        }  
    ]
    },
    options : {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }

});