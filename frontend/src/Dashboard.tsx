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
import { Progress } from "./components/ui/progress"
import { Badge } from "./components/ui/badge"
import ErrorBoundary from './components/ErrorBoundary'

const API_BASE_URL = 'http://localhost:5000/api'; // Update this with the correct backend URL

interface Stats {
  applications_sent: number;
  interviews_scheduled: number;
  offers_received: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    applications_sent: 0,
    interviews_scheduled: 0,
    offers_received: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    setIsLoading(true)
    setError(null)
    fetch(`${API_BASE_URL}/stats`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        if (data.status === 'success') {
          setStats(data.stats);
        } else {
          throw new Error('Data fetch was not successful')
        }
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
        setError('Failed to load dashboard data. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'browser', icon: Globe, label: 'Job Browser' },
    { id: 'analytics', icon: BarChart2, label: 'Analytics' },
  ]

  console.log('Stats:', stats);
  console.log('Is Loading:', isLoading);
  console.log('Error:', error);

  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-gray-100">
        <nav className="w-16 bg-white border-r border-gray-200">
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
                {isLoading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 text-xl">Loading dashboard data...</p>
                    <div className="mt-4 w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
                  </div>
                ) : error ? (
                  <div className="text-center text-red-500 py-8">
                    <p className="text-xl">{error}</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      <Card>
                        <CardHeader>
                          <CardTitle>Total Applications</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-4xl font-bold">{stats.applications_sent}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Interviews Scheduled</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-4xl font-bold">{stats.interviews_scheduled}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Offers Received</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-4xl font-bold">{stats.offers_received}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle>Application Progress</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Progress value={Math.round((stats.interviews_scheduled / stats.applications_sent) * 100)} className="w-full" />
                        <p className="mt-2 text-sm text-gray-600">
                          {stats.interviews_scheduled} out of {stats.applications_sent} applications have progressed to interviews
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-4">
                          <li className="flex items-center">
                            <Badge className="mr-2">New</Badge>
                            <span>Applied to Software Engineer position at TechCorp</span>
                          </li>
                          <li className="flex items-center">
                            <Badge variant="secondary" className="mr-2">Update</Badge>
                            <span>Interview scheduled with InnoSoft for next week</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </>
                )}
              </motion.div>
            )}
            {/* Add other tab content here */}
          </div>
        </main>
      </div>
    </ErrorBoundary>
  )
}
