const token= localStorage.getItem('token');
let quizCounter= 0;
document.getElementById("quizCount").textContent = 0;


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
            document.getElementById("userEmail").textContent = data.email
            document.querySelector(".header--title h2").textContent = `Hello ${data.userName}`;
            document.querySelector("#score").textContent = `${data.lastResult}/10`;
            quizCounter = data.completedQuizes;
            animateCountUp("quizCount", quizCounter, 4000);

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

   

    document.getElementById("logoutButton").addEventListener("click", function(e){e.preventDefault();

        localStorage.removeItem("token");
        window.location.href = "index.html";
        alert("Wylogowano pomyślnie!");

    }); 

    document.getElementById("startQuizButton").addEventListener("click",function(e){e.preventDefault();

        window.location.href = "quizGame.html";
    } )

    
  


