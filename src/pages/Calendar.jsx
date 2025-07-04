import { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay, isWithinInterval } from 'date-fns';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Box, Typography, Paper, Grid, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const Calendar = () => {
  const { appointments } = useData();
  const { isAdmin } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  if (!isAdmin()) {
    return <Typography>Unauthorized</Typography>;
  }

  const nextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const prevWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };

  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';
    return (
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <IconButton onClick={prevWeek}>
          <ChevronLeft />
        </IconButton>
        <Typography variant="h6">
          {format(currentDate, dateFormat)}
        </Typography>
        <IconButton onClick={nextWeek}>
          <ChevronRight />
        </IconButton>
      </Box>
    );
  };

  const renderDays = () => {
    const dateFormat = 'EEE';
    const days = [];
    let startDate = startOfWeek(currentDate);

    for (let i = 0; i < 7; i++) {
      days.push(
        <Grid item xs key={i}>
          <Typography align="center" fontWeight="bold">
            {format(addDays(startDate, i), dateFormat)}
          </Typography>
        </Grid>
      );
    }

    return (
      <Grid container spacing={1} mb={1}>
        {days}
      </Grid>
    );
  };

  const renderCells = () => {
    const startDate = startOfWeek(currentDate);
    const rows = [];
    let days = [];

    for (let i = 0; i < 7; i++) {
      const day = addDays(startDate, i);
      const dayAppointments = appointments.filter(appointment => 
        isSameDay(new Date(appointment.appointmentDate), day)
      );

      days.push(
        <Grid item xs key={i}>
          <Paper 
            elevation={isSameDay(day, selectedDate) ? 3 : 1} 
            onClick={() => setSelectedDate(day)}
            sx={{ 
              p: 1, 
              minHeight: 100,
              backgroundColor: isSameDay(day, new Date()) ? '#f0f0f0' : 'white',
              cursor: 'pointer'
            }}
          >
            <Typography variant="body2" mb={1}>
              {format(day, 'd')}
            </Typography>
            {dayAppointments.map((appointment, idx) => (
              <Typography 
                key={idx} 
                variant="caption" 
                display="block" 
                sx={{ 
                  backgroundColor: '#e3f2fd',
                  p: 0.5,
                  borderRadius: 1,
                  mb: 0.5
                }}
              >
                {appointment.title}
              </Typography>
            ))}
          </Paper>
        </Grid>
      );
    }
    rows.push(
      <Grid container spacing={1} key={startDate}>
        {days}
      </Grid>
    );
    
    return rows;
  };

  const renderSelectedDateAppointments = () => {
    const selectedAppointments = appointments.filter(appointment => 
      isSameDay(new Date(appointment.appointmentDate), selectedDate)
    );

    if (selectedAppointments.length === 0) {
      return <Typography>No appointments scheduled for this day</Typography>;
    }

    return (
      <Box mt={4}>
        <Typography variant="h6" mb={2}>
          Appointments on {format(selectedDate, 'MMMM d, yyyy')}
        </Typography>
        {selectedAppointments.map((appointment, idx) => (
          <Paper key={idx} sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle1">{appointment.title}</Typography>
            <Typography variant="body2">Patient: {appointment.patientId}</Typography>
            <Typography variant="body2">Time: {format(new Date(appointment.appointmentDate), 'hh:mm a')}</Typography>
            {appointment.status && <Typography variant="body2">Status: {appointment.status}</Typography>}
          </Paper>
        ))}
      </Box>
    );
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Calendar View
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </Paper>
      {renderSelectedDateAppointments()}
    </Box>
  );
};

export default Calendar;