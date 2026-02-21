import cortes from "../cortes.json";
import { HaircutsCard } from "../components/HaircutsCard";
import styles from "./services.module.css";


import { getServices } from "../services/service";
import { useEffect, useState } from "react";


export function Services(){

  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServices();
      setServices(data);
    };

    fetchServices();
  }, []);


    return (
        <div className={styles.container}>
        <h1>Servicios</h1>
        <p>Descubre nuestros servicios de belleza personalizados para realzar tu estilo único.</p>

      <section className={styles.services_selects}>
      <h2>Selecciona un servicio</h2>
      <div className={styles.servicesList}>
      {services.map((haircut) => (
        <HaircutsCard key={haircut.id} haircut={haircut} />
      ))}

      </div>
      </section>
        </div>
    )
}