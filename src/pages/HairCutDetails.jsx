import storeShedule from "../storeSchedule.json";
import styles from "./haircut.module.css";
import { useParams } from "react-router";
import cortes from "../cortes.json";
import { useEffect, useState } from "react";
import { TurnsSelectContext } from "../context/TurnsSelectContext";
import { useContext } from "react";



import { getAppointmentsByDate } from "../services/service";


function generateSlots(openTime, closeTime, slot) {
  const slots = [];

  const [openHour, openMinute] = openTime.split(":").map(Number);
  const [closeHour, closeMinute] = closeTime.split(":").map(Number);

  let current = new Date();
  current.setHours(openHour, openMinute, 0, 0);

  const end = new Date();
  end.setHours(closeHour, closeMinute, 0, 0);

  while (current < end) {
    const hour = current.getHours().toString().padStart(2, "0");
    const minute = current.getMinutes().toString().padStart(2, "0");

    slots.push(`${hour}:${minute}`);

    current.setMinutes(current.getMinutes() + slot);
  }

  return slots;
}


// Helper para pasar "HH:mm" a minutos totales
const timeToMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};



export function HairCutDetails( ) {

  const [date, setDate] = useState("");
  const [occupiedhours, setOccupedHours] = useState([]);
  const [hours, setHours] = useState([]);

  
 
  //CONTEXTO
  const { getCutTimer } = useContext(TurnsSelectContext);
  const durationHairCut = getCutTimer();
  
 useEffect(() => {
    if (!date) return;

    async function loadAppointments() {
      const appointments = await getAppointmentsByDate(date);
      const occupied = appointments.map((a) => a.startTime);


      setOccupedHours(occupied);

      console.log("Turnos ocupados:", occupied);
    }

    loadAppointments();
  }, [date]);
 

  useEffect(() => {
      if (!date) return;

    const slot = 30;

    const dateObj = new Date(date);
    const days = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];

    const dayName = days[dateObj.getDay()];

    const scheduleForDay = storeShedule.storeSchedule.find(
      (s) => s.dayOfWeek === dayName
    );

    if (!scheduleForDay || scheduleForDay.isClosed) {
      setHours([]);
      return;
    }

    const openTime = scheduleForDay.openTime;
    const closeTime = scheduleForDay.closeTime;

    const hoursPerDay = generateSlots(
      openTime,
      closeTime,
      slot
    );

    const availableHours = hoursPerDay.filter((hour) => {
      const startMinutes = timeToMinutes(hour);
      
      // Asegúrate de usar un valor por defecto si durationHairCut es undefined
      const duration = durationHairCut || 30; 
      const endMinutes = startMinutes + duration;
      
      // 1. Verificamos si el turno termina después del horario de cierre
      const closeMinutes = timeToMinutes(closeTime);
      if (endMinutes > closeMinutes) return false;

      // 2. Verificamos si algún turno ocupado "pisa" nuestro intervalo
      const isBlocked = occupiedhours.some((occ) => {
        const occStart = timeToMinutes(occ);
        // Un turno está bloqueado si el inicio ocupado cae DENTRO de nuestro rango
        // O si nuestro inicio cae DENTRO del turno ocupado (para evitar solapamientos complejos)
        return occStart >= startMinutes && occStart < endMinutes;
      });

      return !isBlocked;
    });


    setHours(availableHours);

    
  }, [date, occupiedhours]);

  const handleChangeDate = (e) => {

    const select = e.target.value;
    setDate(select);

  }

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
          min={new Date().toISOString().split("T")[0]} // Establece la fecha mínima como hoy
          
        />
      </div>

      <h2>Horarios disponibles</h2>
     {
      hours.length > 0 ? (
        <div className={styles.hoursList}>
          {hours.map((hour) => (
            <button key={hour} className={styles.hourItem}>
              {hour}
            </button>
          ))}
        </div>
      ) : (
        <p>No hay horarios disponibles para la fecha seleccionada.</p>
      )
      }
      
      <section className={styles.actions}>
        <button className={styles.cancelButton}>Atrás</button>
        <button className={styles.submitButton}>Continuar</button>
      </section>
    </div>
  );

}