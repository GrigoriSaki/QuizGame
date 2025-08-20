 document.getElementById('show-register').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
  });

   document.getElementById('show-login').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
  });

  const toggle = document.getElementById('togglePassword');
  const toggleRegister = document.getElementById('register-password-toggle');
const password = document.getElementById('login-password');
const registerPassword = document.getElementById('register-password');
const registerConfirmPassword = document.getElementById('confirm_password');

toggle.addEventListener('mousedown', () => {
    password.setAttribute('type', 'text');  
});
toggleRegister.addEventListener('mousedown', () => {
    registerPassword.setAttribute('type', 'text');  
     registerConfirmPassword.setAttribute('type', 'text');
});

toggle.addEventListener('mouseup', () => {
    password.setAttribute('type', 'password');  
   
});
toggleRegister.addEventListener('mouseup', () => {
    registerPassword.setAttribute('type', 'password');  
     registerConfirmPassword.setAttribute('type', 'password');
});


document.querySelector("#login-form form").addEventListener("submit", async function (e){
  e.preventDefault();
  const email = this.email.value;
  const pass = this.password.value;
  


  const response = await fetch("https://localhost:7049/api/auth/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({email: email, password: pass})
  });




  const result = await response.json();
    if (response.ok) {
        alert("Zalogowano pomyślnie!");
        // Tutaj możesz przekierować użytkownika, np. window.location.href = "/dashboard";
        localStorage.setItem("token", result.token);
        console.log(result.token);
       window.location.href = "/dashboard.html";
        
    } else {
        alert(result.message || "Błąd logowania.");
       
        
    }

});

document.querySelector("#register-form form").addEventListener("submit", async function (e){
  e.preventDefault();
  const userName = this.userName.value;
  const email = this.email.value;
  const pass = this.password.value;
  const confirmPass = this.confirm_password.value;

  if (pass !== confirmPass) {
        alert("Hasła się nie zgadzają!");
        return;
    }

     const response = await fetch("https://localhost:7049/api/auth/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ userName: userName ,email: email, password: pass, confirmPassword: confirmPass})
    });
    
    const result = await response.json();
    if (response.ok) {
        alert("Zarejestrowano pomyślnie!");
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
        
    } else {
        alert(result.message || "Błąd rejestracji.");
        
    }
})