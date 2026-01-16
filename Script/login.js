//first we are setting the username and password

const username = "akhila"
const password = "akky1234"



//after entire page is loaded
document.addEventListener('DOMContentLoaded', ()=>{
    //getting form element here
    const loginform = document.getElementById("login_form");

    //after form is submitted, then login_func executes
    loginform.addEventListener('submit', login_func);
  

    function login_func(event){
        event.preventDefault();

        // const given_username = event.target[0].value;
        // const given_password = event.target[1].value;

        const give_username = document.getElementById("username").value
        const given_password = document.getElementById("password").value
       

        if(given_username===username && given_password===password){
            localStorage.setItem('LogIn', "yes");
            window.location.href= 'index.html'

        }
        else{
            alert("Invalid username and password");
        }

        }
})
