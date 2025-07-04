import { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { validatePatientForm } from '../../utils/validation';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  Grid 
} from '@mui/material';

const PatientForm = ({ open, onClose, patient }) => {
  const { addPatient, updatePatient } = useData();
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    dob: '',
    contact: '',
    healthInfo: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (patient) {
      setFormData(patient);
    } else {
      setFormData({
        id: '',
        name: '',
        dob: '',
        contact: '',
        healthInfo: ''
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const validationErrors = validatePatientForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (patient) {
      updatePatient(formData.id, formData);
    } else {
      addPatient({ ...formData, id: `p${Date.now()}` });
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{patient ? 'Edit Patient' : 'Add New Patient'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={!!errors.dob}
              helperText={errors.dob}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contact Number"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              error={!!errors.contact}
              helperText={errors.contact}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Health Information"
              name="healthInfo"
              value={formData.healthInfo}
              onChange={handleChange}
              multiline
              rows={3}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {patient ? 'Update' : 'Add'} Patient
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PatientForm;