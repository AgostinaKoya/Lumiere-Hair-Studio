import { Link } from "../components/Link";
import styles from "./home.module.css";

export function HomePage() {
  return (
    <>
      <section className={styles.presentation}>
        <span className={styles.badge}>Reserva online 24/7</span>

        <h1>Tu belleza merece lo mejor</h1>

        <p>
          Descubre una experiencia única de cuidado personal. Nuestros expertos
          estilistas transformarán tu look con las últimas tendencias y
          técnicas.
        </p>

        <div className={styles.actions}>
          <Link to="/services" className={styles.primaryBtn}>
            Reservar ahora
          </Link>
          <Link to="/services" className={styles.secondaryBtn}>
            Ver servicios
          </Link>
        </div>
      </section>

      <section className={styles.services}>
        <h1>Nuestros Servicios</h1>
        <p>
          Ofrecemos una amplia gama de servicios de belleza con productos de
          primera calidad
        </p>

        <div className={styles.servicesGrid}>
          <div className={styles.card}>
            <h2>Corte de cabello</h2>
            <span>Corte personalizado con lavado y secado</span>
            <div className={styles.cardFooter}>
              <div className={styles.timeContainer}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-clock-hour-5"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 12l2 3" /><path d="M12 7v5" /></svg> <span className={styles.time}>40 min</span>
              </div>
              <span className={styles.price}>$25000</span>
            </div>
          </div>

          <div className={styles.card}>
            <h2>Coloración completa</h2>
            <span>Tinte de raíz a puntas con productos premium</span>
            <div className={styles.cardFooter}>
              <div className={styles.timeContainer}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-clock-hour-5"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 12l2 3" /><path d="M12 7v5" /></svg> <span className={styles.time}>45 min</span>
              </div>
              <span className={styles.price}>$25000</span>
            </div>
          </div>

          <div className={styles.card}>
            <h2>Mechas / Balayage</h2>
            <span>Técnica de iluminación personalizada</span>
            <div className={styles.cardFooter}>
                         <div className={styles.timeContainer}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-clock-hour-5"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 12l2 3" /><path d="M12 7v5" /></svg> <span className={styles.time}>120 min</span>
              </div>
              <span className={styles.price}>$20000</span>
            </div>
          </div>

          <div className={styles.card}>
            <h2>Tratamiento capilar</h2>
            <span>Hidratación profunda con keratina</span>
            <div className={styles.cardFooter}>
                          <div className={styles.timeContainer}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-clock-hour-5"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 12l2 3" /><path d="M12 7v5" /></svg> <span className={styles.time}>120 min</span>
              </div>
              <span className={styles.price}>$45000</span>
            </div>
          </div>

          <div className={styles.card}>
            <h2>Peinado especial</h2>
            <span>Peinado para eventos y ocasiones especiales</span>
            <div className={styles.cardFooter}>
                         <div className={styles.timeContainer}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-clock-hour-5"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 12l2 3" /><path d="M12 7v5" /></svg> <span className={styles.time}>60 min</span>
              </div>
              <span className={styles.price}>$14000</span>
            </div>
          </div>

          <div className={styles.card}>
            <h2>Manicura</h2>
            <span>Cuidado completo de uñas con esmaltado</span>
            <div className={styles.cardFooter}>
                          <div className={styles.timeContainer}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-clock-hour-5"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 12l2 3" /><path d="M12 7v5" /></svg> <span className={styles.time}>45 min</span>
              </div>
              <span className={styles.price}>$12000</span>
            </div>
          </div>
        </div>

        <div className={styles.center}>
          <Link to="/services" className={styles.secondaryBtn}>
            Ver todos los servicios →
          </Link>
        </div>
      </section>

      <section className={styles.why_choose_us}>
        <h1>¿Por qué elegirnos?</h1>
        <p>En Bella Salon nos comprometemos con tu satisfacción</p>

        <div className={styles.features}>
          <div className={styles.feature}>
            <h3>Profesionales expertos</h3>
            <p>Estilistas con años de experiencia y formación continua.</p>
          </div>

          <div className={styles.feature}>
            <h3>Productos premium</h3>
            <p>Utilizamos marcas de alta gama respetuosas con tu cabello.</p>
          </div>

          <div className={styles.feature}>
            <h3>Atención personalizada</h3>
            <p>Adaptamos nuestros servicios a tus necesidades.</p>
          </div>

          <div className={styles.feature}>
            <h3>Ambiente acogedor</h3>
            <p>Un espacio pensado para tu relax y bienestar.</p>
          </div>
        </div>

        
      </section>
    </>
  );
}
