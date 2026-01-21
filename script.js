// Smooth scrolling for nav links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Menu category switching
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.menu-category').forEach(cat => cat.classList.remove('active'));
        this.classList.add('active');
        document.getElementById(this.dataset.category).classList.add('active');
    });
});

// Order form handling
const orderForm = document.getElementById('order-form');
const orderSummary = document.getElementById('order-summary');
let selectedItems = [];

document.querySelectorAll('.item-card').forEach(card => {
    card.addEventListener('click', function() {
        const id = this.dataset.id;
        const name = this.querySelector('.item-name').textContent;
        const price = this.querySelector('.item-price').textContent;
        selectedItems.push({ id, name, price });
        updateOrderSummary();
    });
});

function updateOrderSummary() {
    orderSummary.innerHTML = '<h3>Order Summary:</h3>';
    let total = 0;
    selectedItems.forEach(item => {
        orderSummary.innerHTML += `<p>${item.name} - ${item.price}</p>`;
        total += parseFloat(item.price.replace('$', ''));
    });
    orderSummary.innerHTML += `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;
}

orderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const address = document.getElementById('customer-address').value;
    const message = `Order from ${name}, Phone: ${phone}, Address: ${address}. Items: ${selectedItems.map(i => i.name).join(', ')}. Total: $${selectedItems.reduce((sum, i) => sum + parseFloat(i.price.replace('$', '')), 0).toFixed(2)}`;
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(message)}`, '_blank');
});

// Admin edit mode
let editMode = false;
const adminToggle = document.getElementById('admin-toggle');

adminToggle.addEventListener('click', toggleEditMode);
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        toggleEditMode();
    }
});

function toggleEditMode() {
    editMode = !editMode;
    document.querySelectorAll('.item-name, .item-price').forEach(el => {
        if (editMode) {
            el.contentEditable = true;
            el.style.border = '1px solid #ccc';
            el.addEventListener('blur', saveChanges);
        } else {
            el.contentEditable = false;
            el.style.border = 'none';
        }
    });
    adminToggle.textContent = editMode ? 'Exit Admin Edit' : 'Admin Edit';
}

function saveChanges(e) {
    const key = e.target.className + '-' + e.target.closest('.item-card').dataset.id;
    localStorage.setItem(key, e.target.textContent);
}

// Load saved changes on page load
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.item-name, .item-price').forEach(el => {
        const key = el.className + '-' + el.closest('.item-card').dataset.id;
        const saved = localStorage.getItem(key);
        if (saved) el.textContent = saved;
    });
});
