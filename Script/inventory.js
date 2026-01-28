//importing the Inventory class we have created 
import Inventory from "./classes/inventoryClasses.js";

//importing the inventory_data from localstorage.
import {inventory_data} from "./storage.js";

const add_product_btn = document.getElementById("add_product_btn");

const add_product_dialog = document.getElementById("addproduct_dialog");

const addproduct_dialog_close = document.getElementById("addproduct_dialog_close");

const addproduct_form= document.getElementById("addproduct_form");

const tablebody = document.getElementById("tablebody");

const table_template = document.getElementById("table_template");
const form_cancel_btn = document.getElementById("form_cancel_btn");


//here we are accessing the heading and button because so that we can change that
//if edit option is clicked for the products.
const modal_heading = document.querySelector("#addproduct_dialog_section h2");
const submit_btn = document.getElementById("form_add_product_btn");


let editId = null; 

//if cancel button in the form is clicked, 

form_cancel_btn.addEventListener("click", (e)=>{
    e.preventDefault();
    editId = null;
    addproduct_form.reset();
    add_product_dialog.close();
    

})
const search = document.getElementById("search");

search.addEventListener("input", (event) => {
  const value = event.target.value.toLowerCase();

  if (value === "") {
    render_data(inventory_data);
    return;
  }

  const filteredData = inventory_data.filter((item) =>
    item.productName.toLowerCase().includes(value) ||
    item.productCategory.toLowerCase().includes(value)
  );

  render_data(filteredData);
});

//functionality for the Add Product 
 
//for opening the dialog form
add_product_btn.addEventListener("click", ()=>{

    modal_heading.textContent = "Add Product";
    submit_btn.textContent = "Add Product";
    add_product_dialog.showModal();
})

//to close the dialog modal
addproduct_dialog_close.addEventListener("click", ()=>{
    editId = null;
    add_product_dialog.close();
    addproduct_form.reset();
})

//if the form is submitted, 
addproduct_form.addEventListener('submit', (e)=>{
    e.preventDefault();

    //getting user input and storing them in the variables.
    const id = new Date().getTime();

    const productName = document.getElementById("product_name").value ;

    const productCategory = document.getElementById("category").value ;


    const productPrice = Number(document.getElementById("price").value) ;


    const productQuantity = Number(document.getElementById("quantity").value); 

    //initial value for productStatus
    let productStatus = "In Stock"; 

    //productStatus will be depending on productQuanitity. 
    if(productQuantity >10){
        productStatus = "In Stock";
    }
    else if(productQuantity<10 && productQuantity >=1){
        productStatus = "Low Stock";
    }
    else{ 
        productStatus = "Out Of Stock";
    }


    const currentTimeStamp = new Date();

//inventory_obj object is created with the collected input. 
    const inventory_obj = new Inventory(id, productName, productCategory, productPrice,
        productQuantity, productStatus, currentTimeStamp);
    
        // if editing update or if not add new. 
        if (editId) {
    const product_row = inventory_data.find((p) => p.id === editId);

    product_row.productName = productName;
    product_row.productCategory = productCategory;
    product_row.productPrice = productPrice;
    product_row.productQuantity = productQuantity;
    product_row.productStatus = productStatus;

    editId = null;
} else {
    inventory_data.push(inventory_obj);
}

  //this new object will be added to inventory_data
      
        // inventory_data.push(inventory_obj);

        //in localstorage this inventory_data wil be converted into string format
        localStorage.setItem("inventory_data", JSON.stringify(inventory_data));


        //closing the dialog after adding product.
        add_product_dialog.close();
        
        //calling the function to render the table body data which we have added
        render_data(inventory_data)

        //to clear the previous form input that user have given. 
        addproduct_form.reset();

})

//defining the function render_data() 
function render_data(data){
    tablebody.innerHTML ="";

    data.forEach( (inventory_obj)=>{
        const table_row = table_template.content.cloneNode(true)

        const td= table_row.querySelectorAll("td");

         td[0].textContent = inventory_obj.productName;        // First column: Product Name
        td[1].textContent = inventory_obj.productCategory;    // Second column: Category
        td[2].textContent = inventory_obj.productPrice;       // Third column: Price
        td[3].textContent = inventory_obj.productQuantity;    // Fourth column: Quantity
        td[4].textContent = inventory_obj.productStatus; 


             td[5].innerHTML = `<button id='edit_${inventory_obj.id}'">Edit</button><button id ="delete_${inventory_obj.id}">Delete</button>`;

                  tablebody.appendChild(table_row);

             document.getElementById(`edit_${inventory_obj.id}`).addEventListener("click", () => editProduct(inventory_obj.id));


         document.getElementById(`delete_${inventory_obj.id}`).addEventListener("click", () => deleteProduct(inventory_obj.id));

// render_data(inventory_data);
    })
}

function deleteProduct(id) {

    //confirm() is used to alert and based on that the function will execute.
    const value = confirm("Are You Sure You Want Delete This Product ? ");

    //yes==okay function will get executed,  cancel==no function execution
    if(!value) return; 

    //getting index of the product to remove that specific product from UI
    const index = inventory_data.findIndex(item => item.id===id);

    if(index!==-1){

        //splice method is used remove array item at specific index. 
        inventory_data.splice(index,1);
        localStorage.setItem("inventory_data", JSON.stringify(inventory_data));
        render_data(inventory_data);

    }
        
    
}

function editProduct(id){

    editId = id;

    const product_row = inventory_data.find((p)=>p.id===id);
    //this stores which product is being edited, 


//here are filling the form with that product values. 
    document.getElementById("product_name").value = product_row.productName;
    document.getElementById("category").value = product_row.productCategory;
    document.getElementById("price").value = product_row.productPrice;
    document.getElementById("quantity").value = product_row.productQuantity;
   
 //here we are changing the context. 
     modal_heading.textContent = "Edit Product";
    submit_btn.textContent = "Edit Product";
   
    add_product_dialog.showModal();

}


render_data(inventory_data) 

//with this UI will be re-rendered, even if page is reloaded. 



