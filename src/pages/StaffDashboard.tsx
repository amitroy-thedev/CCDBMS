import { DashboardLayout } from '../components/DashboardLayout';
import { Card } from '../components/Card';
import { User, Building2, Calendar, Mail, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function StaffDashboard() {
  const { user, staff: staffList } = useApp();
  const staff = staffList.find((s) => s.id === user?.id);

  const sidebarItems = [
    { label: 'My Profile', onClick: () => {}, active: true }
  ];

  return (
    <DashboardLayout sidebarItems={sidebarItems} sidebarTitle="Staff Portal">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {staff?.name}!</h2>
          <p className="text-gray-600">View your profile information</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Department</p>
                <p className="font-semibold">{staff?.department}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Designation</p>
                <p className="font-semibold">{staff?.designation}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Joining Date</p>
                <p className="font-semibold">{staff?.joiningDate}</p>
              </div>
            </div>
          </Card>
        </div>

        <Card title="Profile Information">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Staff ID
                </label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold">{staff?.id}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Full Name
                </label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold">{staff?.name}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Department
                </label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold">{staff?.department}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Designation
                </label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold">{staff?.designation}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </div>
                </label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold">{staff?.email}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </div>
                </label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold">{staff?.phone}</p>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Joining Date
                  </div>
                </label>
                <div className="px-4 py-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold">{staff?.joiningDate}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 italic">
                This is a read-only profile. Contact the administrator to update your information.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
