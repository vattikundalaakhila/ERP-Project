import {user_loggedIn} from "./storage.js";

if(!user_loggedIn !== "yes"){
    window.location.href = "login.html";

}


// const logout_btn = document.getElementById("logout_btn")

// logout_btn.addEventListener('click', logout_func);

// function logout_func(event){
//     window.location.href = 'login.html';
// }