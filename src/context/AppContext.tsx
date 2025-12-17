import { createContext, useContext, useState, ReactNode } from 'react';
import {
  Student,
  Faculty,
  Staff,
  PlacementRecord,
  mockStudents,
  mockFaculty,
  mockStaff,
  mockPlacements
} from '../data/mockData';

export type UserRole = 'student' | 'faculty' | 'admin' | 'staff' | 'placement' | null;

interface User {
  id: string;
  name: string;
  role: UserRole;
}

interface AppContextType {
  user: User | null;
  login: (username: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  students: Student[];
  faculty: Faculty[];
  staff: Staff[];
  placements: PlacementRecord[];
  addStudent: (student: Student) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  addFaculty: (faculty: Faculty) => void;
  updateFaculty: (id: string, faculty: Partial<Faculty>) => void;
  deleteFaculty: (id: string) => void;
  addStaff: (staff: Staff) => void;
  updateStaff: (id: string, staff: Partial<Staff>) => void;
  deleteStaff: (id: string) => void;
  addPlacement: (placement: PlacementRecord) => void;
  updatePlacement: (id: string, placement: Partial<PlacementRecord>) => void;
  deletePlacement: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [faculty, setFaculty] = useState<Faculty[]>(mockFaculty);
  const [staff, setStaff] = useState<Staff[]>(mockStaff);
  const [placements, setPlacements] = useState<PlacementRecord[]>(mockPlacements);

  const login = (username: string, password: string, role: UserRole): boolean => {
    if (!role) return false;

    const mockUsers: Record<string, any> = {
      student: { username: 'john.doe', password: 'student123', id: 'S101', name: 'John Doe' },
      faculty: { username: 'anil.kumar', password: 'faculty123', id: 'F101', name: 'Dr. Anil Kumar' },
      admin: { username: 'admin', password: 'admin123', id: 'A101', name: 'Admin User' },
      staff: { username: 'ramesh.das', password: 'staff123', id: 'ST101', name: 'Ramesh Das' },
      placement: { username: 'placement', password: 'placement123', id: 'PL101', name: 'Placement Officer' }
    };

    const mockUser = mockUsers[role];
    if (mockUser && username === mockUser.username && password === mockUser.password) {
      setUser({
        id: mockUser.id,
        name: mockUser.name,
        role: role
      });
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const addStudent = (student: Student) => {
    setStudents([...students, student]);
  };

  const updateStudent = (id: string, updatedStudent: Partial<Student>) => {
    setStudents(students.map(s => s.id === id ? { ...s, ...updatedStudent } : s));
  };

  const deleteStudent = (id: string) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const addFaculty = (newFaculty: Faculty) => {
    setFaculty([...faculty, newFaculty]);
  };

  const updateFaculty = (id: string, updatedFaculty: Partial<Faculty>) => {
    setFaculty(faculty.map(f => f.id === id ? { ...f, ...updatedFaculty } : f));
  };

  const deleteFaculty = (id: string) => {
    setFaculty(faculty.filter(f => f.id !== id));
  };

  const addStaff = (newStaff: Staff) => {
    setStaff([...staff, newStaff]);
  };

  const updateStaff = (id: string, updatedStaff: Partial<Staff>) => {
    setStaff(staff.map(s => s.id === id ? { ...s, ...updatedStaff } : s));
  };

  const deleteStaff = (id: string) => {
    setStaff(staff.filter(s => s.id !== id));
  };

  const addPlacement = (placement: PlacementRecord) => {
    setPlacements([...placements, placement]);
  };

  const updatePlacement = (id: string, updatedPlacement: Partial<PlacementRecord>) => {
    setPlacements(placements.map(p => p.id === id ? { ...p, ...updatedPlacement } : p));
  };

  const deletePlacement = (id: string) => {
    setPlacements(placements.filter(p => p.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        students,
        faculty,
        staff,
        placements,
        addStudent,
        updateStudent,
        deleteStudent,
        addFaculty,
        updateFaculty,
        deleteFaculty,
        addStaff,
        updateStaff,
        deleteStaff,
        addPlacement,
        updatePlacement,
        deletePlacement
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
