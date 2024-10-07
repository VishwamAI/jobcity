"use client"

// This is also needed
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Briefcase, MessageSquare, Globe, BarChart2,
  Zap, Calendar, User, Home, Settings, HelpCircle, LogOut,
  Search, ChevronLeft, ChevronRight, RotateCcw, CheckCircle, Clock, XCircle,
  Edit, GraduationCap, Award
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Button } from "./components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/ui/tooltip"
import { Progress } from "./components/ui/progress"
import { Badge } from "./components/ui/badge"
import { Input } from "./components/ui/input"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isEditing, setIsEditing] = useState(false)
  const [url, setUrl] = useState('https://job-city.com/auto-apply')

  const interviews = [
    { id: 1, company: "TechCorp", date: "2023-06-15", time: "14:00" },
    { id: 2, company: "InnoSoft", date: "2023-06-17", time: "10:30" },
    { id: 3, company: "DataDynamics", date: "2023-06-20", time: "15:45" },
  ]

  const userProfile = {
    name: "John Doe",
    role: "Frontend Developer",
    email: "john.doe@example.com",
    location: "San Francisco, CA",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
    experience: [
      { company: "TechCorp", role: "Senior Frontend Developer", duration: "2020 - Present" },
      { company: "WebSolutions", role: "Frontend Developer", duration: "2018 - 2020" }
    ],
    education: [
      { degree: "BS in Computer Science", school: "Tech University", year: "2018" }
    ],
    certifications: [
      { name: "AWS Certified Developer", issuer: "Amazon Web Services", year: "2022" }
    ]
  }

  const jobListings = [
    { id: 1, title: "Senior React Developer", company: "TechCorp", location: "Remote", salary: "$120k - $150k", status: "applied", matchPercentage: 95 },
    { id: 2, title: "Full Stack Engineer", company: "InnoSoft", location: "New York, NY", salary: "$100k - $130k", status: "processing", matchPercentage: 88 },
    { id: 3, title: "AI/ML Engineer", company: "DataDynamics", location: "San Francisco, CA", salary: "$130k - $160k", status: "rejected", matchPercentage: 75 },
    { id: 4, title: "DevOps Specialist", company: "CloudTech", location: "Austin, TX", salary: "$110k - $140k", status: "pending", matchPercentage: 92 },
  ]

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
        return 'Not Suitable';
      case 'pending':
        return 'Pending';
      default:
        return '';
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F4FF] flex">
      <nav className="bg-white shadow-sm p-4 flex flex-col items-center space-y-4 w-16">
        <Briefcase className="h-8 w-8 text-[#6366F1] mb-4" />
        <TooltipProvider>
          {navItems.map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger>
                <Button
                  variant={activeTab === item.id ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setActiveTab(item.id)}
                  className="relative flex items-center justify-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
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
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#6366F1]">Job Browser</CardTitle>
                  <CardDescription className="text-gray-600">Browse and auto-apply for job opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-4">
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#6366F1]">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#6366F1]">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#6366F1]">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <div className="flex-grow relative">
                      <Input
                        type="text"
                        placeholder="Search jobs..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full pr-8"
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    {jobListings.map((job) => (
                      <Card key={job.id} className="bg-white">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <div>
                            <CardTitle className="text-[#6366F1]">{job.title}</CardTitle>
                            <CardDescription className="text-gray-600">{job.company}</CardDescription>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`
                              ${job.status === 'applied' ? 'border-green-500 text-green-500' : ''}
                              ${job.status === 'processing' ? 'border-yellow-500 text-yellow-500' : ''}
                              ${job.status === 'rejected' ? 'border-red-500 text-red-500' : ''}
                              ${job.status === 'pending' ? 'border-blue-500 text-blue-500' : ''}
                            `}
                          >
                            {getStatusIcon(job.status)}
                            <span className="ml-1">{getStatusText(job.status)}</span>
                          </Badge>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">{job.location}</p>
                          <p className="text-gray-600">{job.salary}</p>
                          <div className="mt-2">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-gray-500">Match</span>
                              <span className="text-sm text-[#6366F1]">{job.matchPercentage}%</span>
                            </div>
                            <Progress value={job.matchPercentage} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
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
                  <Button 
                    variant="outline" 
                    className="border-[#6366F1] text-[#6366F1] hover:bg-[#6366F1] hover:text-white"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col items-center">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback>{userProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <h3 className="text-lg font-semibold text-gray-800">{userProfile.name}</h3>
                      <p className="text-sm text-gray-600">{userProfile.role}</p>
                      <p className="text-sm text-gray-600">{userProfile.location}</p>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-gray-700">Contact Information</h4>
                        <p className="text-sm text-gray-600">{userProfile.email}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-gray-700">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {userProfile.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="bg-[#6366F1]/10 text-[#6366F1]">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-gray-700 flex items-center">
                          <Briefcase className="mr-2 h-4 w-4" /> Work Experience
                        </h4>
                        {userProfile.experience.map((exp, index) => (
                          <div key={index} className="mb-2">
                            <p className="font-medium text-gray-800">{exp.role}</p>
                            <p className="text-sm text-gray-600">{exp.company} | {exp.duration}</p>
                          </div>
                        ))}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-gray-700 flex items-center">
                          <GraduationCap className="mr-2 h-4 w-4" /> Education
                        </h4>
                        {userProfile.education.map((edu, index) => (
                          <div key={index} className="mb-2">
                            <p className="font-medium text-gray-800">{edu.degree}</p>
                            <p className="text-sm text-gray-600">{edu.school} | {edu.year}</p>
                          </div>
                        ))}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-gray-700 flex items-center">
                          <Award className="mr-2 h-4 w-4" /> Certifications
                        </h4>
                        {userProfile.certifications.map((cert, index) => (
                          <div key={index} className="mb-2">
                            <p className="font-medium text-gray-800">{cert.name}</p>
                            <p className="text-sm text-gray-600">{cert.issuer} | {cert.year}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold mb-2 text-gray-700">Profile Completeness</h4>
                    <Progress value={85} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">85% complete</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-[#6366F1]">Settings</CardTitle>
                  <CardDescription className="text-gray-600">Manage your account settings and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border-2 border-dashed border-[#6366F1] rounded-lg">
                    <p className="text-gray-500">Settings interface goes here</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'help' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-[#6366F1]">Help & Support</CardTitle>
                  <CardDescription className="text-gray-600">Get assistance and answers to your questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center border-2 border-dashed border-[#6366F1] rounded-lg">
                    <p className="text-gray-500">Help and support interface goes here</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'logout' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-[#6366F1]">Logout</CardTitle>
                  <CardDescription className="text-gray-600">Are you sure you want to log out?</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="bg-[#6366F1] hover:bg-[#4F46E5] text-white">Confirm Logout</Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
