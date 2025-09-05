import Slider from "../../components/slider";
import Products from "../../components/products";
import styles from "./index.module.scss";
import { Helmet } from "react-helmet";

function Home() {
  return (
    <>
      <Helmet><title>Home | India Doors</title></Helmet>

      <div className={styles.page}>
       <section className={`${styles.heroRow} ${styles.fullBleed}`}>
        <div className={styles.sliderCol}>
            <Slider />
        </div>

        <aside className={styles.sideCol}>
            <div className={styles.sideBox} />
            <div className={styles.sideBox} />
        </aside>
       </section>


        <Products />
      </div>
    </>
  );
}

export default Home;
