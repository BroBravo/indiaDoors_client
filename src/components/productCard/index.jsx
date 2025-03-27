import { ShoppingCart } from "lucide-react";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";

const ProductCard = () => {
  const navigate=useNavigate();
  const product = {
    name: "Nice Door",
    image: "door2.webp", // Placeholder image
    price: 7500,
    mrp: 9000,
  };
  const handleNavigate=()=>{
    navigate('/custom-door');
  }
  return (
    <div className={styles.card} onClick={handleNavigate}>
      <img src={product.image} alt={product.name} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{product.name}</h2>
        <p className={styles.priceContainer}>
          <span className={styles.mrp}>₹{product.mrp}</span>
          <span className={styles.price}>₹{product.price}</span>
        </p>
        {/* <div className={styles.buttonGroup}>
          <button className={styles.cartButton}>
            <ShoppingCart size={16} /> Add to Cart
          </button>
          <button className={styles.buyButton}>Buy Now</button>
        </div> */}
      </div>
    </div>
  );
};

export default ProductCard;
