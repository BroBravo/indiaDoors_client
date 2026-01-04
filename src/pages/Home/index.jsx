import Slider from "../../components/slider";
import Products from "../../components/products";
import styles from "./index.module.scss";
import { Helmet } from "react-helmet";

function Home() {
  return (
    <>
      <Helmet>
        <title>Home | India Doors</title>
      </Helmet>

      <div className={styles.page}>
        {/* ONLY SLIDER */}
        <section className={styles.heroRow}>
          <div className={styles.sliderCol}>
            <Slider />
          </div>
        </section>

        <Products />
      </div>
    </>
  );
}

export default Home;

