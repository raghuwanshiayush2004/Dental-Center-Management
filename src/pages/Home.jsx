import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import StatsCard from '../components/Dashboard/StatsCard';
import AdminDashboard from '../components/Dashboard/AdminDashboard';
import PatientDashboard from '../components/Dashboard/PatientDashboard';

const Home = () => {
  const { user, isAdmin } = useAuth();
  const { appointments, patients } = useData();

  if (isAdmin()) {
    return <AdminDashboard appointments={appointments} patients={patients} />;
  }

  return <PatientDashboard />;
};

export default Home;