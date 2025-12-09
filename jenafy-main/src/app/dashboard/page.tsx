"use client"

import { 
  Clock, 
  TrendingUp, 
  DollarSign, 
  User,
  MoreVertical,
  ChevronRight,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar
} from 'lucide-react'

export default function ClientDashboard() {
  // Mock data
  const projectStats = [
    {
      title: 'Active Projects',
      value: '8',
      change: '+1 this week',
      icon: TrendingUp,
      color: 'from-[#00ff88] to-[#00cc6a]',
    },
    {
      title: 'In Progress',
      value: '12',
      change: '+2 from last month',
      icon: Clock,
      color: 'from-[#5de0e6] to-[#256ac6]',
    },
    {
      title: 'Monthly Cost',
      value: '$4,280',
      change: '-$240 from last month',
      icon: DollarSign,
      color: 'from-[#ff6b9d] to-[#ff416c]',
    },
    {
      title: 'Client Profile',
      value: 'Sarah Johnson',
      icon: User,
      color: 'from-[#9d4edd] to-[#560bad]',
    }
  ]

  const clientProfile = {
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    company: 'TechCorp Inc.',
    totalProjects: 8,
    activeSince: '2022',
    contactPerson: 'Alex Johnson (PM)'
  }

  const clientProjects = [
    { 
      id: 1, 
      name: 'E-commerce Redesign', 
      status: 'in-progress', 
      progress: 75, 
      deadline: 'Dec 20',
      analyticsUrl: 'https://analytics.jenafy.com/project-1'
    },
    { 
      id: 2, 
      name: 'Mobile App V2', 
      status: 'active', 
      progress: 90, 
      deadline: 'Dec 15',
      analyticsUrl: 'https://analytics.jenafy.com/project-2'
    },
    { 
      id: 3, 
      name: 'Brand Identity', 
      status: 'in-progress', 
      progress: 45, 
      deadline: 'Jan 10',
      analyticsUrl: 'https://analytics.jenafy.com/project-3'
    },
    { 
      id: 4, 
      name: 'API Integration', 
      status: 'pending', 
      progress: 20, 
      deadline: 'Jan 25',
      analyticsUrl: 'https://analytics.jenafy.com/project-4'
    },
  ]

  const statusColors = {
    'active': 'bg-green-500/20 text-green-400',
    'in-progress': 'bg-blue-500/20 text-blue-400',
    'pending': 'bg-yellow-500/20 text-yellow-400'
  }

  return (
    <div className="bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="mt-24 mb-10 max-w-6xl mx-auto">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {projectStats.map((stat, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 hover:border-gray-600 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <MoreVertical className="h-5 w-5 text-gray-400" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-300 mb-2">{stat.title}</p>
              <p className="text-sm text-gray-500">{stat.change}</p>
              
              {/* Compact Client Profile Details */}
              {stat.title === 'Client Profile' && (
                <div className="mt-2 pt-2 border-t border-gray-700">

                    <div className="flex items-center gap-2">
                      <Mail className="h-3 w-3 text-gray-400 flex-shrink-0" />
                      <span className="text-xs text-gray-300 truncate">{clientProfile.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-3 w-3 text-gray-400 flex-shrink-0" />
                      <span className="text-xs text-gray-300 truncate">{clientProfile.totalProjects} projects</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-gray-400 flex-shrink-0" />
                      <span className="text-xs text-gray-300 truncate">Since {clientProfile.activeSince}</span>
                    </div>
                  </div>
              )}
            </div>
          ))}
        </div>

        {/* Projects Section - Full Width */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Your Projects</h2>
              <p className="text-gray-400">Track project progress and deadlines</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#5de0e6] to-[#256ac6] text-white hover:opacity-90 transition-opacity">
              <span>View All</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clientProjects.map((project) => (
              <div key={project.id} className="bg-gray-900/50 rounded-xl p-4 border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-white">{project.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status as keyof typeof statusColors]}`}>
                    {project.status}
                  </span>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#5de0e6] to-[#256ac6] rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Deadline: {project.deadline}</span>
                  <div className="flex items-center gap-2">
                    <a 
                      href={project.analyticsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5de0e6] hover:text-[#256ac6] transition-colors flex items-center gap-1 text-xs"
                    >
                      <span>See Site Analytics →</span>
                    </a>
                    <button className="text-gray-400 hover:text-white transition-colors ml-2">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}