import { useContext } from "react";
import { TurnsSelectContext } from "../context/TurnsSelectContext";
import styles from "./orderSuccess.module.css"; // Supongamos que tienes estilos aquí
import { useNavigate } from "react-router";


export function PageOrderSuccess() {
  // 1. Accedemos al estado global del contexto
 const { itemSelect, clearTurn } = useContext(TurnsSelectContext);
 const navigate = useNavigate();

  if (!itemSelect) return <p>Cargando...</p>;


  const handleInit = () =>{

    clearTurn();

    navigate('/')


  }

  return (
    <div className={styles.container}>
      <h2>¡Turno confirmado con éxito!</h2>
      
      <div className={styles.details}>
        <p><strong>Servicio:</strong> {itemSelect.serviceName}</p>
        <p><strong>Duración:</strong> {itemSelect.duration} minutos</p>
        <p><strong>Fecha:</strong> {itemSelect.date}</p>
        <p><strong>Hora:</strong> {itemSelect.time}</p>
      </div>

      <button onClick={handleInit}>
        Volver al inicio
      </button>
    </div>
  );
}