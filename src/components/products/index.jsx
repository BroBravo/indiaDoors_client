import ProductCard from "../productCard";
import styles from "./index.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";

function Products() {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/product/productList`)
      .then((response) => {
        setProducts(response.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, [baseURL]);

  if (loading) return <p className={styles.stateText}>Loading...</p>;
  if (error)   return <p className={styles.stateText}>{error}</p>;

  return (
    <section className={styles.productsSection}>
      <div className={styles.grid}>
        {products.map((p) => (
          <ProductCard key={p.product_id} product={p} />
        ))}
      </div>
    </section>
  );
}

export default Products;
