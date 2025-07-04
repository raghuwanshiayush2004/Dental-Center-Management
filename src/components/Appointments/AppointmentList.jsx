import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useData } from '../../context/DataContext';

const AppointmentList = ({ appointments, onEdit }) => {
  const { deleteAppointment } = useData();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Patient ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Cost</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.patientId}</TableCell>
              <TableCell>{appointment.title}</TableCell>
              <TableCell>{format(new Date(appointment.appointmentDate), 'MMM dd, yyyy hh:mm a')}</TableCell>
              <TableCell>{appointment.status || 'Scheduled'}</TableCell>
              <TableCell>${appointment.cost || '0'}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(appointment)}>
                  <Edit color="primary" />
                </IconButton>
                <IconButton onClick={() => deleteAppointment(appointment.id)}>
                  <Delete color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppointmentList;