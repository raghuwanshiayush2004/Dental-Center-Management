import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Layout from './components/Shared/Layout';
import ProtectedRoute from './components/Shared/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import Calendar from './pages/Calendar';

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="patients" element={<ProtectedRoute><Patients /></ProtectedRoute>} />
              <Route path="appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
              <Route path="calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
            </Route>
          </Routes>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;