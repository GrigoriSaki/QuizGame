
const myChart = document.getElementById('last--ten--chart').getContext('2d');
 const token = localStorage.getItem("token");


async function loadStatistics() {
results = await fetch("https://localhost:7049/api/quiz/lastTen", {
    headers: { "Authorization": "Bearer " + token }
})
.then(res => res.json());


const scores = results.map(r => r.score);
console.log(scores);
const dates  = results.map(r => new Date(r.resultDate).toLocaleDateString());
console.log(dates);

new Chart(myChart, {
    type : 'bar',
    data : {
        labels: dates,
        datasets: [{
            label : 'Last 10 results',
            data : scores,
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
    
}

loadStatistics();
 


