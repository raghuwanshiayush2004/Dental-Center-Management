import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useData } from '../../context/DataContext';

const PatientList = ({ patients, onEdit }) => {
  const { deletePatient } = useData();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Health Info</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.dob}</TableCell>
              <TableCell>{patient.contact}</TableCell>
              <TableCell>{patient.healthInfo}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(patient)}>
                  <Edit color="primary" />
                </IconButton>
                <IconButton onClick={() => deletePatient(patient.id)}>
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

export default PatientList;