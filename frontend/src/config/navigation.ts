import { Home, MessageSquare, Globe, User, Settings, HelpCircle, LogOut } from 'lucide-react';
import type { NavItem } from '../types/dashboard';

export const navItems: NavItem[] = [
  { id: 'dashboard', icon: Home, label: 'Dashboard', path: '/dashboard' },
  { id: 'chat', icon: MessageSquare, label: 'Chat', path: '/chat' },
  { id: 'browser', icon: Globe, label: 'Job Browser', path: '/job-browser' },
  { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
  { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' },
  { id: 'help', icon: HelpCircle, label: 'Help', path: '/help' },
  { id: 'logout', icon: LogOut, label: 'Logout' },
];

export default navItems;
