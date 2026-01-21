function toggleMenu() {
  document.querySelector(".menu").classList.toggle("show");
}

function addToOrder(item) {
  const textarea = document.getElementById("orderDetails");
  textarea.value += item + ", ";
}

document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Order submitted successfully!");
  this.reset();
});
