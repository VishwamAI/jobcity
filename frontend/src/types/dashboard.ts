import { LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  icon: LucideIcon;
  label: string;
  path?: string;
}

export interface Interview {
  company: string;
  date: string;
  time: string;
}

export interface DashboardProps {
  className?: string;
}

export interface ApplicationStats {
  autoAppliedJobs: number;
  successRate: number;
  upcomingInterviews: number;
}
