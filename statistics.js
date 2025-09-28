
const myChart = document.getElementById('last--ten--chart').getContext('2d');
 const token = localStorage.getItem("token");


async function loadStatistics() {
results = await fetch("https://localhost:7049/api/quiz/lastTen", {
    headers: { "Authorization": "Bearer " + token }
})
.then(res => res.json());


const scores = results.map(r => r.score);
const dates  = results.map(r => new Date(r.resultDate).toLocaleDateString());

const tbody = document.getElementById("results-body");

for (let i = 0; i < results.length; i++) {
  const tr = document.createElement("tr");
  tr.innerHTML = `<td>${scores[i]}</td><td>${dates[i]}</td>`;
  tbody.appendChild(tr);
}


const averageValue = scores.reduce((a, b) => a + b, 0) / scores.length;
document.getElementById("average-value").textContent = averageValue.toFixed(2);

const percentageValue = (scores.filter(s => s >= 6).length / scores.length) * 100;
document.getElementById("percentage-value").textContent = percentageValue.toFixed(0) + "%";





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
 


