import { inventory_data, sales_data } from "./storage.js";
import Sale from "./classes/salesClasses.js";

/*
   DOM ELEMENTS
 */
const add_sales_btn = document.getElementById("add_sales_btn");
const add_sales_dialog = document.getElementById("add_sales_dialog");
const x_btn = document.getElementById("x_btn");
const add_sales_form = document.getElementById("add_sales_form");
const sales_table_body = document.getElementById("sales_table_body");
const sales_cancel_btn = document.getElementById("sales_cancel_btn");
const select_product = document.getElementById("select_product");
const quantity_input = document.getElementById("quantity");
const product_quantity_span = document.getElementById("product_quantity");

/*
   OPEN DIALOG + LOAD PRODUCTS
 */
add_sales_btn.addEventListener("click", () => {
    if (inventory_data.length === 0) {
        alert("No products available to make a sale.");
        return;
    }
    add_sales_dialog.showModal();

    // Reset dropdown and stock text
    select_product.innerHTML = `<option value="">choose a product</option>`;
    product_quantity_span.textContent = "";

    // displaying list of  products in select element.
    inventory_data.forEach(item => {
        if (item.productQuantity > 0) {
            const option = document.createElement("option");
            option.value = item.id;
            option.textContent =
                `${item.productName} - (Rs.${item.productPrice}) - ${item.productQuantity} in stock`;
            select_product.appendChild(option);

            
    // If after filtering stock > 0, still empty
    if (select_product.options.length === 1) {
        alert("No products in stock to make a sale.");
        add_sales_dialog.close();
    }
        }
    });
});

/* 
   CLOSE DIALOG
 */
x_btn.addEventListener("click", closeDialog);
sales_cancel_btn.addEventListener("click", closeDialog);

function closeDialog() {
    add_sales_dialog.close();
    add_sales_form.reset();
    product_quantity_span.textContent = "";
}

/* 
   PRODUCT SELECTION
 */
    select_product.addEventListener("change", () => {
        console.log(typeof select_product.value)
        const selectedProduct = inventory_data.find(

            item => item.id === parseInt(select_product.value, 10)
        );

        if (!selectedProduct) {
            product_quantity_span.textContent = "";
            return;
        }

        quantity_input.max = selectedProduct.productQuantity;
        product_quantity_span.textContent =
            `Available: ${selectedProduct.productQuantity} units`;
    });

/* 
   RENDER SALES TABLE
 */
function renderSaleRow(sale) {
    const template = document.getElementById("sales_data_template");
    const row = template.content.cloneNode(true);
    const tds = row.querySelectorAll("td");

    tds[0].textContent = new Date(sale.currentTimeStamp).toLocaleString();
    tds[1].textContent = sale.product;
    tds[2].textContent = sale.quantity;
    tds[3].textContent = `Rs. ${sale.unitprice}`;
    tds[4].textContent = `Rs. ${sale.total}`;

    // Add newest sale at top
    sales_table_body.prepend(row);
}

function renderAllSales() {
    sales_table_body.innerHTML = "";
    sales_data.forEach(sale => renderSaleRow(sale));
}

/* 
   FORM SUBMIT (COMPLETE SALE)
 */
add_sales_form.addEventListener("submit", (e) => {
    e.preventDefault();

     //  Product must be selected
    if (!select_product.value) {
        alert("Please select a valid product.");
        return;
    }

    const productId = parseInt(select_product.value, 10);
    const qty = parseInt(quantity_input.value, 10);

    const selectedProduct = inventory_data.find(
        item => item.id === productId
    );

      //  Quantity must be valid
    if (
        !selectedProduct ||
        isNaN(qty) ||
        qty <= 0 ||
        qty > selectedProduct.productQuantity
    ) {
        alert(
            `Please enter a valid quantity (1 to ${selectedProduct?.productQuantity || 0}).`
        );
        return;
    }

    const sale = new Sale(
        Date.now(),
        selectedProduct.productName,
        qty,
        selectedProduct.productPrice,
        qty * selectedProduct.productPrice,
        new Date().toISOString()
    );

    // Save sale
    sales_data.push(sale);
    localStorage.setItem("sales_data", JSON.stringify(sales_data));

    // Update inventory
    selectedProduct.productQuantity -= qty;
    if(selectedProduct.productQuantity>=10){
        selectedProduct.productStatus="In-stock";
    }
    else if(selectedProduct.productQuantity<10){
        selectedProduct.productStatus="low-stock";
    }
    else{
        selectedProduct.productStatus= "out of stock";
    }
    localStorage.setItem("inventory_data", JSON.stringify(inventory_data));

    // Update UI instantly
    renderSaleRow(sale);

    closeDialog();
});


renderAllSales();
