// Initialize mock data if not exists
const initializeData = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([
      { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
      { id: "2", role: "Patient", email: "john@entnt.in", password: "patient123", patientId: "p1" }
    ]));
  }

  if (!localStorage.getItem('patients')) {
    localStorage.setItem('patients', JSON.stringify([
      {
        id: "p1",
        name: "John Doe",
        dob: "1990-05-10",
        contact: "1234567890",
        healthInfo: "No allergies"
      }
    ]));
  }

  if (!localStorage.getItem('appointments')) {
    localStorage.setItem('appointments', JSON.stringify([
      {
        id: "11",
        patientId: "p1",
        title: "Toothache",
        description: "Upper molar pain",
        comments: "Sensitive to cold",
        appointmentDate: "2025-07-01T10:00:00",
        cost: 80,
        status: "Completed",
        treatment: "Filling",
        nextDate: "2025-07-15T10:00:00"
      }
    ]));
  }

  if (!localStorage.getItem('files')) {
    localStorage.setItem('files', JSON.stringify([
      { id: "f1", appointmentId: "11", name: "invoice.pdf", url: "base64string-or-blob-url" },
      { id: "f2", appointmentId: "11", name: "xray.png", url: "base64string-or-blob-url" }
    ]));
  }
};

initializeData();

// User functions
export const getUsers = () => JSON.parse(localStorage.getItem('users')) || [];
export const getCurrentUser = () => JSON.parse(localStorage.getItem('currentUser'));
export const setCurrentUser = (user) => localStorage.setItem('currentUser', JSON.stringify(user));

// Patient functions
export const getPatients = () => JSON.parse(localStorage.getItem('patients')) || [];
export const savePatients = (patients) => localStorage.setItem('patients', JSON.stringify(patients));

// Appointment functions
export const getAppointments = () => JSON.parse(localStorage.getItem('appointments')) || [];
export const saveAppointments = (appointments) => localStorage.setItem('appointments', JSON.stringify(appointments));

// File functions
export const getFiles = () => JSON.parse(localStorage.getItem('files')) || [];
export const saveFiles = (files) => localStorage.setItem('files', JSON.stringify(files));