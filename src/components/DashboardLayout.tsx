import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface SidebarItem {
  label: string;
  onClick: () => void;
  active?: boolean;
}

interface DashboardLayoutProps {
  children: ReactNode;
  sidebarItems: SidebarItem[];
  sidebarTitle: string;
}

export function DashboardLayout({ children, sidebarItems, sidebarTitle }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar items={sidebarItems} title={sidebarTitle} />
      <div className="ml-64 p-8">
        {children}
      </div>
    </div>
  );
}
