import { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card, StatCard } from '../components/Card';
import { Table } from '../components/Table';
import { Modal } from '../components/Modal';
import { Toast } from '../components/Toast';
import { Plus, Briefcase, TrendingUp, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PlacementRecord } from '../data/mockData';

type PlacementView = 'overview' | 'placements' | 'statistics';

export function PlacementDashboard() {
  const { students, placements, addPlacement } = useApp();
  const [activeView, setActiveView] = useState<PlacementView>('overview');
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [formData, setFormData] = useState<any>({});

  const sidebarItems = [
    { label: 'Overview', onClick: () => setActiveView('overview'), active: activeView === 'overview' },
    { label: 'Placement Records', onClick: () => setActiveView('placements'), active: activeView === 'placements' },
    { label: 'Statistics', onClick: () => setActiveView('statistics'), active: activeView === 'statistics' }
  ];

  const placedStudents = placements.length;
  const totalStudents = students.length;
  const placementPercentage = totalStudents > 0 ? ((placedStudents / totalStudents) * 100).toFixed(1) : '0';
  const highestPackage = placements.length > 0 ? '₹7 LPA' : '₹0 LPA';

  const handleAddPlacement = () => {
    const selectedStudent = students.find(s => s.id === formData.studentId);
    if (!selectedStudent) {
      setToast({ message: 'Please select a student', type: 'error' });
      return;
    }

    const newPlacement: PlacementRecord = {
      id: `P${Date.now()}`,
      studentId: formData.studentId,
      studentName: selectedStudent.name,
      rollNo: selectedStudent.rollNo,
      company: formData.company || '',
      role: formData.role || '',
      package: formData.package || '',
      status: 'Offer Received',
      offerDate: formData.offerDate || new Date().toISOString().split('T')[0]
    };

    addPlacement(newPlacement);
    setShowAddModal(false);
    setFormData({});
    setToast({ message: 'Placement record added successfully', type: 'success' });
  };

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Placement Dashboard</h2>
              <p className="text-gray-600">Manage student placement records and statistics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard
                label="Total Placements"
                value={placedStudents}
                icon={<Briefcase className="w-8 h-8" />}
              />
              <StatCard
                label="Placement Rate"
                value={`${placementPercentage}%`}
                icon={<TrendingUp className="w-8 h-8" />}
              />
              <StatCard
                label="Total Students"
                value={totalStudents}
                icon={<Users className="w-8 h-8" />}
              />
              <StatCard
                label="Highest Package"
                value={highestPackage}
                icon={<Briefcase className="w-8 h-8" />}
              />
            </div>

            <Card title="Recent Placements">
              <Table
                columns={[
                  { key: 'studentName', header: 'Student' },
                  { key: 'rollNo', header: 'Roll No' },
                  { key: 'company', header: 'Company' },
                  { key: 'role', header: 'Role' },
                  { key: 'package', header: 'Package' },
                  {
                    key: 'status',
                    header: 'Status',
                    render: (value) => (
                      <span className="inline-flex px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full">
                        {value}
                      </span>
                    )
                  }
                ]}
                data={placements}
              />
            </Card>
          </div>
        );

      case 'placements':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">Placement Records</h2>
              <button
                onClick={() => {
                  setFormData({});
                  setShowAddModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Placement
              </button>
            </div>

            <Card>
              <Table
                columns={[
                  { key: 'id', header: 'ID' },
                  { key: 'studentName', header: 'Student Name' },
                  { key: 'rollNo', header: 'Roll No' },
                  { key: 'company', header: 'Company' },
                  { key: 'role', header: 'Role' },
                  { key: 'package', header: 'Package' },
                  {
                    key: 'status',
                    header: 'Status',
                    render: (value) => (
                      <span className="inline-flex px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full">
                        {value}
                      </span>
                    )
                  },
                  { key: 'offerDate', header: 'Offer Date' }
                ]}
                data={placements}
              />
            </Card>
          </div>
        );

      case 'statistics':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Placement Statistics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Company-wise Placements">
                <div className="space-y-4">
                  {Array.from(new Set(placements.map((p) => p.company))).map((company) => {
                    const count = placements.filter((p) => p.company === company).length;
                    return (
                      <div key={company} className="flex justify-between items-center">
                        <span className="font-medium">{company}</span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                          {count} {count === 1 ? 'student' : 'students'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card title="Package Distribution">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">₹6-7 LPA</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      {placements.length} students
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Average Package</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      ₹6.5 LPA
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Highest Package</span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                      {highestPackage}
                    </span>
                  </div>
                </div>
              </Card>

              <Card title="Role Distribution">
                <div className="space-y-4">
                  {Array.from(new Set(placements.map((p) => p.role))).map((role) => {
                    const count = placements.filter((p) => p.role === role).length;
                    return (
                      <div key={role} className="flex justify-between items-center">
                        <span className="font-medium">{role}</span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card title="Placement Status">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Placed Students</span>
                    <span className="text-2xl font-bold text-green-600">{placedStudents}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Students</span>
                    <span className="text-2xl font-bold text-gray-900">{totalStudents}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Placement Rate</span>
                      <span className="text-2xl font-bold text-blue-600">{placementPercentage}%</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <DashboardLayout sidebarItems={sidebarItems} sidebarTitle="Placement Portal">
        {renderContent()}
      </DashboardLayout>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Placement Record"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Student
            </label>
            <select
              value={formData.studentId || ''}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} ({student.rollNo})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={formData.company || ''}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="e.g., TCS, Infosys, Wipro"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <input
              type="text"
              value={formData.role || ''}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g., Software Engineer"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Package
            </label>
            <input
              type="text"
              value={formData.package || ''}
              onChange={(e) => setFormData({ ...formData, package: e.target.value })}
              placeholder="e.g., ₹7 LPA"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Offer Date
            </label>
            <input
              type="date"
              value={formData.offerDate || ''}
              onChange={(e) => setFormData({ ...formData, offerDate: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAddPlacement}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Placement
            </button>
          </div>
        </div>
      </Modal>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
