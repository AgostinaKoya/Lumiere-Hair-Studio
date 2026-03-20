import servicesData from "../cortes.json";
import appointmentsData from "../appoiments.json"
import salon from "../salon.json";


export const getServices = async () => {
  return servicesData.data;
};

export const getSalonInfo = async () => {
  return salon.data;
}

export const getAppointmentsByDate = async (date) => {
  return appointmentsData.appointments.filter(
    (a) => a.date === date
  );
};

export const createAppointment = async (appointment) => {
  appointmentsData.appointments.push({
    id: Date.now(),
    ...appointment
  });

    return { success: true };
};