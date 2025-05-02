import { createContext, useContext, useState } from 'react';

const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (item) => {
    console.log(item)
    setCartItems((prev) => [...prev, item]);
    console.log(cartItems.length===0)
  };

  const updateQuantity = (index, newQty) => {
    setCartItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, quantity: newQty } : item))
    );
  };

  const removeItem = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const checkout = () => {
    console.log("Checking out with items:", cartItems);
    // implement real checkout here
  };

  return (
    <CartContext.Provider value={{ cartItems, addItem, updateQuantity, removeItem, checkout }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
