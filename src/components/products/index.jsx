import ProductCard from "../productCard"
import styles from "./index.module.scss"
function products(){
    return(
        <div className={styles.sectionContainer}> 
            
            <div className={styles.section}>
                <ProductCard></ProductCard>
            </div>
        </div>
    );
}

export default products