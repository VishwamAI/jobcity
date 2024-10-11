"use client"

import React, { useState } from 'react'
import {
  Briefcase, User, Settings, HelpCircle, LogOut,
  Home, MessageSquare
} from 'lucide-react'
import { Button } from "../../components/ui/button"
import { Tooltip, TooltipProvider } from "../../components/ui/tooltip"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'jobs', icon: Briefcase, label: 'Jobs' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'help', icon: HelpCircle, label: 'Help' },
  ]

  const todoList = [
    'Update resume',
    'Apply for Software Engineer position at Google',
    'Prepare for upcoming interview',
  ]

  const upcomingInterviews = [
    { company: 'Amazon', date: '2023-05-15', time: '14:00' },
    { company: 'Microsoft', date: '2023-05-18', time: '10:00' },
  ]

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-20 bg-white dark:bg-gray-800 p-4 flex flex-col items-center justify-between">
        <div className="space-y-4">
          <TooltipProvider>
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Tooltip key={item.id} label={item.label}>
                  <Button
                    variant={activeTab === item.id ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setActiveTab(item.id)}
                    aria-label={item.label}
                    className="w-12 h-12"
                  >
                    <Icon className="h-6 w-6" />
                  </Button>
                </Tooltip>
              )
            })}
          </TooltipProvider>
        </div>
        <div>
          <Tooltip label="Logout">
            <Button variant="ghost" size="icon" aria-label="Logout" className="w-12 h-12">
              <LogOut className="h-6 w-6" />
            </Button>
          </Tooltip>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* To-Do List */}
            <Card>
              <CardHeader>
                <CardTitle>To-Do List</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {todoList.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Upcoming Interviews */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Interviews</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {upcomingInterviews.map((interview, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span className="font-medium">{interview.company}</span>
                      <span className="text-sm text-gray-500">
                        {interview.date} at {interview.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
