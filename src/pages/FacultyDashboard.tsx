import { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card } from '../components/Card';
import { Table } from '../components/Table';
import { Modal } from '../components/Modal';
import { Toast } from '../components/Toast';
import { Edit2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockCourses, mockGrades } from '../data/mockData';

type FacultyView = 'overview' | 'profile' | 'courses' | 'students' | 'marks';

export function FacultyDashboard() {
  const { user, faculty: facultyList, students } = useApp();
  const [activeView, setActiveView] = useState<FacultyView>('overview');
  const [showMarksModal, setShowMarksModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [marks, setMarks] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const faculty = facultyList.find((f) => f.id === user?.id);
  const facultyCourses = mockCourses.filter((c) => faculty?.courses.includes(c.id));
  const courseStudents = students.filter((s) =>
    facultyCourses.some((c) => c.semester === s.semester)
  );

  const sidebarItems = [
    { label: 'Overview', onClick: () => setActiveView('overview'), active: activeView === 'overview' },
    { label: 'My Profile', onClick: () => setActiveView('profile'), active: activeView === 'profile' },
    { label: 'My Courses', onClick: () => setActiveView('courses'), active: activeView === 'courses' },
    { label: 'Student List', onClick: () => setActiveView('students'), active: activeView === 'students' },
    { label: 'Enter Marks', onClick: () => setActiveView('marks'), active: activeView === 'marks' }
  ];

  const handleEnterMarks = (student: any) => {
    setSelectedStudent(student);
    const existingGrade = mockGrades.find(
      (g) => g.studentId === student.id && g.courseId === facultyCourses[0]?.id
    );
    setMarks(existingGrade?.marks.toString() || '');
    setShowMarksModal(true);
  };

  const handleSubmitMarks = () => {
    setShowMarksModal(false);
    setToast({ message: 'Marks submitted successfully (demo)', type: 'success' });
    setSelectedStudent(null);
    setMarks('');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {faculty?.name}!</h2>
              <p className="text-gray-600">{faculty?.designation} - {faculty?.department}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <p className="text-sm text-gray-600 mb-1">Total Courses</p>
                <p className="text-3xl font-bold text-blue-600">{facultyCourses.length}</p>
              </Card>
              <Card>
                <p className="text-sm text-gray-600 mb-1">Total Students</p>
                <p className="text-3xl font-bold text-green-600">{courseStudents.length}</p>
              </Card>
              <Card>
                <p className="text-sm text-gray-600 mb-1">Department</p>
                <p className="text-xl font-bold text-gray-900">{faculty?.department}</p>
              </Card>
            </div>

            <Card title="My Courses">
              <Table
                columns={[
                  { key: 'code', header: 'Course Code' },
                  { key: 'name', header: 'Course Name' },
                  { key: 'credits', header: 'Credits' },
                  { key: 'semester', header: 'Semester' }
                ]}
                data={facultyCourses}
              />
            </Card>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">My Profile</h2>
            <Card>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600">Faculty ID</p>
                  <p className="font-semibold">{faculty?.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold">{faculty?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Department</p>
                  <p className="font-semibold">{faculty?.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Designation</p>
                  <p className="font-semibold">{faculty?.designation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold">{faculty?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold">{faculty?.phone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Joining Date</p>
                  <p className="font-semibold">{faculty?.joiningDate}</p>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'courses':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">My Courses</h2>
            <Card>
              <Table
                columns={[
                  { key: 'code', header: 'Course Code' },
                  { key: 'name', header: 'Course Name' },
                  { key: 'credits', header: 'Credits' },
                  { key: 'semester', header: 'Semester' }
                ]}
                data={facultyCourses}
              />
            </Card>
          </div>
        );

      case 'students':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Student List</h2>
            <Card>
              <Table
                columns={[
                  { key: 'name', header: 'Student Name' },
                  { key: 'rollNo', header: 'Roll No' },
                  { key: 'program', header: 'Program' },
                  { key: 'semester', header: 'Semester' },
                  {
                    key: 'marks',
                    header: 'Marks',
                    render: (_, row) => {
                      const grade = mockGrades.find(
                        (g) => g.studentId === row.id && faculty?.courses.includes(g.courseId)
                      );
                      return grade ? grade.marks : '-';
                    }
                  }
                ]}
                data={courseStudents}
              />
            </Card>
          </div>
        );

      case 'marks':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Enter Marks</h2>
            <Card>
              <Table
                columns={[
                  { key: 'name', header: 'Student Name' },
                  { key: 'rollNo', header: 'Roll No' },
                  {
                    key: 'marks',
                    header: 'Current Marks',
                    render: (_, row) => {
                      const grade = mockGrades.find(
                        (g) => g.studentId === row.id && faculty?.courses.includes(g.courseId)
                      );
                      return grade ? grade.marks : '-';
                    }
                  },
                  {
                    key: 'actions',
                    header: 'Actions',
                    render: (_, row) => (
                      <button
                        onClick={() => handleEnterMarks(row)}
                        className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Enter Marks
                      </button>
                    )
                  }
                ]}
                data={courseStudents}
              />
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <DashboardLayout sidebarItems={sidebarItems} sidebarTitle="Faculty Portal">
        {renderContent()}
      </DashboardLayout>

      <Modal
        isOpen={showMarksModal}
        onClose={() => setShowMarksModal(false)}
        title="Enter Marks"
      >
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Student</p>
            <p className="font-semibold">{selectedStudent?.name} ({selectedStudent?.rollNo})</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Course</p>
            <p className="font-semibold">{facultyCourses[0]?.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Marks (out of 100)
            </label>
            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              min="0"
              max="100"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setShowMarksModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitMarks}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit
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
