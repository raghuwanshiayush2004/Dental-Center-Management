import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '@mui/material';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold text-primary">Dental Center</Link>
          {user && (
            <div className="hidden md:flex space-x-4">
              <Link to="/" className="text-gray-700 hover:text-primary">Dashboard</Link>
              {isAdmin() && (
                <>
                  <Link to="/patients" className="text-gray-700 hover:text-primary">Patients</Link>
                  <Link to="/appointments" className="text-gray-700 hover:text-primary">Appointments</Link>
                  <Link to="/calendar" className="text-gray-700 hover:text-primary">Calendar</Link>
                </>
              )}
            </div>
          )}
        </div>
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Hello, {user.email}</span>
            <Button variant="outlined" color="error" onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
          <Link to="/login" className="text-gray-700 hover:text-primary">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;