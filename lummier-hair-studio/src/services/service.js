const API_URL = "https://lummier-hair-studio-ize3yjtlc-koyaagostina-gmailcoms-projects.vercel.app";

export const getServices = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const url = query ? `${API_URL}/services?${query}` : `${API_URL}/services`;
  
  const response = await fetch(url);
  if (!response.ok) throw new Error("Error fetching services");
  return response.json();
};

// export const getSalonInfo = async () => {
//   return salon.data;
// }

// export const getAppointmentsByDate = async (date) => {
//   return appointmentsData.appointments.filter(
//     (a) => a.date === date
//   );
// };

// export const createAppointment = async (appointment) => {
//   appointmentsData.appointments.push({
//     id: Date.now(),
//     ...appointment
//   });

//     return { success: true };
// };