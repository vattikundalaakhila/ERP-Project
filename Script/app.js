

import {user_loggedIn} from "./storage.js";

  if(user_loggedIn !== "yes"){
   window.location.href = "login.html";

  }


 const logout_btn = document.getElementById("logout_btn")
 

 logout_btn.addEventListener('click', logout_func);

function logout_func(event){
   localStorage.removeItem("LogIn");
    
    window.location.href = 'login.html';
 }

 let currentPage = window.location.pathname.split("/").pop();

if (currentPage === "") {
  currentPage = "index.html";
}

const links = document.querySelectorAll(".dashboard_sidebar_nav ul li a");

links.forEach(link => {
    const linkPage = link.getAttribute("href").replace("./", "");

    if (linkPage === currentPage) {
        link.parentElement.classList.add("active");
    }
});
