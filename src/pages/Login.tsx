import { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { useApp, UserRole } from '../context/AppContext';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(null);
  const [error, setError] = useState('');
  const { login } = useApp();

  const demoCredentials = [
    { role: 'student' as UserRole, username: 'john.doe', password: 'student123', label: 'Student' },
    { role: 'faculty' as UserRole, username: 'anil.kumar', password: 'faculty123', label: 'Faculty' },
    { role: 'admin' as UserRole, username: 'admin', password: 'admin123', label: 'Admin' },
    { role: 'staff' as UserRole, username: 'ramesh.das', password: 'staff123', label: 'Staff' },
    { role: 'placement' as UserRole, username: 'placement', password: 'placement123', label: 'Placement' }
  ];

  const handleDemoLogin = (demo: typeof demoCredentials[0]) => {
    setUsername(demo.username);
    setPassword(demo.password);
    setRole(demo.role);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password || !role) {
      setError('Please fill all fields');
      return;
    }

    const success = login(username, password, role);
    if (!success) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">CCDBMS</h1>
          <p className="text-gray-600 mt-1">Centralized College Database Management System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              value={role || ''}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin (Registrar)</option>
              <option value="staff">Non-Teaching Staff</option>
              <option value="placement">Placement Officer</option>
            </select>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Login
          </button>

          <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or Quick Login</span>
          </div>
        </div>


          <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">Quick Login (Demo Credentials)</p>
          <div className="grid grid-cols-2 gap-2">
            {demoCredentials.map((demo) => (
              <button
                key={demo.role}
                type="button"
                onClick={() => handleDemoLogin(demo)}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-colors text-gray-700"
              >
                {demo.label}
              </button>
            ))}
          </div>
          </div>
          
        </form>
      </div>
    </div>
  );
}
