
// Select all necessary elements
const totalPriceElement = document.querySelector(".total");
const productsContainer = document.querySelector(".list-products");

// Function to calculate and display the total price
function updateTotalPrice() {
    let total = 0;

    const products = document.querySelectorAll(".list-products .card");

    products.forEach((product) => {
        const unitPrice = parseFloat(
            product.querySelector(".unit-price").textContent
        );

        const quantity = parseInt(
            product.querySelector(".quantity").textContent
        );

        total += unitPrice * quantity;
    });

    totalPriceElement.textContent = total.toFixed(2) + " $";
}

// Handle all cart interactions using event delegation
productsContainer.addEventListener("click", function (event) {

    const clickedElement = event.target;

    // Find the clicked icon
    const product = clickedElement.closest(".card");

    if (!product) return;

    const quantityElement = product.querySelector(".quantity");

    // 1. INCREASE QUANTITY
    if (clickedElement.classList.contains("fa-plus-circle")) {

        let quantity = parseInt(quantityElement.textContent);

        quantity++;

        quantityElement.textContent = quantity;

        updateTotalPrice();
    }

    // 2. DECREASE QUANTITY
    if (clickedElement.classList.contains("fa-minus-circle")) {

        let quantity = parseInt(quantityElement.textContent);

        if (quantity > 0) {
            quantity--;

            quantityElement.textContent = quantity;
        }

        updateTotalPrice();
    }

    // 3. DELETE PRODUCT
    if (clickedElement.classList.contains("fa-trash-alt")) {

        // Remove the complete product card and its wrapper
        product.parentElement.remove();

        updateTotalPrice();
    }

    // 4. LIKE / UNLIKE PRODUCT
    if (clickedElement.classList.contains("fa-heart")) {

        clickedElement.classList.toggle("liked");

        if (clickedElement.classList.contains("liked")) {
            clickedElement.style.color = "red";
        } else {
            clickedElement.style.color = "black";
        }
    }

});

// Calculate the initial total price
updateTotalPrice();
