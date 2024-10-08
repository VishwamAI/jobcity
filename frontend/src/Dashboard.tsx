"use client"

import React, { useState, useEffect } from 'react'
import {
  Briefcase, User, Settings, HelpCircle, LogOut,
  Home, MessageSquare, Globe,
  Zap, BarChart, Calendar, Moon, Sun
} from 'lucide-react'
import { Button } from "./components/ui/button"
import { Tooltip, TooltipProvider } from "./components/ui/tooltip"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'browser', icon: Globe, label: 'Job Browser' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'help', icon: HelpCircle, label: 'Help' },
    { id: 'logout', icon: LogOut, label: 'Logout' },
  ]

  const todoList = [
    'Update resume',
    'Prepare for TechCorp interview',
    'Follow up on DataInc application',
    'Research WebSolutions company culture'
  ]

  const upcomingInterviews = [
    { company: 'TechCorp', date: '15/06/2023', time: '14:00:00' },
    { company: 'InnoSoft', date: '17/06/2023', time: '10:30:00' },
    { company: 'DataDynamics', date: '20/06/2023', time: '15:45:00' },
  ]

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-[#F8F9FF] text-gray-900'}`}>
      <nav className={`p-4 flex flex-col items-center space-y-4 w-16 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
        <Briefcase className={`h-8 w-8 mb-4 ${darkMode ? 'text-purple-400' : 'text-[#6366F1]'}`} />
        <TooltipProvider>
          {navItems.map((item) => (
            <Tooltip key={item.id} label={item.label}>
              <Button
                variant={activeTab === item.id ? "default" : "ghost"}
                size="icon"
                onClick={() => setActiveTab(item.id)}
                aria-label={item.label}
                className={activeTab === item.id ? `${darkMode ? 'bg-purple-700 text-white' : 'bg-[#6366F1] text-white'}` : `${darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-[#6366F1]'}`}
              >
                <item.icon className="h-5 w-5" />
              </Button>
            </Tooltip>
          ))}
          <Tooltip label={darkMode ? "Light Mode" : "Dark Mode"}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle Dark Mode"
              className={darkMode ? 'text-purple-400' : 'text-[#6366F1]'}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Application Statistics Card */}
          <Card className={darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader>
              <CardTitle className={darkMode ? 'text-purple-400' : 'text-[#6366F1]'}>Application Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-[#6366F1]'}`}>28</span>
                  <Zap className={`h-6 w-6 ${darkMode ? 'text-purple-400' : 'text-[#6366F1]'}`} />
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Auto-Applied Jobs</p>
              </div>
              <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-[#6366F1]'}`}>68%</span>
                  <BarChart className={`h-6 w-6 ${darkMode ? 'text-purple-400' : 'text-[#6366F1]'}`} />
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Success Rate</p>
              </div>
              <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-[#6366F1]'}`}>3</span>
                  <Calendar className={`h-6 w-6 ${darkMode ? 'text-purple-400' : 'text-[#6366F1]'}`} />
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Upcoming Interviews</p>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Interviews */}
          <div className="col-span-2">
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-purple-400' : 'text-[#6366F1]'}`}>Upcoming Interviews</h2>
            <Card className={darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardContent className="p-6">
                {upcomingInterviews.map((interview, index) => (
                  <div key={index} className="flex justify-between items-center mb-4 last:mb-0">
                    <div>
                      <p className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{interview.company}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{interview.date}, {interview.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Todo List */}
          <div className="col-span-1">
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-purple-400' : 'text-[#6366F1]'}`}>Todo List</h2>
            <Card className={darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardContent className="p-6">
                <ul className="space-y-2">
                  {todoList.map((task, index) => (
                    <li key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        className={`mr-2 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                      />
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{task}</span>
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
