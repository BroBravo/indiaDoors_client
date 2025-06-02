import ProductCard from "../productCard"
import styles from "./index.module.scss"
import axios from "axios";
import { useEffect, useState } from "react";
function Products(){

  const [products, setProducts] = useState([]); // Store product data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/product/productList") 
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

    return(
        
            
            <div className={styles.section}>
                {products.map((product) => (
                    <ProductCard key={product.product_id} product={product} />
                ))}
            </div>
        
    );
}

export default Products;