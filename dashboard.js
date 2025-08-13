const token= localStorage.getItem('token');

console.log("Token z localStorage:", token);

let lastScore = localStorage.getItem("lastScore");
if (lastScore === null) {
    lastScore = 0;
}

document.getElementById("score").innerText = `${lastScore}/10`;


if (token)
    {
        fetch("https://localhost:7049/api/auth/profile", {
            method: "GET",
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        .then(async response => {
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error("Błąd pobierania profilu: " + errorText);
            } return response.json();
        })
        .then(data => {
             console.log("Dane profilu:", data); 
            document.getElementById("userEmail").textContent = data.email
            document.querySelector(".header--title h2").textContent = `Hello ${data.userName}`;
        })
        .catch(error => console.error("Błąd: ", error))
    } else {
        console.log("Brak tokenu, użytkownik niezalogowany.");
    }

    function animateCountUp(elementId, countValue, duration)
    {
        const element = document.getElementById(elementId);
        let startValue = 0;
        const stepTime = Math.abs(Math.floor(duration /countValue
        ))


        const timer = setInterval (()=>{
            startValue++;
            element.textContent = startValue;
            if (startValue >= countValue) {
                clearInterval(timer);
            }
        }, stepTime)

    }

    window.onload = function() {
        animateCountUp("quizCount", 453, 5000);
       
        
    }

    document.getElementById("logoutButton").addEventListener("click", function(e){e.preventDefault();

        localStorage.removeItem("token");
        window.location.href = "index.html";
        alert("Wylogowano pomyślnie!");

    }); 

    document.getElementById("startQuizButton").addEventListener("click",function(e){e.preventDefault();

        window.location.href = "quizGame.html";
    } )

    
  


