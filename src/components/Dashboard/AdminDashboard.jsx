import { useState } from 'react';
import { format } from 'date-fns';
import StatsCard from './StatsCard';
import { Box, Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const AdminDashboard = ({ appointments, patients }) => {
  const [timeRange, setTimeRange] = useState('upcoming');
  
  const upcomingAppointments = appointments
    .filter(a => new Date(a.appointmentDate) > new Date())
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
    .slice(0, 10);

  const completedAppointments = appointments.filter(a => a.status === 'Completed');
  const pendingAppointments = appointments.filter(a => a.status !== 'Completed');
  const revenue = completedAppointments.reduce((sum, a) => sum + (a.cost || 0), 0);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard title="Total Patients" value={patients.length} color="primary" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard title="Upcoming Appointments" value={upcomingAppointments.length} color="secondary" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard title="Completed Treatments" value={completedAppointments.length} color="success" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard title="Total Revenue" value={`$${revenue}`} color="warning" />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Upcoming Appointments (Next 10)
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Patient</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {upcomingAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.patientId}</TableCell>
                <TableCell>{appointment.title}</TableCell>
                <TableCell>{format(new Date(appointment.appointmentDate), 'MMM dd, yyyy hh:mm a')}</TableCell>
                <TableCell>{appointment.status || 'Scheduled'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminDashboard;