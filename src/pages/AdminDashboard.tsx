import { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card } from '../components/Card';
import { Table } from '../components/Table';
import { Modal } from '../components/Modal';
import { Toast } from '../components/Toast';
import { Edit2, Trash2, Plus, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Student, Faculty, Staff } from '../data/mockData';

type AdminView = 'overview' | 'students' | 'faculty' | 'staff' | 'reports' | 'settings';

export function AdminDashboard() {
  const { students, faculty, staff, addStudent, deleteStudent, addFaculty, deleteFaculty, addStaff, deleteStaff } = useApp();
  const [activeView, setActiveView] = useState<AdminView>('overview');
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState<'student' | 'faculty' | 'staff'>('student');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [formData, setFormData] = useState<any>({});

  const sidebarItems = [
    { label: 'Overview', onClick: () => setActiveView('overview'), active: activeView === 'overview' },
    { label: 'Student Management', onClick: () => setActiveView('students'), active: activeView === 'students' },
    { label: 'Faculty Management', onClick: () => setActiveView('faculty'), active: activeView === 'faculty' },
    { label: 'Staff Management', onClick: () => setActiveView('staff'), active: activeView === 'staff' },
    { label: 'Reports', onClick: () => setActiveView('reports'), active: activeView === 'reports' },
    { label: 'System Settings', onClick: () => setActiveView('settings'), active: activeView === 'settings' }
  ];

  const handleAdd = (type: 'student' | 'faculty' | 'staff') => {
    setModalType(type);
    setFormData({});
    setShowAddModal(true);
  };

  const handleEdit = (type: string, id: string) => {
    setToast({ message: `Edit ${type} ${id} - Feature coming soon`, type: 'success' });
  };

  const handleDelete = (type: 'student' | 'faculty' | 'staff', id: string) => {
    if (type === 'student') {
      deleteStudent(id);
      setToast({ message: 'Student deleted successfully', type: 'success' });
    } else if (type === 'faculty') {
      deleteFaculty(id);
      setToast({ message: 'Faculty deleted successfully', type: 'success' });
    } else if (type === 'staff') {
      deleteStaff(id);
      setToast({ message: 'Staff deleted successfully', type: 'success' });
    }
  };

  const handleExport = () => {
    setToast({ message: 'Data exported successfully', type: 'success' });
  };

  const handleSubmitAdd = () => {
    if (modalType === 'student') {
      const newStudent: Student = {
        id: `S${Date.now()}`,
        name: formData.name || '',
        rollNo: formData.rollNo || '',
        program: formData.program || '',
        year: parseInt(formData.year) || 1,
        semester: parseInt(formData.semester) || 1,
        gpa: parseFloat(formData.gpa) || 0,
        attendance: parseInt(formData.attendance) || 0,
        email: formData.email || '',
        phone: formData.phone || '',
        address: formData.address || ''
      };
      addStudent(newStudent);
      setToast({ message: 'Student added successfully', type: 'success' });
    } else if (modalType === 'faculty') {
      const newFaculty: Faculty = {
        id: `F${Date.now()}`,
        name: formData.name || '',
        department: formData.department || '',
        designation: formData.designation || '',
        email: formData.email || '',
        phone: formData.phone || '',
        joiningDate: formData.joiningDate || new Date().toISOString().split('T')[0],
        courses: []
      };
      addFaculty(newFaculty);
      setToast({ message: 'Faculty added successfully', type: 'success' });
    } else if (modalType === 'staff') {
      const newStaff: Staff = {
        id: `ST${Date.now()}`,
        name: formData.name || '',
        department: formData.department || '',
        designation: formData.designation || '',
        email: formData.email || '',
        phone: formData.phone || '',
        joiningDate: formData.joiningDate || new Date().toISOString().split('T')[0]
      };
      addStaff(newStaff);
      setToast({ message: 'Staff added successfully', type: 'success' });
    }
    setShowAddModal(false);
    setFormData({});
  };

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <p className="text-sm text-gray-600 mb-1">Total Students</p>
                <p className="text-3xl font-bold text-blue-600">{students.length}</p>
              </Card>
              <Card>
                <p className="text-sm text-gray-600 mb-1">Total Faculty</p>
                <p className="text-3xl font-bold text-green-600">{faculty.length}</p>
              </Card>
              <Card>
                <p className="text-sm text-gray-600 mb-1">Total Staff</p>
                <p className="text-3xl font-bold text-orange-600">{staff.length}</p>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Recent Students">
                <Table
                  columns={[
                    { key: 'name', header: 'Name' },
                    { key: 'rollNo', header: 'Roll No' },
                    { key: 'program', header: 'Program' }
                  ]}
                  data={students.slice(0, 3)}
                />
              </Card>
              <Card title="Recent Faculty">
                <Table
                  columns={[
                    { key: 'name', header: 'Name' },
                    { key: 'department', header: 'Department' },
                    { key: 'designation', header: 'Designation' }
                  ]}
                  data={faculty}
                />
              </Card>
            </div>
          </div>
        );

      case 'students':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">Student Management</h2>
              <div className="flex gap-3">
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button
                  onClick={() => handleAdd('student')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Student
                </button>
              </div>
            </div>

            <Card>
              <Table
                columns={[
                  { key: 'id', header: 'ID' },
                  { key: 'name', header: 'Name' },
                  { key: 'rollNo', header: 'Roll No' },
                  { key: 'program', header: 'Program' },
                  { key: 'year', header: 'Year' },
                  {
                    key: 'actions',
                    header: 'Actions',
                    render: (_, row) => (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit('student', row.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete('student', row.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )
                  }
                ]}
                data={students}
              />
            </Card>
          </div>
        );

      case 'faculty':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">Faculty Management</h2>
              <div className="flex gap-3">
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button
                  onClick={() => handleAdd('faculty')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Faculty
                </button>
              </div>
            </div>

            <Card>
              <Table
                columns={[
                  { key: 'id', header: 'ID' },
                  { key: 'name', header: 'Name' },
                  { key: 'department', header: 'Department' },
                  { key: 'designation', header: 'Designation' },
                  { key: 'email', header: 'Email' },
                  {
                    key: 'actions',
                    header: 'Actions',
                    render: (_, row) => (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit('faculty', row.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete('faculty', row.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )
                  }
                ]}
                data={faculty}
              />
            </Card>
          </div>
        );

      case 'staff':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">Staff Management</h2>
              <div className="flex gap-3">
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <button
                  onClick={() => handleAdd('staff')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Staff
                </button>
              </div>
            </div>

            <Card>
              <Table
                columns={[
                  { key: 'id', header: 'ID' },
                  { key: 'name', header: 'Name' },
                  { key: 'department', header: 'Department' },
                  { key: 'designation', header: 'Designation' },
                  { key: 'joiningDate', header: 'Joining Date' },
                  {
                    key: 'actions',
                    header: 'Actions',
                    render: (_, row) => (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit('staff', row.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete('staff', row.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )
                  }
                ]}
                data={staff}
              />
            </Card>
          </div>
        );

      case 'reports':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Reports</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Academic Reports">
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Student Performance Report
                  </button>
                  <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Course Enrollment Report
                  </button>
                  <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Attendance Summary Report
                  </button>
                </div>
              </Card>

              <Card title="Administrative Reports">
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Faculty Workload Report
                  </button>
                  <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Placement Statistics Report
                  </button>
                  <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Department Wise Summary
                  </button>
                </div>
              </Card>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">System Settings</h2>

            <Card title="General Settings">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institution Name
                  </label>
                  <input
                    type="text"
                    defaultValue="ABC College of Engineering"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Academic Year
                  </label>
                  <input
                    type="text"
                    defaultValue="2024-2025"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Semester
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Semester 1</option>
                    <option>Semester 2</option>
                  </select>
                </div>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Save Settings
                </button>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <DashboardLayout sidebarItems={sidebarItems} sidebarTitle="Admin Portal">
        {renderContent()}
      </DashboardLayout>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title={`Add ${modalType.charAt(0).toUpperCase() + modalType.slice(1)}`}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {modalType === 'student' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Roll Number
                </label>
                <input
                  type="text"
                  value={formData.rollNo || ''}
                  onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Program
                </label>
                <input
                  type="text"
                  value={formData.program || ''}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., B.Tech CSE"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year
                  </label>
                  <input
                    type="number"
                    value={formData.year || ''}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1-4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Semester
                  </label>
                  <input
                    type="number"
                    value={formData.semester || ''}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1-8"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}
          {(modalType === 'faculty' || modalType === 'staff') && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  value={formData.department || ''}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Designation
                </label>
                <input
                  type="text"
                  value={formData.designation || ''}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add
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
