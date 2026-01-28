export const user_loggedIn = localStorage.getItem("LogIn");

//here are just getting the LogIn key from localstorage that we have
//created with yes value after submitting the form. 


//to store the inventory data 

export let inventory_data = JSON.parse(localStorage.getItem("inventory_data"))|| [];

export let sales_data = JSON.parse(localStorage.getItem("sales_data"))||[];