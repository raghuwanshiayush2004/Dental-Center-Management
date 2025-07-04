import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import AppointmentList from '../components/Appointments/AppointmentList';
import AppointmentForm from '../components/Appointments/AppointmentForm';
import { Button, Box, Typography } from '@mui/material';

const Appointments = () => {
  const { appointments } = useData();
  const { isAdmin } = useAuth();
  const [openForm, setOpenForm] = useState(false);
  const [editAppointment, setEditAppointment] = useState(null);

  if (!isAdmin()) {
    return <Typography>Unauthorized</Typography>;
  }

  const handleEdit = (appointment) => {
    setEditAppointment(appointment);
    setOpenForm(true);
  };

  const handleClose = () => {
    setOpenForm(false);
    setEditAppointment(null);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Appointment Management
        </Typography>
        <Button variant="contained" onClick={() => setOpenForm(true)}>
          Add New Appointment
        </Button>
      </Box>

      <AppointmentList appointments={appointments} onEdit={handleEdit} />

      <AppointmentForm 
        open={openForm} 
        onClose={handleClose} 
        appointment={editAppointment} 
      />
    </Box>
  );
};

export default Appointments;