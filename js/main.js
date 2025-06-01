const list = document.getElementById("game-list");
const search = document.getElementById("search");
const cartCount = document.getElementById("cart-count");

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartCount.textContent = cart.length;
}

function renderGames(filter = "") {
  list.innerHTML = "";
  const filtered = games.filter(g => g.name.toLowerCase().includes(filter.toLowerCase()));
  filtered.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
      <img src="${game.image}" width="100%">
      <h3>${game.name}</h3>
      <p>$${game.price}</p>
      <a href="game.html?id=${game.id}">View</a>
      <button onclick="addToCart(${game.id})">Add to Cart</button>
    `;
    list.appendChild(card);
  });
}

function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!cart.includes(id)) cart.push(id);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

search.addEventListener("input", e => renderGames(e.target.value));
renderGames();
updateCartCount();
