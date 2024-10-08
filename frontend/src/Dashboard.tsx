"use client"

import React, { useState, ReactNode } from 'react'
import { motion } from 'framer-motion'
import {
  Briefcase, MessageSquare, Globe, BarChart2,
  Zap, Calendar, User, Home, Settings, HelpCircle, LogOut,
  Search, ChevronLeft, ChevronRight, RotateCcw, Edit
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Button, ButtonProps } from "./components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/ui/tooltip"
import { Input } from "./components/ui/input"

// Add type definitions
interface Interview {
  id: number;
  company: string;
  date: string;
  time: string;
}

interface NavItem {
  id: string;
  icon: React.ElementType;
  label: string;
}

interface ExtendedButtonProps extends ButtonProps {
  children: ReactNode;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<string>('dashboard')
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [url, setUrl] = useState<string>('https://job-city.com/auto-apply')

  const interviews: Interview[] = [
    { id: 1, company: "TechCorp", date: "2023-06-15", time: "14:00" },
    { id: 2, company: "InnoSoft", date: "2023-06-17", time: "10:30" },
    { id: 3, company: "DataDynamics", date: "2023-06-20", time: "15:45" },
  ]

  const navItems: NavItem[] = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'browser', icon: Globe, label: 'Job Browser' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'help', icon: HelpCircle, label: 'Help' },
    { id: 'logout', icon: LogOut, label: 'Logout' },
  ]

const ButtonWrapper: React.FC<ExtendedButtonProps> = ({ children, ...props }) => (
  <Button {...props}>{children}</Button>
)
  return (
    <div className="min-h-screen bg-[#F0F4FF] flex">
      <nav className="bg-white shadow-sm p-4 flex flex-col items-center space-y-4 w-16">
        <Briefcase className="h-8 w-8 text-[#6366F1] mb-4" />
        <TooltipProvider>
          {navItems.map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger>
                <ButtonWrapper
                  variant={activeTab === item.id ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setActiveTab(item.id)}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </ButtonWrapper>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="mb-6 bg-white">
                <CardHeader>
                  <CardTitle className="text-[#6366F1]">Application Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Card className="bg-white">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                          Auto-Applied Jobs
                        </CardTitle>
                        <Zap className="h-4 w-4 text-[#6366F1]" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-[#6366F1]">28</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-white">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                          Success Rate
                        </CardTitle>
                        <BarChart2 className="h-4 w-4 text-[#6366F1]" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-[#6366F1]">68%</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-white">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                          Upcoming Interviews
                        </CardTitle>
                        <Calendar className="h-4 w-4 text-[#6366F1]" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-[#6366F1]">{interviews.length}</div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-[#6366F1]">Upcoming Interviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {interviews.map((interview) => (
                      <Card key={interview.id} className="bg-white">
                        <CardHeader>
                          <CardTitle className="text-gray-800">{interview.company}</CardTitle>
                          <CardDescription className="text-gray-600">
                            {new Date(`${interview.date}T${interview.time}`).toLocaleString()}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'chat' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-[#6366F1]">Chat</CardTitle>
                  <CardDescription className="text-gray-600">Chat with our AI assistant about job opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border-2 border-dashed border-[#6366F1] rounded-lg">
                    <p className="text-gray-500">Chat interface goes here</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'browser' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-[#6366F1]">Job Browser</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-4">
                    <ButtonWrapper variant="ghost" size="icon">
                      <ChevronLeft className="h-4 w-4" />
                    </ButtonWrapper>
                    <ButtonWrapper variant="ghost" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </ButtonWrapper>
                    <ButtonWrapper variant="ghost" size="icon">
                      <RotateCcw className="h-4 w-4" />
                    </ButtonWrapper>
                    <div className="flex-grow relative">
                      <Input
                        type="text"
                        placeholder="Search jobs..."
                        value={url}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                        className="w-full pr-8"
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  {/* ... (existing job listings) */}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-white">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-[#6366F1]">Your Profile</CardTitle>
                  <ButtonWrapper
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Save' : 'Edit'} <Edit className="ml-2 h-4 w-4" />
                  </ButtonWrapper>
                </CardHeader>
                <CardContent>
                  {/* ... (existing profile content) */}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
