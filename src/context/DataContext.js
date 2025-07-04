import { createContext, useContext, useState, useEffect } from 'react';
import { 
  getPatients, 
  savePatients, 
  getAppointments, 
  saveAppointments, 
  getFiles, 
  saveFiles 
} from '../utils/storage';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setPatients(getPatients());
    setAppointments(getAppointments());
    setFiles(getFiles());
  }, []);

  const addPatient = (patient) => {
    const newPatients = [...patients, patient];
    setPatients(newPatients);
    savePatients(newPatients);
  };

  const updatePatient = (id, updatedPatient) => {
    const newPatients = patients.map(p => p.id === id ? updatedPatient : p);
    setPatients(newPatients);
    savePatients(newPatients);
  };

  const deletePatient = (id) => {
    const newPatients = patients.filter(p => p.id !== id);
    setPatients(newPatients);
    savePatients(newPatients);
  };

  const addAppointment = (appointment) => {
    const newAppointments = [...appointments, appointment];
    setAppointments(newAppointments);
    saveAppointments(newAppointments);
  };

  const updateAppointment = (id, updatedAppointment) => {
    const newAppointments = appointments.map(a => a.id === id ? updatedAppointment : a);
    setAppointments(newAppointments);
    saveAppointments(newAppointments);
  };

  const deleteAppointment = (id) => {
    const newAppointments = appointments.filter(a => a.id !== id);
    setAppointments(newAppointments);
    saveAppointments(newAppointments);
  };

  const addFile = (appointmentId, file) => {
    const newFiles = [...files, { ...file, appointmentId }];
    setFiles(newFiles);
    saveFiles(newFiles);
  };
     const deleteFile = (fileId) => {
    const newFiles = files.filter(f => f.id !== fileId);
    setFiles(newFiles);
    saveFiles(newFiles);
  };

  const getPatientAppointments = (patientId) => {
    return appointments.filter(a => a.patientId === patientId);
  };

  const getAppointmentFiles = (appointmentId) => {
    return files.filter(f => f.appointmentId === appointmentId);
  };


  return (
    <DataContext.Provider value={{
      patients,
      appointments,
      files,
      addPatient,
      updatePatient,
      deletePatient,
      addAppointment,
      updateAppointment,
      deleteAppointment,
      addFile,
      deleteFile,
      getPatientAppointments,
      getAppointmentFiles
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);