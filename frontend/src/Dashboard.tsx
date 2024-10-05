"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase, MessageSquare, Globe, BarChart2,
  Zap, Calendar, User, Home
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Button } from "./components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/ui/tooltip";
import { Switch } from "@radix-ui/react-switch";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAutoApplyActive, setIsAutoApplyActive] = useState(true);

  const tabs = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'browser', icon: Globe, label: 'Job Browser' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  const statistics = [
    { id: '1', title: 'Total Applications', value: 150, description: 'Applications submitted this month', icon: <BarChart2 className="h-4 w-4 text-muted-foreground" /> },
    { id: '2', title: 'Interviews Scheduled', value: 4, description: 'Upcoming interviews this week', icon: <Calendar className="h-4 w-4 text-muted-foreground" /> },
    { id: '3', title: 'Application Success Rate', value: '68%', description: 'Positive responses received', icon: <Zap className="h-4 w-4 text-muted-foreground" /> },
  ];

  const interviews = [
    { id: 1, company: 'TechCorp', date: '2023-06-15', time: '14:00' },
    { id: 2, company: 'InnoSoft', date: '2023-06-17', time: '10:30' },
    { id: 3, company: 'DataDynamics', date: '2023-06-20', time: '15:45' },
  ];

  const toggleAutoApply = () => {
    setIsAutoApplyActive(!isAutoApplyActive);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-20 bg-[#F0F4FF] p-4 flex flex-col items-center">
        <Briefcase className="w-8 h-8 text-[#6366F1] mb-8" />
        {tabs.map((tab) => (
          <Tooltip key={tab.id} label={tab.label}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveTab(tab.id)}
              className={`p-2 mb-4 rounded-lg ${
                activeTab === tab.id ? 'bg-[#6366F1] text-white' : 'text-[#6366F1]'
              }`}
            >
              <tab.icon className="w-6 h-6" />
            </Button>
          </Tooltip>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-[#6366F1] mb-6">Dashboard</h1>

        {/* Auto-Apply Status */}
        <div className="mb-8 flex items-center">
          <span className="mr-4 text-lg font-semibold">Auto-Apply Status:</span>
          <Button
            variant={isAutoApplyActive ? "default" : "outline"}
            onClick={toggleAutoApply}
            className={`flex items-center ${isAutoApplyActive ? 'bg-[#6366F1] text-white' : 'text-[#6366F1] border-[#6366F1]'}`}
          >
            <span className="mr-2">{isAutoApplyActive ? 'Active' : 'Inactive'}</span>
            <Switch
              checked={isAutoApplyActive}
              onCheckedChange={toggleAutoApply}
              className="ml-2 w-[42px] h-[25px] bg-black/20 rounded-full relative data-[state=checked]:bg-[#6366F1] outline-none cursor-pointer"
            />
          </Button>
        </div>

        {activeTab === 'dashboard' && (
          <>
            {/* Application Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {statistics.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    {stat.icon}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Upcoming Interviews */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Interviews</CardTitle>
                <CardDescription>You have {interviews.length} interviews scheduled</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {interviews.map((interview, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-[#6366F1] flex items-center justify-center text-white font-bold mr-4">
                        {interview.company.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{interview.company}</h3>
                        <p className="text-sm text-gray-500">{interview.date} at {interview.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === 'chat' && (
          <Card>
            <CardHeader>
              <CardTitle>Chat</CardTitle>
              <CardDescription>Connect with recruiters and hiring managers</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Chat functionality coming soon...</p>
            </CardContent>
          </Card>
        )}

        {activeTab === 'job-browser' && (
          <Card>
            <CardHeader>
              <CardTitle>Job Browser</CardTitle>
              <CardDescription>Explore job opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Job browser functionality coming soon...</p>
            </CardContent>
          </Card>
        )}

        {activeTab === 'profile' && (
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your personal and professional information</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Profile management functionality coming soon...</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
