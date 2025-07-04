import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { format } from 'date-fns';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const PatientDashboard = () => {
  const { user } = useAuth();
  const { patients, getPatientAppointments } = useData();
  
  const patient = patients.find(p => p.id === user.patientId);
  const appointments = getPatientAppointments(user.patientId);

  const upcomingAppointments = appointments
    .filter(a => new Date(a.appointmentDate) > new Date())
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));

  const pastAppointments = appointments
    .filter(a => new Date(a.appointmentDate) <= new Date())
    .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome, {patient?.name || 'Patient'}
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Upcoming Appointments
      </Typography>
      {upcomingAppointments.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {upcomingAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.title}</TableCell>
                  <TableCell>{format(new Date(appointment.appointmentDate), 'MMM dd, yyyy hh:mm a')}</TableCell>
                  <TableCell>{appointment.status || 'Scheduled'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1">No upcoming appointments</Typography>
      )}

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Treatment History
      </Typography>
      {pastAppointments.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Treatment</TableCell>
                <TableCell>Cost</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pastAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.title}</TableCell>
                  <TableCell>{format(new Date(appointment.appointmentDate), 'MMM dd, yyyy hh:mm a')}</TableCell>
                  <TableCell>{appointment.treatment || '-'}</TableCell>
                  <TableCell>${appointment.cost || '0'}</TableCell>
                  <TableCell>{appointment.status || 'Completed'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1">No past appointments</Typography>
      )}
    </Box>
  );
};

export default PatientDashboard;