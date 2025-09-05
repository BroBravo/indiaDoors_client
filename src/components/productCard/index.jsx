import { ShoppingCart } from "lucide-react";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const handleNavigate = () => navigate("/custom-door", { state: { product } });

  return (
    <article className={styles.card} onClick={handleNavigate}>
      <div className={styles.imageWrap}>
        <img
          src={product.front_wrap}
          alt={product.name}
          className={styles.cardImage}
          loading="lazy"
        />
      </div>

      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{product.name}</h2>
        <p className={styles.priceContainer}>
          <span className={styles.mrp}>₹{product.mrp}</span>
          <span className={styles.price}>₹{product.price}</span>
        </p>
        {/* Optional actions
        <div className={styles.buttonGroup}>
          <button className={styles.cartButton}>
            <ShoppingCart size={16} /> Add to Cart
          </button>
          <button className={styles.buyButton}>Buy Now</button>
        </div> */}
      </div>
    </article>
  );
};

export default ProductCard;

