export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validatePatientForm = (patient) => {
  const errors = {};
  if (!patient.name) errors.name = 'Name is required';
  if (!patient.dob) errors.dob = 'Date of birth is required';
  if (!patient.contact) errors.contact = 'Contact is required';
  return errors;
};

export const validateAppointmentForm = (appointment) => {
  const errors = {};
  if (!appointment.title) errors.title = 'Title is required';
  if (!appointment.patientId) errors.patientId = 'Patient is required';
  if (!appointment.appointmentDate) errors.appointmentDate = 'Date is required';
  return errors;
};