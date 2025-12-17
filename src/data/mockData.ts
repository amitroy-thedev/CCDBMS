export interface Student {
  id: string;
  name: string;
  rollNo: string;
  program: string;
  year: number;
  semester: number;
  gpa: number;
  attendance: number;
  email: string;
  phone: string;
  address: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  semester: number;
}

export interface Grade {
  studentId: string;
  courseId: string;
  courseName: string;
  courseCode: string;
  grade: string;
  marks: number;
}

export interface Faculty {
  id: string;
  name: string;
  department: string;
  designation: string;
  email: string;
  phone: string;
  joiningDate: string;
  courses: string[];
}

export interface Staff {
  id: string;
  name: string;
  department: string;
  designation: string;
  email: string;
  phone: string;
  joiningDate: string;
}

export interface PlacementRecord {
  id: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  company: string;
  role: string;
  package: string;
  status: string;
  offerDate: string;
}

export const mockStudents: Student[] = [
  {
    id: 'S101',
    name: 'John Doe',
    rollNo: '112001',
    program: 'B.Tech CSE',
    year: 3,
    semester: 5,
    gpa: 3.8,
    attendance: 92,
    email: 'john.doe@college.edu',
    phone: '+91 9876543210',
    address: '123 College Street, City'
  },
  {
    id: 'S102',
    name: 'Amit Roy',
    rollNo: '112002',
    program: 'B.Tech IT',
    year: 3,
    semester: 5,
    gpa: 3.6,
    attendance: 88,
    email: 'amit.roy@college.edu',
    phone: '+91 9876543211',
    address: '456 Campus Road, City'
  },
  {
    id: 'S103',
    name: 'Priya Sharma',
    rollNo: '112003',
    program: 'B.Tech CSE',
    year: 2,
    semester: 3,
    gpa: 3.9,
    attendance: 95,
    email: 'priya.sharma@college.edu',
    phone: '+91 9876543212',
    address: '789 University Ave, City'
  },
  {
    id: 'S104',
    name: 'Rahul Verma',
    rollNo: '112004',
    program: 'B.Tech ECE',
    year: 4,
    semester: 7,
    gpa: 3.7,
    attendance: 90,
    email: 'rahul.verma@college.edu',
    phone: '+91 9876543213',
    address: '321 Student Lane, City'
  }
];

export const mockCourses: Course[] = [
  { id: 'CS301', code: 'CS301', name: 'Database Management Systems', credits: 4, semester: 5 },
  { id: 'CS302', code: 'CS302', name: 'Operating Systems', credits: 4, semester: 5 },
  { id: 'CS303', code: 'CS303', name: 'Artificial Intelligence', credits: 3, semester: 5 },
  { id: 'CS304', code: 'CS304', name: 'Computer Networks', credits: 4, semester: 5 },
  { id: 'CS305', code: 'CS305', name: 'Software Engineering', credits: 3, semester: 5 }
];

export const mockGrades: Grade[] = [
  { studentId: 'S101', courseId: 'CS301', courseName: 'DBMS', courseCode: 'CS301', grade: 'A', marks: 92 },
  { studentId: 'S101', courseId: 'CS302', courseName: 'Operating Systems', courseCode: 'CS302', grade: 'B+', marks: 87 },
  { studentId: 'S101', courseId: 'CS303', courseName: 'Artificial Intelligence', courseCode: 'CS303', grade: 'A', marks: 90 },
  { studentId: 'S101', courseId: 'CS304', courseName: 'Computer Networks', courseCode: 'CS304', grade: 'A-', marks: 89 },
  { studentId: 'S102', courseId: 'CS301', courseName: 'DBMS', courseCode: 'CS301', grade: 'B+', marks: 88 },
  { studentId: 'S102', courseId: 'CS302', courseName: 'Operating Systems', courseCode: 'CS302', grade: 'B', marks: 85 },
  { studentId: 'S103', courseId: 'CS301', courseName: 'DBMS', courseCode: 'CS301', grade: 'A', marks: 94 },
  { studentId: 'S104', courseId: 'CS301', courseName: 'DBMS', courseCode: 'CS301', grade: 'A-', marks: 89 }
];

export const mockFaculty: Faculty[] = [
  {
    id: 'F101',
    name: 'Dr. Anil Kumar',
    department: 'Computer Science & Engineering',
    designation: 'Professor',
    email: 'anil.kumar@college.edu',
    phone: '+91 9876543220',
    joiningDate: '2015-07-15',
    courses: ['CS301', 'CS302']
  },
  {
    id: 'F102',
    name: 'Dr. Sunita Patel',
    department: 'Computer Science & Engineering',
    designation: 'Associate Professor',
    email: 'sunita.patel@college.edu',
    phone: '+91 9876543221',
    joiningDate: '2017-08-20',
    courses: ['CS303', 'CS305']
  }
];

export const mockStaff: Staff[] = [
  {
    id: 'ST101',
    name: 'Ramesh Das',
    department: 'Accounts',
    designation: 'Clerk',
    email: 'ramesh.das@college.edu',
    phone: '+91 9876543230',
    joiningDate: '2019-03-10'
  },
  {
    id: 'ST102',
    name: 'Kavita Singh',
    department: 'Library',
    designation: 'Librarian',
    email: 'kavita.singh@college.edu',
    phone: '+91 9876543231',
    joiningDate: '2018-06-15'
  }
];

export const mockPlacements: PlacementRecord[] = [
  {
    id: 'P101',
    studentId: 'S101',
    studentName: 'John Doe',
    rollNo: '112001',
    company: 'TCS',
    role: 'Software Engineer',
    package: '₹7 LPA',
    status: 'Offer Received',
    offerDate: '2024-01-15'
  },
  {
    id: 'P102',
    studentId: 'S102',
    studentName: 'Amit Roy',
    rollNo: '112002',
    company: 'Infosys',
    role: 'Associate Software Engineer',
    package: '₹6.5 LPA',
    status: 'Offer Received',
    offerDate: '2024-01-20'
  },
  {
    id: 'P103',
    studentId: 'S104',
    studentName: 'Rahul Verma',
    rollNo: '112004',
    company: 'Wipro',
    role: 'Project Engineer',
    package: '₹6 LPA',
    status: 'Offer Received',
    offerDate: '2024-02-10'
  }
];

export const mockUsers = {
  student: { username: 'john.doe', password: 'student123', id: 'S101', name: 'John Doe' },
  faculty: { username: 'anil.kumar', password: 'faculty123', id: 'F101', name: 'Dr. Anil Kumar' },
  admin: { username: 'admin', password: 'admin123', id: 'A101', name: 'Admin User' },
  staff: { username: 'ramesh.das', password: 'staff123', id: 'ST101', name: 'Ramesh Das' },
  placement: { username: 'placement', password: 'placement123', id: 'PL101', name: 'Placement Officer' }
};
