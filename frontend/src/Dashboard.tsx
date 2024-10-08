"use client"

import React, { useState } from 'react'
import {
  Briefcase, User, Settings, HelpCircle, LogOut,
  Home, MessageSquare, Globe, CheckCircle, Clock, XCircle
} from 'lucide-react'
import { Button } from "./components/ui/button"
import { Tooltip, TooltipProvider } from "./components/ui/tooltip"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'browser', icon: Globe, label: 'Job Browser' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'help', icon: HelpCircle, label: 'Help' },
    { id: 'logout', icon: LogOut, label: 'Logout' },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'applied':
        return 'Applied';
      case 'processing':
        return 'Processing';
      case 'rejected':
        return 'Rejected';
      case 'pending':
        return 'Pending';
      default:
        return '';
    }
  }

  const recentApplications = [
    { company: 'TechCorp', position: 'Software Engineer', status: 'Applied', date: '2024-03-01' },
    { company: 'DataInc', position: 'Data Analyst', status: 'Pending', date: '2024-02-28' },
    { company: 'WebSolutions', position: 'Frontend Developer', status: 'Rejected', date: '2024-02-25' },
  ]

  const applicationStats = {
    total: 10,
    applied: 5,
    pending: 3,
    rejected: 2
  }

  const todoList = [
    'Update resume',
    'Prepare for TechCorp interview',
    'Follow up on DataInc application',
    'Research WebSolutions company culture'
  ]

  return (
    <div className="min-h-screen bg-[#F0F4FF] flex">
      <nav className="bg-white shadow-sm p-4 flex flex-col items-center space-y-4 w-16">
        <Briefcase className="h-8 w-8 text-[#6366F1] mb-4" />
        <TooltipProvider>
          {navItems.map((item) => (
            <Tooltip key={item.id} label={item.label}>
              <Button
                variant={activeTab === item.id ? "default" : "ghost"}
                size="icon"
                onClick={() => setActiveTab(item.id)}
                aria-label={item.label}
                className={activeTab === item.id ? "bg-[#6366F1] text-white" : "text-gray-600 hover:text-[#6366F1]"}
              >
                <item.icon className="h-5 w-5" />
              </Button>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-8">Job Application Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Recent Applications Card */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Your latest job applications</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {recentApplications.map((app, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{app.company}</p>
                      <p className="text-sm text-gray-500">{app.position}</p>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(app.status.toLowerCase())}
                      <span className={`ml-2 text-sm ${getStatusText(app.status.toLowerCase())}`}>{app.status}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Application Statistics Card */}
          <Card>
            <CardHeader>
              <CardTitle>Application Statistics</CardTitle>
              <CardDescription>Overview of your job applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold mb-1">Total Applications</p>
                  <div style={{ width: `${(applicationStats.applied / applicationStats.total) * 100}%`, height: '8px', backgroundColor: '#6366F1' }} className="rounded-full" />
                  <p className="text-sm text-gray-500 mt-1">{applicationStats.applied} of {applicationStats.total}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1">Pending</p>
                  <div style={{ width: `${(applicationStats.pending / applicationStats.total) * 100}%`, height: '8px', backgroundColor: '#6366F1' }} className="rounded-full" />
                  <p className="text-sm text-gray-500 mt-1">{applicationStats.pending} of {applicationStats.total}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1">Rejected</p>
                  <div style={{ width: `${(applicationStats.rejected / applicationStats.total) * 100}%`, height: '8px', backgroundColor: '#6366F1' }} className="rounded-full" />
                  <p className="text-sm text-gray-500 mt-1">{applicationStats.rejected} of {applicationStats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* To-Do List Card */}
          <Card>
            <CardHeader>
              <CardTitle>To-Do List</CardTitle>
              <CardDescription>Tasks to complete</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {todoList.map((task, index) => (
                  <li key={index} className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">{task}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
