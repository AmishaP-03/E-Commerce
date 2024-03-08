import { useContext } from "react";

// Import CartContext in the consumer components as well
import { CartContext } from "../store/shopping-cart-context";

export default function Cart() {
  // Pass the required context to useContext function.
  const cartContext = useContext(CartContext);

  const totalPrice = cartContext.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {cartContext.items.length === 0 && <p>No items in cart!</p>}
      {cartContext.items.length > 0 && (
        <ul id="cart-items">
          {cartContext.items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => cartContext.onUpdateCartItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => cartContext.onUpdateCartItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
