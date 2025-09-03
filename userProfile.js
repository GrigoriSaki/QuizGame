 let isAdmin = localStorage.getItem("isAdmin");
 const token= localStorage.getItem('token');
 const addQuestionBtn = document.getElementById("add-question");
 const submitBtn = document.getElementById("submit-btn");
 const cancelBtn = document.getElementById("cancel-btn");
 const changeAvatarBtn = document.getElementById("change-avatar");
 const closeAvatarBtn = document.getElementById("close-avatar");
 const avatarImages = document.querySelectorAll(".avatar-options img");
 const currentAvatar = document.querySelector(".profile-picture img");
 const saveAvatarBtn = document.getElementById("save-avatar-btn");
 let selectedAvatarSrc = null;
    const savedAvatar = localStorage.getItem("userAvatar");
    let selectedAvatarIndex = 0;

    const avatars = [
        "avatars/aDefault.png",
        "avatars/a1.png",
        "avatars/a2.png",
        "avatars/a3.png",
        "avatars/a4.png",
        "avatars/a5.png",
        "avatars/a6.png",
        "avatars/a7.png"
    ];



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
            currentAvatar.src = avatars[data.avatarIndex] || "avatars/aDefault.png";


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
            validateAll();

        })

        function clearForm()
        { 
            const inputs = document.querySelectorAll(".form-group input");
            inputs.forEach(input => {
                input.value = "";
            });
        }

        async function sendQuestion() {
            let questionText= document.getElementById("question-text").value;
             questionText = questionText.replace(/\?/g, "").trim();

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
                                const error = await response.json(); 
                                alert(error.message || "Wystąpił nieznany błąd."); 
                             }
        
                }

            catch(error){
                console.error("Błąd wysyłania pytania: ", error);
            }

        }


       function validateAll() {
  
             const requiredFields = document.querySelectorAll("[required]");
             let allValid = true;

            for (let field of requiredFields) {
            if (!field.checkValidity()) {
            field.reportValidity(); 
            allValid = false;
            break; 
            }
            }
 
            if (allValid) {
               sendQuestion();
            }
        }

        changeAvatarBtn.addEventListener("click", ()=>
        {
             document.querySelector(".background").style.backgroundColor ="rgb(143, 225, 147)";
            document.querySelector(".profile-container").style.display = "none";
            document.querySelector(".header").style.display = "none";
            document.querySelector(".choose-avatar-container").style.display = "block";
           
            
        })

        closeAvatarBtn.addEventListener("click", ()=>
        {
           
            document.querySelector(".profile-container").style.display = "block";
            document.querySelector(".header").style.display = "block";
            document.querySelector(".choose-avatar-container").style.display = "none";
            document.querySelector(".background").style.backgroundColor ="#f0f0f0";
            
            
        })

        
            

        avatarImages.forEach((img, index) => {
                img.addEventListener("click", () => {
                    selectedAvatarIndex = index;
                    

                     avatarImages.forEach(i => i.classList.remove("selected"));
                     img.classList.add("selected");
                })
            });



        saveAvatarBtn.addEventListener("click", ()=>{

           
                
                setAvatar(selectedAvatarIndex);
                document.querySelector(".profile-container").style.display = "block";
                document.querySelector(".header").style.display = "block";
                document.querySelector(".choose-avatar-container").style.display = "none";
                document.querySelector(".background").style.backgroundColor ="#f0f0f0";
                loadUserProfile();

        })

    


         function setAvatar (avatarIndex){

              fetch("https://localhost:7049/api/auth/avatar", {
            method: "PATCH",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(avatarIndex)
        })
        .then(res => {
             if (!res.ok) throw new Error("Błąd przy ustawianiu avatara");
             return res.json();
            }).then(data => {
                console.log(data.message);
            }).catch(err => console.error(err));
         }
        
            
        

