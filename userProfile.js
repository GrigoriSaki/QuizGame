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
            clearForm();
        })

        submitBtn.addEventListener("click", ()=>
        {
            
           sendQuestion();
        })

        function clearForm()
        { 
            const inputs = document.querySelectorAll(".form-group input");
            inputs.forEach(input => {
                input.value = "";
            });
        }

        async function sendQuestion() {
            const questionText= document.getElementById("question-text").value;
            console.log("Treść pytania:", questionText);
            

            const answerInputs= document.querySelectorAll(".answer-text");
            
            let answers = [];
            answerInputs.forEach((input, i)=>{
                answers.push({
                    answerText: input.value,
                    isCorrect: i === 0
                })
            })

            const dto = {
                questionText: questionText,
                answers: answers
            };
            console.log("DTO wysyłane do API:", dto);

            try{
                const response = await fetch("https://localhost:7049/api/quiz/question" ,{
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                      },
                      body: JSON.stringify(dto)
                    
                    })

                    if(response.ok)
                        {
                            
                            const result = await response.json();
                            alert(result.message);
                            clearForm();
                        }
                        else {
                                alert("Błąd: " + response.status);
                             }
        
                }

            catch(error){
                console.error("Błąd wysyłania pytania: ", error);
            }

        }