import storeShedule from "../storeSchedule.json";
import styles from "./haircut.module.css";
import { useParams } from "react-router";
import cortes from "../cortes.json";
import { useState } from "react";
import {TurnsSelectContext} from "../context/TurnsSelectContext";
import { useContext } from "react";




//Debe calcularlo el bakcend, pero lo hago acá para probar la lógica

function generateAvailableSlots({
  openTime,
  closeTime,
  durationMinutes,
  bookedSlots,
}) {
  const slots = [];

  const [openHour, openMin] = openTime.split(":").map(Number);
  const [closeHour, closeMin] = closeTime.split(":").map(Number);
 

  let current = new Date();
  current.setHours(openHour, openMin, 0, 0);

  const end = new Date();
  end.setHours(closeHour, closeMin, 0, 0);

  while (current < end) {
    const time = current.toTimeString().slice(0, 5);

    if (!bookedSlots.includes(time)) {
      slots.push(time);
    }

    current.setMinutes(current.getMinutes() + durationMinutes);
  }

 
  return slots;
}

export function HairCutDetails() {

  const { haircutId } = useParams();
  const { itemSelect, addService } = useContext(TurnsSelectContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(null);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateFormatted = maxDate.toISOString().split("T")[0];
   
  const haircut = cortes.data.find((h) => h.id === parseInt(haircutId));


  
  const dayOfWeek = selectedDate
    .toLocaleDateString("en-CA", { weekday: "long" })
    .toUpperCase();


  const schedule = storeShedule.storeSchedule.find(
    (s) => s.dayOfWeek === dayOfWeek,
  );

    let availableSlots = [];

    if (schedule && haircut && !schedule.isClosed) {
    availableSlots = generateAvailableSlots({
        openTime: schedule.openTime,
        closeTime: schedule.closeTime,
        durationMinutes: haircut.durationMinutes,
        bookedSlots: [],
    });
    }


        const handleDateChange = (e) => {
        const [year, month, day] = e.target.value.split("-");
        const date = new Date(year, month - 1, day);
        

        console.log("Selected date:", date);


        setSelectedDate(date);
};

 const handleHourChange  = (slot) => {
  const selectedHour = slot;

    console.log("Selected hour:", selectedHour);
    setSelectedHour(selectedHour);
 }

  return (
    <div className={styles.container}>
      <h1>{haircut.name}</h1>

      <p>{haircut.description}</p>

      <h2>Fechas disponibles</h2>

<div className={styles.dateField}>
  <label>Fecha</label>

    
    <input
        type="date"
        className={styles.dateInput}
        value={selectedDate.toLocaleDateString("en-CA")}
        min={new Date().toLocaleDateString("en-CA")}
        onChange={handleDateChange}
        max={maxDateFormatted}
        
    />
    </div>

      <h2>Horarios disponibles</h2>

        {schedule?.isClosed ? (
        <p className={styles.closed}>Cerrado</p>
        ) : (
        <div className={styles.slots}
            >
            {availableSlots.map((slot) => (
            <button className={selectedHour === slot ? styles.activeSlot : ""} onClick={() => handleHourChange(slot)} key={slot}>{slot}</button>
            ))}
        </div>
        )}


        <section className={styles.actions}>
            <button className={styles.cancelButton}>Atrás</button>
            <button className={styles.submitButton}>Continuar</button>
        </section>
    </div>

    

    
  );
}
