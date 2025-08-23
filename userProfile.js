 let isAdmin = localStorage.getItem("isAdmin");

function isAdminUser() {
        if(isAdmin === "true") {

        document.getElementById("admin").style.display = "block";
        console.log("User is admin");

        }
    }

    isAdminUser();