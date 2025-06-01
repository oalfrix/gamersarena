const amountField = document.getElementById("amount");
const cartData = JSON.parse(localStorage.getItem("cart")) || [];
let totalAmount = 0;
cartData.forEach(id => {
  const game = games.find(g => g.id == id);
  if (game) totalAmount += game.price;
});
amountField.value = totalAmount;
