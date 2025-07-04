import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import PatientList from '../components/Patients/PatientList';
import PatientForm from '../components/Patients/PatientForm';
import { Button, Box, Typography } from '@mui/material';

const Patients = () => {
  const { patients } = useData();
  const { isAdmin } = useAuth();
  const [openForm, setOpenForm] = useState(false);
  const [editPatient, setEditPatient] = useState(null);

  if (!isAdmin()) {
    return <Typography>Unauthorized</Typography>;
  }

  const handleEdit = (patient) => {
    setEditPatient(patient);
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
    setEditPatient(null);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Patient Management
        </Typography>
        <Button variant="contained" onClick={() => setOpenForm(true)}>
          Add New Patient
        </Button>
      </Box>

      <PatientList patients={patients} onEdit={handleEdit} />

      <PatientForm 
        open={openForm} 
        onClose={handleClose} 
        patient={editPatient} 
      />
    </Box>
  );
};

export default Patients;