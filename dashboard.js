const token= localStorage.getItem('token');

console.log("Token z localStorage:", token);

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
            document.getElementById("userEmail").textContent = data.email})
        .catch(error => console.error("Błąd: ", error))
    } else {
        console.log("Brak tokenu, użytkownik niezalogowany.");
    }

