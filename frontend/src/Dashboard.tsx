"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Briefcase, MessageSquare, Globe, BarChart2,
  Zap, Calendar, User, Home
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/ui/tooltip"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const interviews = [
    { id: 1, company: "TechCorp", date: "2023-06-15", time: "14:00" },
    { id: 2, company: "InnoSoft", date: "2023-06-17", time: "10:30" },
    { id: 3, company: "DataDynamics", date: "2023-06-20", time: "15:45" },
  ]

  const userProfile = {
    name: "John Doe",
    role: "Frontend Developer",
    email: "john.doe@example.com",
    skills: ["React", "TypeScript", "CSS", "Node.js"],
    experience: "5 years"
  }

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'browser', icon: Globe, label: 'Job Browser' },
    { id: 'profile', icon: User, label: 'Profile' },
  ]

  return (
    <div className="min-h-screen bg-[#F0F4FF] flex">
      <nav className="bg-white shadow-sm p-4 flex flex-col items-center space-y-4 w-16">
        <Briefcase className="h-8 w-8 text-[#6366F1] mb-4" />
        <TooltipProvider>
          {navItems.map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <Button
                  variant={activeTab === item.id ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setActiveTab(item.id)}
                  aria-label={item.label}
                  className={activeTab === item.id ? "bg-[#6366F1] text-white" : "text-gray-600 hover:text-[#6366F1]"}
                >
                  <item.icon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>

      <main className="flex-1 p-6">
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
                  <CardDescription className="text-gray-600">Browse and search for job opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border-2 border-dashed border-[#6366F1] rounded-lg">
                    <p className="text-gray-500">Job browser interface goes here</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-[#6366F1]">Your Profile</CardTitle>
                  <CardDescription className="text-gray-600">Manage your personal and professional information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col items-center">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback>{userProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" className="border-[#6366F1] text-[#6366F1] hover:bg-[#6366F1] hover:text-white">Edit Profile</Button>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{userProfile.name}</h3>
                        <p className="text-sm text-gray-600">{userProfile.role}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-gray-700">Contact Information</h4>
                        <p className="text-sm text-gray-600">{userProfile.email}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-gray-700">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {userProfile.skills.map((skill, index) => (
                            <span key={index} className="bg-[#6366F1]/10 text-[#6366F1] text-xs px-2 py-1 rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-gray-700">Experience</h4>
                        <p className="text-sm text-gray-600">{userProfile.experience}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
