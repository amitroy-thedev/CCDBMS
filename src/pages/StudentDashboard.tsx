import { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { StatCard, Card } from '../components/Card';
import { Table } from '../components/Table';
import { GraduationCap, BookOpen, TrendingUp, Calendar, Briefcase } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockGrades, mockCourses } from '../data/mockData';

type StudentView = 'overview' | 'profile' | 'courses' | 'grades' | 'attendance' | 'placement';

export function StudentDashboard() {
  const { user, students, placements } = useApp();
  const [activeView, setActiveView] = useState<StudentView>('overview');

  const student = students.find((s) => s.id === user?.id);
  const studentGrades = mockGrades.filter((g) => g.studentId === user?.id);
  const studentCourses = mockCourses.filter((c) => c.semester === student?.semester);
  const studentPlacement = placements.find((p) => p.studentId === user?.id);

  const sidebarItems = [
    { label: 'Overview', onClick: () => setActiveView('overview'), active: activeView === 'overview' },
    { label: 'My Profile', onClick: () => setActiveView('profile'), active: activeView === 'profile' },
    { label: 'My Courses', onClick: () => setActiveView('courses'), active: activeView === 'courses' },
    { label: 'My Grades', onClick: () => setActiveView('grades'), active: activeView === 'grades' },
    { label: 'Attendance', onClick: () => setActiveView('attendance'), active: activeView === 'attendance' },
    { label: 'Placement', onClick: () => setActiveView('placement'), active: activeView === 'placement' }
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {student?.name}!</h2>
              <p className="text-gray-600">Here's your academic overview</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard label="Current GPA" value={student?.gpa || 0} icon={<TrendingUp className="w-8 h-8" />} />
              <StatCard label="Attendance" value={`${student?.attendance}%`} icon={<Calendar className="w-8 h-8" />} />
              <StatCard label="Current Semester" value={student?.semester || 0} icon={<BookOpen className="w-8 h-8" />} />
            </div>

            <Card title="Recent Grades">
              <Table
                columns={[
                  { key: 'courseName', header: 'Course' },
                  { key: 'courseCode', header: 'Code' },
                  { key: 'grade', header: 'Grade' },
                  { key: 'marks', header: 'Marks' }
                ]}
                data={studentGrades}
              />
            </Card>

            {studentPlacement && (
              <Card title="Placement Status">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-semibold text-green-600">{studentPlacement.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Company</p>
                    <p className="font-semibold">{studentPlacement.company}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Role</p>
                    <p className="font-semibold">{studentPlacement.role}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Package</p>
                    <p className="font-semibold text-blue-600">{studentPlacement.package}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">My Profile</h2>
            <Card>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Student ID</p>
                    <p className="font-semibold">{student?.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Roll Number</p>
                    <p className="font-semibold">{student?.rollNo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-semibold">{student?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Program</p>
                    <p className="font-semibold">{student?.program}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Year</p>
                    <p className="font-semibold">{student?.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Semester</p>
                    <p className="font-semibold">{student?.semester}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold">{student?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold">{student?.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-semibold">{student?.address}</p>
                  </div>
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
                data={studentCourses}
              />
            </Card>
          </div>
        );

      case 'grades':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">My Grades</h2>
            <Card>
              <Table
                columns={[
                  { key: 'courseName', header: 'Course' },
                  { key: 'courseCode', header: 'Code' },
                  {
                    key: 'grade',
                    header: 'Grade',
                    render: (value) => (
                      <span className="font-semibold text-blue-600">{value}</span>
                    )
                  },
                  { key: 'marks', header: 'Marks' }
                ]}
                data={studentGrades}
              />
            </Card>
          </div>
        );

      case 'attendance':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Attendance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-green-100 mb-4">
                    <span className="text-4xl font-bold text-green-600">{student?.attendance}%</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">Overall Attendance</p>
                  <p className="text-sm text-gray-600 mt-2">
                    {student?.attendance && student.attendance >= 75 ? 'Eligible for exams' : 'Below minimum requirement'}
                  </p>
                </div>
              </Card>
              <Card title="Course-wise Attendance">
                <div className="space-y-3">
                  {studentCourses.map((course) => (
                    <div key={course.id} className="flex justify-between items-center">
                      <span className="text-sm">{course.name}</span>
                      <span className="font-semibold text-green-600">
                        {Math.floor(Math.random() * 10) + 88}%
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        );

      case 'placement':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Placement Status</h2>
            {studentPlacement ? (
              <Card>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <Briefcase className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{studentPlacement.company}</h3>
                      <p className="text-green-600 font-semibold">{studentPlacement.status}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-gray-600">Role</p>
                      <p className="font-semibold text-lg">{studentPlacement.role}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Package</p>
                      <p className="font-semibold text-lg text-blue-600">{studentPlacement.package}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Offer Date</p>
                      <p className="font-semibold text-lg">{studentPlacement.offerDate}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card>
                <div className="text-center py-8">
                  <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No placement records found</p>
                </div>
              </Card>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <DashboardLayout sidebarItems={sidebarItems} sidebarTitle="Student Portal">
      {renderContent()}
    </DashboardLayout>
  );
}
