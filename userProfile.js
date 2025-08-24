 let isAdmin = localStorage.getItem("isAdmin");
 const token= localStorage.getItem('token');


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