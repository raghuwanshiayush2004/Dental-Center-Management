import { Paper, Typography } from '@mui/material';

const StatsCard = ({ title, value, color = 'primary' }) => {
  const colorMap = {
    primary: '#3b82f6',
    secondary: '#10b981',
    success: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        backgroundColor: colorMap[color] + '20',
        borderLeft: `4px solid ${colorMap[color]}`,
      }}
    >
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h4" component="div">
        {value}
      </Typography>
    </Paper>
  );
};

export default StatsCard;