"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Briefcase, MessageSquare, Globe, BarChart2,
  Zap, Calendar, Home
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/ui/tooltip"

const API_BASE_URL = 'http://localhost:5000/api'; // Update this with the correct backend URL

interface Interview {
  id: number;
  company: string;
  date: string;
  time: string;
}

interface Stats {
  autoAppliedJobs: number;
  successRate: number;
  upcomingInterviews: number;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState<Stats>({
    autoAppliedJobs: 0,
    successRate: 0,
    upcomingInterviews: 0
  })
  const [interviews, setInterviews] = useState<Interview[]>([])

  useEffect(() => {
    fetch(`${API_BASE_URL}/stats`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setStats(data.stats);
          if (Array.isArray(data.stats.upcomingInterviews)) {
            setInterviews(data.stats.upcomingInterviews);
          }
        }
      })
      .catch(error => console.error('Error fetching stats:', error));
  }, []);

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'browser', icon: Globe, label: 'Job Browser' },
    { id: 'analytics', icon: BarChart2, label: 'Analytics' },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
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
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'dashboard' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Auto-Applied Jobs</CardTitle>
                    <Zap className="h-4 w-4 text-[#6366F1]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#6366F1]">{stats.autoAppliedJobs}</div>
                  </CardContent>
                </Card>
                <Card className="bg-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
                    <BarChart2 className="h-4 w-4 text-[#6366F1]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#6366F1]">{stats.successRate}%</div>
                  </CardContent>
                </Card>
                <Card className="bg-white">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Upcoming Interviews</CardTitle>
                    <Calendar className="h-4 w-4 text-[#6366F1]" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#6366F1]">{stats.upcomingInterviews}</div>
                  </CardContent>
                </Card>
              </div>
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
          {/* Add other tab content here */}
        </div>
      </main>
    </div>
  )
}
