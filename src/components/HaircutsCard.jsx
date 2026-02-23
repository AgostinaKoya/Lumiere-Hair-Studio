import styles from "./haircutsCard.module.css";
import { Link } from "./Link";
 import {TurnsSelectContext} from "../context/TurnsSelectContext";
 import { useContext } from "react";

export const HaircutsCard = ({ haircut }) => {

   const { addService } = useContext(TurnsSelectContext);

   const handleClick = () => {
     addService(haircut.id, haircut.durationMinutes);
    
    console.log("Selected haircut ID:", haircut.id, "Duration:", haircut.durationMinutes);
   };


  return (
    <Link href={`/services/${haircut.id}`} className={styles.cardContent} onClick={handleClick}> 
      <div className={styles.card}>
        <div className={styles.left}>
          <span className={styles.name}>{haircut.name}</span>
          <span className={styles.description}>{haircut.description}</span>
          <span className={styles.meta}>
            {haircut.category} •  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-clock-hour-5"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 12l2 3" /><path d="M12 7v5" /></svg> <span className={styles.meta}>{haircut.durationMinutes} min</span>
          </span>
        </div>

        <div className={styles.right}>
          <span className={styles.price}>${haircut.price}</span>

        </div>
      </div>
    </Link>
  );
};


