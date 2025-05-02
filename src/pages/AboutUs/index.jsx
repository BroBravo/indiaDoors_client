import styles from "./index.module.scss";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AboutContactPage = () => {
   const location = useLocation();
   useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      }
    }
  }, [location]);
  
  return (
    <div className={styles.container}>
      
      {/* About Us */}
      <section id="about" className={styles.section}>
        <h2 className={styles.heading}>About Us</h2>
        <p className={styles.text}>
          <strong>LamiDoors</strong> is a trusted name in the laminate door manufacturing industry,
          offering a wide range of high-quality, aesthetically pleasing, and durable laminate door solutions
          for homes, offices, and commercial spaces.
          <strong>LamiDoors</strong> is a trusted name in the laminate door manufacturing industry,
          offering a wide range of high-quality, aesthetically pleasing, and durable laminate door solutions
          for homes, offices, and commercial spaces.
          <strong>LamiDoors</strong> is a trusted name in the laminate door manufacturing industry,
          offering a wide range of high-quality, aesthetically pleasing, and durable laminate door solutions
          for homes, offices, and commercial spaces.
        </p>

        {/* Director’s Vision */}
        <div className={styles.subsection}>
          <h3 className={styles.subheading}>Director’s Vision</h3>
          <p className={styles.text}>
            Our Director, <strong>Mr. Aslam Soofi</strong>, envisions IndiaDoors as a forward-thinking,
            innovation-driven company that sets new benchmarks in design and sustainability. With over a decade of experience in Sales,
             Our Director, <strong>Mr. Aslam Soofi</strong>, envisions IndiaDoors as a forward-thinking,
            innovation-driven company that sets new benchmarks in design and sustainability. With over a decade of experience in Sales, 
             Our Director, <strong>Mr. Aslam Soofi</strong>, envisions IndiaDoors as a forward-thinking,
            innovation-driven company that sets new benchmarks in design and sustainability. With over a decade of experience in Sales, 
             Our Director, <strong>Mr. Aslam Soofi</strong>, envisions IndiaDoors as a forward-thinking,
            innovation-driven company that sets new benchmarks in design and sustainability. With over a decade of experience in Sales,  
          </p>
        </div>

        {/* Expansion Policies */}
        <div className={styles.subsection}>
          <h3 className={styles.subheading}>Company Expansion Policies</h3>
          <p className={styles.text}>
            We are actively expanding through:
          </p>
          <ul className={styles.list}>
            <li>Eco-friendly manufacturing units.</li>
            <li>Wider distribution networks in Tier 1 & Tier 2 cities.</li>
            <li>Ongoing R&D for better design and durability.</li>
            <li>International exhibitions and partnerships.</li>
          </ul>
        </div>
      </section>

      {/* Contact Us */}
      <section id="contact" className={styles.section}>
        <h2 className={styles.heading}>Contact Us</h2>
        <p className={styles.text}>We're here to help with any questions or custom orders.</p>

        {/* Contact Info */}
        <div className={styles.infoCard}>
          <div>
            <strong>📍 Address:</strong><br />
            Apple Industries<br />
           76/2 Machal, Mohna Road, Mohana,<br />
            Madhya Pradesh, 453115
          </div>
          <div>
            <strong>📞 Phone:</strong><br />
            +91 98765 43210
          </div>
          <div>
            <strong>✉️ Email:</strong><br />
            contact@lamidoors.com
          </div>

          {/* Google Map Embed */}
          <div className={styles.mapContainer}>
            <iframe
              title="IndiaDoors Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4743.587419975274!2d75.67981731269323!3d22.694352926999933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39625530e8bb68eb%3A0x199fde09a280a08!2sApple%20Industries!5e0!3m2!1sen!2sin!4v1744886739362!5m2!1sen!2sin"
              loading="lazy"
              className={styles.map}
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <form className={styles.form}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="text" placeholder="Phone Number" />
          <textarea rows="5" placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
};

export default AboutContactPage;

