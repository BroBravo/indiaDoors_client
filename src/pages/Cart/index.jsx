//import { Button } from "@/components/ui/button";
//import { Card, CardContent } from "@/components/ui/card";
import {  ArrowRightCircle, LucideTrash , LucideEdit} from "lucide-react";
import styles from "./index.module.scss";
import { useCart } from "../../context/cartContext";
import { useUser } from "../../context/userContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
const CartPage = () => {
  const { cartItems, updateQuantity, removeItem, checkout, addItem } = useCart();
  const formatCurrency = (num) => `₹${num.toFixed(2)}`;
  const {user,loading}=useUser();
  const navigate=useNavigate();
  const baseWoodPrice=70;
  
 const total = cartItems.reduce((sum, item) => {
     const quantity = Number(item.quantity) || 0;
     const doorTotal = Number(item.item_amount);
  return sum + doorTotal * quantity;
}, 0);

useEffect(() => {
  if (!user) {
    navigate("/home");
  }
}, [user, navigate]);

 

  return (

    <>
       <Helmet>
                <title>Your cart | India Doors</title>
       </Helmet>
    <div className={styles.container}>
       
      <h1>🛒 My Cart</h1>

      {cartItems.length === 0 ? (
        <p className={styles.emptyMessage}>Your cart is empty.</p>
      ) : (
        <div className={styles.cardList}>
          {cartItems.map((item, idx) => (
            <div key={idx} className={styles.cartCard}>
              <div className={styles.cardContent}>
                <div className={styles.itemImage}>
                   <img
                    src={item.front_wrap_image}
                    alt="Front of door"
                  />
                </div>
                <div className={styles.itemDetails}>
                  <h2>{item.item_name}</h2>
                  <p><strong>Size:</strong> {item.width_in}(inch) x {item.height_in}(inch)</p>
                  <p><strong>Base Price:</strong> {formatCurrency(+baseWoodPrice * ((+item.width_in * +item.height_in) / 144))}</p>
                  {<p><strong>Front wrap:</strong> {item.front_wrap} {formatCurrency(+item.front_wrap_price)}</p>}
                  {<p><strong>Back wrap:</strong> {item.back_wrap} {formatCurrency(+item.back_wrap_price)}</p>}
                  {<p><strong>Front carving:</strong> {item.front_carving} {formatCurrency(+item.front_carving_price)}</p>}
                  {<p><strong>Back carving:</strong> {item.back_carving} {formatCurrency(+item.back_carving_price)}</p>}
                </div>

                <div className={styles.actions}>
                  <div className={styles.qtyControl}>
                    {/* <button size="icon" variant="outline" onClick={() => updateQuantity(idx, item.quantity - 1)}>
                      <Minus size={16} />
                    </button> */}
                    <div><strong>Quantity:</strong><span> {item.quantity}</span></div>
                    
                    {/* <button size="icon" variant="outline" onClick={() => updateQuantity(idx, item.quantity + 1)}>
                      <Plus size={16} />
                    </button> */}
                  </div>

                  <p className={styles.price}>Price:<br/>
                    {formatCurrency(
                      (+item.front_wrap_price +
                        (+item.back_wrap_price || 0) +
                        (+item.front_carving_price || 0) +
                        (+item.back_carving_price || 0) +
                        (baseWoodPrice*(item.width_in * item.height_in)/144)).toFixed(2) * item.quantity
                    )}
                  </p>
                  <button className={styles.removeBtn} style={{color:"#3b82f6"}} onClick={()=>{
                          const product=item;
                          console.log(product);
                          navigate('/custom-door',{ state: { product } });
                        }}><LucideEdit size={16}/>Edit item</button>
                  <button className={styles.removeBtn} onClick={() => removeItem(idx, item.id)}>
                    <LucideTrash size={16} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className={styles.totalSection}>
            <p className={styles.total}>Total: {formatCurrency(total)}</p>
            <button className={styles.checkoutBtn}  onClick={checkout}>
              Proceed to Checkout &nbsp;<ArrowRightCircle/>
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default CartPage;
