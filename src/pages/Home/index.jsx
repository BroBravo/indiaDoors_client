import Slider from "../../components/slider"
import Products from "../../components/products"
import styles from "./index.module.scss"
import { Helmet } from "react-helmet";
function Home(){

    return(
        <>
        <Helmet>
                    <title>Home | India Doors</title>
        </Helmet>
        <div>
             
           <div className={styles.containerImageItems}>
            <Slider/> 
            <div className={styles.containerColumn}>
                <div className={styles.containerColumnItems}></div>
                <div className={styles.containerColumnItems} style={{marginTop:'10px'}}></div>
            </div>
           </div> 
            
            <Products/>
            
        </div>
        </>
    )
}

export default Home