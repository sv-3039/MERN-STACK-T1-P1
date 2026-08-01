import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item
  const addToCart = (item) => {
    const existingItem = cart.find((food) => food.id === item.id);

    if (existingItem) {
      setCart(
        cart.map((food) =>
          food.id === item.id
            ? {
                ...food,
                quantity: food.quantity + 1,
              }
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

  // Increase quantity
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

  // Decrease quantity
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

  // Remove item
  const removeFromCart = (id) => {
    setCart(cart.filter((food) => food.id !== id));
  };

  // Clear cart
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
};

// ⭐ IMPORTANT
export const useCart = () => {
  return useContext(CartContext);
};