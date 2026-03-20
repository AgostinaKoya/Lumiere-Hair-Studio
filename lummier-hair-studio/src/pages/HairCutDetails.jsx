import styles from "./haircut.module.css";
import { Link, useParams } from "react-router";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { TurnsSelectContext } from "../context/TurnsSelectContext";
import { useContext } from "react";
import { useAuthStore } from "../store/authStore";
import cortes from "../cortes.json";


//TODO 
// Mostrar todos los horarios, si estan ocupados, deshabilidarlos...
// Los Lunes no se trabaja. Generar una API con los dias abiertos y cerrados. 

export function HairCutDetails() {
  const { haircutId } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [occupiedhours, setOccupedHours] = useState([]);
  const [hours, setHours] = useState([]);

  const [selectedTime, setSelectedTime] = useState(null);

  //CONTEXTO Para obtener la duracion del corte seleccionada.
  const { getCutTimer, setItemsSelect, updateTurnData } =
    useContext(TurnsSelectContext);


  //STORE CON ZUSTAND
  const { isLoggedIn, user } = useAuthStore();


  useEffect(() => {
    if (!date) return;
    const fetchData = async () =>{
    try{
      const response = await fetch(`http://localhost:1234/appointments/available?date=${date}`)

        if (!response.ok) {
          throw new Error("Error en la respuesta");
        }
          const result = await response.json()
          const available = result.available
          const occupaid = result.occupaid
          setHours(available)
         // setOccupedHours(occupaid)  

    }catch (error){
      console.log(error)
    }
    }

    fetchData()


  }, [date]);

  const handleChangeDate = (e) => {
    const select = e.target.value;
    setDate(select);
  };


  const handleConfirm = async () => {
    if (!date || !selectedTime) return;

    try{

    const selectedService = cortes.data.find((item) => String(item.id) === String(haircutId));
    const nameService = selectedService?.name || "Servicio desconocido";

    const response = await fetch("http://localhost:1234/appointments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              date,
              startTime: selectedTime,
              serviceId: haircutId,
              nameService,
            }),
            credentials: 'include' 
          });

        if (!response.ok) {
        throw new Error("Error al crear el turno");
      }
          
          updateTurnData({
            date,
            time: selectedTime,
          });

          navigate("/success");
    }catch (error){
        if(error) throw new Error("No se pudo confirmar el turno")
    }

    
  };

  return (
    <div className={styles.container}>
      <h2>Fechas disponibles</h2>

      <div className={styles.dateField}>
        <label>Fecha</label>

        <input
          type="date"
          className={styles.dateInput}
          value={date}
          onChange={handleChangeDate}
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      <h2>Horarios disponibles</h2>
      {hours.length > 0 ? (
        <div className={styles.hoursList}>
          {hours.map((hour) => (
            <button
              key={hour}
              className={styles.hourItem}
              onClick={() => setSelectedTime(hour)}
            >
              {hour}
            </button>
          ))}
        </div>
      ) : (
        <p>No hay horarios disponibles para la fecha seleccionada.</p>
      )}

      <section className={styles.actions}>
        <button onClick={() => navigate(-1)} className={styles.cancelButton}>
          Atrás
        </button>

        {isLoggedIn ? (
          <button
            onClick={handleConfirm}
            className={styles.submitButton}
            disabled={!selectedTime}
          >
            Continuar
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className={styles.registerButton}
          >
            Inicia sesion para confirmar
          </button>
        )}
      </section>
    </div>
  );
}
