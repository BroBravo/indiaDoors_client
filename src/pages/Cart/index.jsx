//import { Button } from "@/components/ui/button";
//import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import styles from "./index.module.scss";
import { useCart } from "../../context/cartContext";
import { useEffect } from "react";
const CartPage = () => {
   const { cartItems, updateQuantity, removeItem, checkout, addItem } = useCart();
  const formatCurrency = (num) => `₹${num.toFixed(2)}`;


  const total = cartItems.reduce((sum, item) => {
    const doorTotal =
      item.frontWrapPrice +
      (item.backWrapPrice || 0) +
      (item.frontCarvingPrice || 0) +
      (item.backCarvingPrice || 0);
    return sum + doorTotal * item.quantity;
  }, 0);

    useEffect(() => {
    // Only add dummy item if cart is empty
    if (cartItems.length === 0) {
      addItem({
        name: "Sample Door",
        size: "36x80",
        frontWrapPrice: 150,
        backWrapPrice: 100,
        frontCarvingPrice: 75,
        backCarvingPrice: 50,
        quantity: 1,
      });
    }
  }, [cartItems]);

  return (
    <div className={styles.container}>
      <h1>🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className={styles.emptyMessage}>Your cart is empty.</p>
      ) : (
        <div className={styles.cardList}>
          {cartItems.map((item, idx) => (
            <div key={idx} className={styles.cartCard}>
              <div className={styles.cardContent}>
                <div className={styles.itemDetails}>
                  <h2>{item.name}</h2>
                  <p>Size: {item.size}(Inch)</p>
                  <p>Front Wrap: {formatCurrency(item.frontWrapPrice)}</p>
                  {item.backWrapPrice && <p>Back Wrap: {formatCurrency(item.backWrapPrice)}</p>}
                  {item.frontCarvingPrice && <p>Front Carving: {formatCurrency(item.frontCarvingPrice)}</p>}
                  {item.backCarvingPrice && <p>Back Carving: {formatCurrency(item.backCarvingPrice)}</p>}
                </div>

                <div className={styles.actions}>
                  <div className={styles.qtyControl}>
                    <button size="icon" variant="outline" onClick={() => updateQuantity(idx, item.quantity - 1)}>
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button size="icon" variant="outline" onClick={() => updateQuantity(idx, item.quantity + 1)}>
                      <Plus size={16} />
                    </button>
                  </div>

                  <p className={styles.price}>
                    {formatCurrency(
                      (item.frontWrapPrice +
                        (item.backWrapPrice || 0) +
                        (item.frontCarvingPrice || 0) +
                        (item.backCarvingPrice || 0)) * item.quantity
                    )}
                  </p>

                  <button className={styles.removeBtn} onClick={() => removeItem(idx)}>
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className={styles.totalSection}>
            <p className={styles.total}>Total: {formatCurrency(total)}</p>
            <button className={styles.checkoutBtn} onClick={checkout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
