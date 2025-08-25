 let isAdmin = localStorage.getItem("isAdmin");
 const token= localStorage.getItem('token');
 const addQuestionBtn = document.getElementById("add-question");
 const submitBtn = document.getElementById("submit-btn");
 const cancelBtn = document.getElementById("cancel-btn");


function isAdminUser() {
        if(isAdmin === "true") {

        document.getElementById("admin").style.display = "block";
        document.getElementById("add-question").style.display ="flex";
        console.log("User is admin");

        }
    }

    isAdminUser();



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
            
            document.getElementById("email").textContent = data.email
            document.getElementById("username").textContent = data.userName;
            const createdAt = new Date(data.createdAt);
            document.getElementById("user-since").textContent = createdAt.toLocaleDateString("pl-PL");


        })
        .catch(error => console.error("Błąd: ", error))
    } else {
        console.log("Brak tokenu, użytkownik niezalogowany.");
    }


    addQuestionBtn.addEventListener("click", ()=>
        {
            document.querySelector(".question-container").style.display = "block";
            document.querySelector(".profile-container").style.display = "none";
            document.querySelector(".header").style.display = "none";
        })

        cancelBtn.addEventListener("click", ()=>
        {
            document.querySelector(".question-container").style.display = "none";
            document.querySelector(".profile-container").style.display = "block";
            document.querySelector(".header").style.display = "block";
        })

        submitBtn.addEventListener("click", ()=>
        {
             
        })