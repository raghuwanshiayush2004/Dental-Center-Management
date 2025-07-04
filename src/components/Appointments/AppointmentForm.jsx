import { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { Box } from '@mui/material';
import FileUpload from './FileUpload';
import { validateAppointmentForm } from '../../utils/validation';

import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const AppointmentForm = ({ open, onClose, appointment }) => {
  const { patients, addAppointment, updateAppointment } = useData();
  const [formData, setFormData] = useState({
    id: '',
    patientId: '',
    title: '',
    description: '',
    comments: '',
    appointmentDate: new Date(),
    cost: '',
    status: 'Scheduled',
    treatment: '',
    nextDate: null
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (appointment) {
      setFormData({
        ...appointment,
        appointmentDate: new Date(appointment.appointmentDate),
        nextDate: appointment.nextDate ? new Date(appointment.nextDate) : null
      });
    } else {
      setFormData({
        id: '',
        patientId: '',
        title: '',
        description: '',
        comments: '',
        appointmentDate: new Date(),
        cost: '',
        status: 'Scheduled',
        treatment: '',
        nextDate: null
      });
    }
  }, [appointment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date, field) => {
    setFormData(prev => ({ ...prev, [field]: date }));
  };

  const handleSubmit = () => {
    const validationErrors = validateAppointmentForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const appointmentData = {
      ...formData,
      appointmentDate: formData.appointmentDate.toISOString(),
      nextDate: formData.nextDate ? formData.nextDate.toISOString() : null
    };

    if (appointment) {
      updateAppointment(appointmentData.id, appointmentData);
    } else {
      addAppointment({ ...appointmentData, id: `a${Date.now()}` });
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{appointment ? 'Edit Appointment' : 'Add New Appointment'}</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="patient-label">Patient</InputLabel>
                <Select
                  labelId="patient-label"
                  label="Patient"
                  name="patientId"
                  value={formData.patientId}
                  onChange={handleChange}
                  error={!!errors.patientId}
                  required
                >
                  {patients.map(patient => (
                    <MenuItem key={patient.id} value={patient.id}>{patient.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={!!errors.title}
                helperText={errors.title}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Appointment Date"
                value={formData.appointmentDate}
                onChange={(date) => handleDateChange(date, 'appointmentDate')}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TimePicker
                label="Appointment Time"
                value={formData.appointmentDate}
                onChange={(date) => handleDateChange(date, 'appointmentDate')}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <MenuItem value="Scheduled">Scheduled</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cost"
                name="cost"
                type="number"
                value={formData.cost}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Treatment"
                name="treatment"
                value={formData.treatment}
                onChange={handleChange}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Next Appointment Date"
                value={formData.nextDate}
                onChange={(date) => handleDateChange(date, 'nextDate')}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>
         {appointment && (
          <Box mt={3}>
            <FileUpload appointmentId={appointment.id} />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {appointment ? 'Update' : 'Add'} Appointment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentForm;
