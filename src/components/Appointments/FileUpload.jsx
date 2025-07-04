import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Button, Box, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete, AttachFile } from '@mui/icons-material';

const FileUpload = ({ appointmentId }) => {
  const { files, addFile, deleteFile } = useData();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const appointmentFiles = files.filter(f => f.appointmentId === appointmentId);

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleUpload = () => {
    selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        addFile(appointmentId, {
          id: `f${Date.now()}`,
          name: file.name,
          url: e.target.result,
          type: file.type
        });
      };
      reader.readAsDataURL(file);
    });
    setSelectedFiles([]);
  };

  return (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom>
        Attached Files
      </Typography>
      
      {appointmentFiles.length > 0 ? (
        <List>
          {appointmentFiles.map(file => (
            <ListItem 
              key={file.id} 
              secondaryAction={
                <IconButton edge="end" onClick={() => deleteFile(file.id)}>
                  <Delete />
                </IconButton>
              }
            >
              <ListItemText primary={file.name} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2">No files attached</Typography>
      )}

      <Box mt={2} display="flex" alignItems="center">
        <Button
          variant="outlined"
          component="label"
          startIcon={<AttachFile />}
          sx={{ mr: 2 }}
        >
          Select Files
          <input
            type="file"
            hidden
            multiple
            onChange={handleFileChange}
          />
        </Button>
        
        {selectedFiles.length > 0 && (
          <>
            <Typography variant="body2" sx={{ mr: 2 }}>
              {selectedFiles.length} file(s) selected
            </Typography>
            <Button 
              variant="contained" 
              onClick={handleUpload}
            >
              Upload
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default FileUpload;