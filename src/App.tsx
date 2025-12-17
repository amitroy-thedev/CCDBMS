import { AppProvider, useApp } from './context/AppContext';
import { Login } from './pages/Login';
import { StudentDashboard } from './pages/StudentDashboard';
import { FacultyDashboard } from './pages/FacultyDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { StaffDashboard } from './pages/StaffDashboard';
import { PlacementDashboard } from './pages/PlacementDashboard';

function AppContent() {
  const { user } = useApp();

  if (!user) {
    return <Login />;
  }

  switch (user.role) {
    case 'student':
      return <StudentDashboard />;
    case 'faculty':
      return <FacultyDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'staff':
      return <StaffDashboard />;
    case 'placement':
      return <PlacementDashboard />;
    default:
      return <Login />;
  }
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
