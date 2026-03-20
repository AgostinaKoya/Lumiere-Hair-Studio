import { useEffect, useState } from "react"

export const Dashboard = () => {

    const [appoiment , setAppoiments] = useState(null)

    useEffect(()=> {

        const fecthData = async () =>{
            try{
                const response  = await fetch("http://localhost:1234/appointments", {
                      method: "GET",
                      credentials: "include", 
                })

                if(!response.ok) {
                  console.error("Error en la respuesta de /appointments", response.status);
                  setAppoiments([]);
                  return;
                }

                const data = await response.json();
                console.log("la data de mis turnos", data);

                
                setAppoiments(data);
            } catch(error){
                console.error("Error en la respuesta", error);
                setAppoiments([]);
            }
        }


        fecthData()

    }, [])





    return(
        <>
        <h1>Mis turnos</h1>
        {appoiment?.length > 0 ? (
            
          <ul>
            {appoiment.map((turno) => (
                
              <li key={turno.id}>
                {turno.date} - {turno.startTime} - Servicio: {turno.service.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No tienes turnos programados</p>
        )}
        </>
    )
}