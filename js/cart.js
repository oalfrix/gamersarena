const cartItems = document.getElementById("cart-items");
const total = document.getElementById("cart-total");
const cart = JSON.parse(localStorage.getItem("cart")) || [];
let sum = 0;
cart.forEach(id => {
  const game = games.find(g => g.id == id);
  if (game) {
    const item = document.createElement("div");
    item.innerHTML = `<p>${game.name} - $${game.price}</p>`;
    cartItems.appendChild(item);
    sum += game.price;
  }
});
total.textContent = sum;
