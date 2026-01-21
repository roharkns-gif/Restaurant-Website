let orderList = [];
let adminMode = false;

function addToOrder(name, price) {
  orderList.push(`${name} ($${price})`);
  document.getElementById("orderItems").value = orderList.join(", ");
}

function toggleAdmin() {
  adminMode = !adminMode;
  document.querySelectorAll(".card h3, .card p").forEach(el => {
    el.contentEditable = adminMode;
    el.style.border = adminMode ? "1px dashed red" : "none";
  });
  alert(adminMode ? "Admin Edit Mode ON" : "Admin Edit Mode OFF");
}

document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("custName").value;
  const phone = document.getElementById("custPhone").value;
  const address = document.getElementById("custAddress").value;
  const items = document.getElementById("orderItems").value;

  const msg = `New Order:%0AName: ${name}%0APhone: ${phone}%0AAddress: ${address}%0AOrder: ${items}`;
  window.open(`https://wa.me/1234567890?text=${msg}`, "_blank");
});
