import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existing = cart.find((food) => food.id === item.id);

    if (existing) {
      setCart(
        cart.map((food) =>
          food.id === item.id
            ? { ...food, quantity: food.quantity + 1 }
            : food
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...item,
          quantity: 1,
        },
      ]);
    }
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((food) =>
        food.id === id
          ? {
              ...food,
              quantity: food.quantity + 1,
            }
          : food
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((food) =>
          food.id === id
            ? {
                ...food,
                quantity: food.quantity - 1,
              }
            : food
        )
        .filter((food) => food.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((food) => food.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);