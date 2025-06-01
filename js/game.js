const detail = document.getElementById("game-detail");
const id = new URLSearchParams(window.location.search).get("id");
const game = games.find(g => g.id == id);
if (game) {
  detail.innerHTML = `
    <img src="${game.image}" width="300">
    <h2>${game.name}</h2>
    <p>${game.description}</p>
    <p><strong>Requirements:</strong> ${game.requirements}</p>
    <p><strong>Price:</strong> $${game.price}</p>
    <button onclick="addToCart(${game.id})">Add to Cart</button>
  `;
}
