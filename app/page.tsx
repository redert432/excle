import React from 'react';
/* eslint-disable @next/next/no-img-element */
import {
  Bell,
  Search,
  Home,
  CheckCircle2,
  Calendar,
  FileText,
  Settings,
  Flame,
  BarChart2,
  Minus,
  ListFilter,
  ChevronDown,
  Download,
  ChevronsUpDown
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans flex flex-col">
      {/* Top Navigation Bar */}
      <header className="h-16 px-6 bg-white border-b border-gray-200 flex items-center justify-between z-10 sticky top-0">
        <div className="flex items-center gap-8 lg:gap-12 w-full">
          {/* Logo */}
          <div className="flex flex-shrink-0 items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
              {/* T Logo approximation */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M4 7h16M12 7v13" />
              </svg>
            </div>
            TaskFlow
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-black font-medium text-sm transition-colors cursor-pointer">Dashboard</a>
            <a href="#" className="text-gray-500 hover:text-black font-medium text-sm transition-colors cursor-pointer">Projects</a>
            <a href="#" className="text-black font-semibold text-sm border-b-2 border-black py-5 cursor-pointer">Data</a>
            <a href="#" className="text-gray-500 hover:text-black font-medium text-sm transition-colors cursor-pointer">Team</a>
            <a href="#" className="text-gray-500 hover:text-black font-medium text-sm transition-colors cursor-pointer">Reports</a>
          </nav>

          <div className="flex flex-1" />

          {/* Right Nav */}
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-black transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="hidden sm:flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 pr-2 rounded-full transition-colors border border-transparent">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
                AR
              </div>
              <span className="text-sm font-medium text-gray-700">Alex Rivera</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>

            <div className="relative hidden lg:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search" 
                className="w-48 xl:w-64 pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col hidden md:flex">
          <nav className="flex-1 py-6 px-4 space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors bg-gray-100/50">
              <Home className="w-5 h-5 text-gray-500" />
              Overview
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors">
              <CheckCircle2 className="w-5 h-5 text-gray-400" />
              My Tasks
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors">
              <Calendar className="w-5 h-5 text-gray-400" />
              Calendar
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors">
              <FileText className="w-5 h-5 text-gray-400" />
              Files
            </a>
            
            <div className="pt-6 pb-2">
              <hr className="border-gray-200" />
            </div>
            
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors">
              <Settings className="w-5 h-5 text-gray-400" />
              Settings
            </a>
          </nav>
        </aside>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Header / KPIs */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">Project Data Dashboard</h1>
              
              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-white border text-center border-gray-200 rounded-xl py-3 px-5 min-w-[120px] shadow-sm">
                  <div className="text-sm text-gray-500 mb-1">Active Projects</div>
                  <div className="text-2xl font-semibold text-gray-900 leading-none">12</div>
                </div>
                <div className="bg-white border text-center border-gray-200 rounded-xl py-3 px-5 min-w-[120px] shadow-sm">
                  <div className="text-sm text-gray-500 mb-1">Total Tasks</div>
                  <div className="text-2xl font-semibold text-gray-900 leading-none">245</div>
                </div>
                <div className="bg-white border text-center border-gray-200 rounded-xl py-3 px-5 min-w-[120px] shadow-sm">
                  <div className="text-sm text-gray-500 mb-1">Completed</div>
                  <div className="text-2xl font-semibold text-gray-900 leading-none">188</div>
                </div>
                <div className="bg-white border text-center border-gray-200 rounded-xl py-3 px-5 min-w-[120px] shadow-sm">
                  <div className="text-sm text-gray-500 mb-1">Due Soon</div>
                  <div className="text-2xl font-semibold text-gray-900 leading-none">15</div>
                </div>
              </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search Tasks" 
                    className="w-[200px] pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5 shadow-sm"
                  />
                </div>
                
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  Date Range
                  <ChevronDown className="w-4 h-4 text-gray-400 ml-1" />
                </button>

                <div className="flex items-center bg-gray-100/80 p-1 rounded-lg border border-gray-200/60 text-sm">
                  <div className="px-3 py-1.5 text-gray-500 font-medium">Status</div>
                  <button className="px-4 py-1.5 bg-gray-600 text-white rounded-md font-medium shadow-sm transition-colors">
                    All
                  </button>
                  <button className="px-4 py-1.5 text-gray-600 font-medium hover:text-gray-900 transition-colors">
                    Active
                  </button>
                  <button className="px-4 py-1.5 text-gray-600 font-medium hover:text-gray-900 transition-colors">
                    Done
                  </button>
                </div>

                <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm">
                  Priority
                  <ChevronDown className="w-4 h-4 text-gray-400 ml-1" />
                </button>
              </div>

              <button className="flex items-center gap-2 px-4 py-2.5 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm whitespace-nowrap">
                <Download className="w-4 h-4" />
                Export Data
              </button>
            </div>

            {/* Table Card */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
              <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-white">
                <h2 className="text-lg font-bold text-gray-900">Task Overview</h2>
                <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md text-sm text-gray-600 font-medium hover:bg-gray-50 transition-colors">
                  <ListFilter className="w-4 h-4 text-gray-500" />
                  Reload Table
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-[#F8F9FA] text-gray-500 font-medium">
                    <tr>
                      <th className="px-6 py-3 border-b border-gray-200 font-medium">
                        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                          ID <ChevronsUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 font-medium">
                        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                          Task Name <ChevronsUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 font-medium">
                        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                          Status <ChevronsUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 font-medium">
                        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                          Priority <ChevronsUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 font-medium">
                        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                          Assigned To <ChevronsUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 font-medium">
                        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-700">
                          Due Date <ChevronsUpDown className="w-3 h-3" />
                        </div>
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 font-medium w-48">
                        Progress
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {/* Row 1 */}
                    <tr className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4 font-medium text-gray-900">101</td>
                      <td className="px-6 py-4">Task Name Review</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200 shadow-sm">
                          In Progress
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Flame className="w-4 h-4 text-gray-500" /> High
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Sarah" alt="S" className="w-full h-full object-cover" />
                          </div>
                          Sarah
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">Oct 25, 2023</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-600 w-[75%] rounded-full" />
                          </div>
                          <span className="text-xs font-semibold text-gray-600 w-8">75%</span>
                        </div>
                      </td>
                    </tr>
                    {/* Row 2 */}
                    <tr className="bg-[#FDFDFD] hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4 font-medium text-gray-900">102</td>
                      <td className="px-6 py-4">Task Name Complete</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-500 text-white shadow-sm">
                          Completed
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <BarChart2 className="w-4 h-4 text-gray-500" /> Medium
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Mike" alt="M" className="w-full h-full object-cover" />
                          </div>
                          Mike
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">Oct 25, 2023</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-600 w-[100%] rounded-full" />
                          </div>
                          <span className="text-xs font-semibold text-gray-600 w-8">100%</span>
                        </div>
                      </td>
                    </tr>
                    {/* Row 3 */}
                    <tr className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4 font-medium text-gray-900">103</td>
                      <td className="px-6 py-4">Task Name Planning</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-500 text-white shadow-sm">
                          Completed
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <BarChart2 className="w-4 h-4 text-gray-500" /> Medium
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex" alt="A" className="w-full h-full object-cover" />
                          </div>
                          Alex
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">Oct 25, 2023</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-600 w-[100%] rounded-full" />
                          </div>
                          <span className="text-xs font-semibold text-gray-600 w-8">100%</span>
                        </div>
                      </td>
                    </tr>
                    {/* Row 4 */}
                    <tr className="bg-[#FDFDFD] hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4 font-medium text-gray-900">104</td>
                      <td className="px-6 py-4">Task Name Project</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 shadow-sm">
                          Pending
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Flame className="w-4 h-4 text-gray-500" /> High
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex" alt="A" className="w-full h-full object-cover" />
                          </div>
                          Alex
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">Oct 25, 2023</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-500 w-[40%] rounded-full" />
                          </div>
                          <span className="text-xs font-semibold text-gray-500 w-8">40%</span>
                        </div>
                      </td>
                    </tr>
                    {/* Row 5 */}
                    <tr className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4 font-medium text-gray-900">105</td>
                      <td className="px-6 py-4">Task Name Manager</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 shadow-sm">
                          Pending
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <BarChart2 className="w-4 h-4 text-gray-500" /> Medium
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Mike" alt="M" className="w-full h-full object-cover" />
                          </div>
                          Mike
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">Oct 25, 2023</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-500 w-[40%] rounded-full" />
                          </div>
                          <span className="text-xs font-semibold text-gray-500 w-8">40%</span>
                        </div>
                      </td>
                    </tr>
                    {/* Row 6 */}
                    <tr className="bg-[#FDFDFD] hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4 font-medium text-gray-900">106</td>
                      <td className="px-6 py-4">Task Overview</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 shadow-sm">
                          Pending
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Minus className="w-4 h-4 text-gray-500" /> Low
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex" alt="A" className="w-full h-full object-cover" />
                          </div>
                          Alex
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">Oct 25, 2023</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-600 w-[75%] rounded-full" />
                          </div>
                          <span className="text-xs font-semibold text-gray-600 w-8">75%</span>
                        </div>
                      </td>
                    </tr>
                    {/* Row 7 */}
                    <tr className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4 font-medium text-gray-900">107</td>
                      <td className="px-6 py-4">Task Name Ceera been</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 shadow-sm">
                          Pending
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <BarChart2 className="w-4 h-4 text-gray-500" /> Medium
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex" alt="A" className="w-full h-full object-cover" />
                          </div>
                          Alex
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">Oct 25, 2023</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-500 w-[40%] rounded-full" />
                          </div>
                          <span className="text-xs font-semibold text-gray-500 w-8">40%</span>
                        </div>
                      </td>
                    </tr>
                    {/* Row 8 */}
                    <tr className="bg-[#FDFDFD] hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4 font-medium text-gray-900">108</td>
                      <td className="px-6 py-4">Task Name Managers</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200 shadow-sm">
                          In Progress
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Flame className="w-4 h-4 text-gray-500" /> High
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex" alt="A" className="w-full h-full object-cover" />
                          </div>
                          Alex
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">Oct 25, 2023</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-600 w-[75%] rounded-full" />
                          </div>
                          <span className="text-xs font-semibold text-gray-600 w-8">75%</span>
                        </div>
                      </td>
                    </tr>
                    {/* Row 9 */}
                    <tr className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4 font-medium text-gray-900">109</td>
                      <td className="px-6 py-4">Task Name Completer</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-500 text-white shadow-sm">
                          Completed
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <BarChart2 className="w-4 h-4 text-gray-500" /> Medium
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Mike" alt="M" className="w-full h-full object-cover" />
                          </div>
                          Mike
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">Oct 25, 2023</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-600 w-[100%] rounded-full" />
                          </div>
                          <span className="text-xs font-semibold text-gray-600 w-8">100%</span>
                        </div>
                      </td>
                    </tr>
                    {/* Row 10 */}
                    <tr className="bg-[#FDFDFD] hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4 font-medium text-gray-900">110</td>
                      <td className="px-6 py-4">Task Power sector</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-500 text-white shadow-sm">
                          Completed
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Minus className="w-4 h-4 text-gray-500" /> Low
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex" alt="A" className="w-full h-full object-cover" />
                          </div>
                          Alex
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">Oct 25, 2023</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-600 w-[80%] rounded-full" />
                          </div>
                          <span className="text-xs font-semibold text-gray-600 w-8">80%</span>
                        </div>
                      </td>
                    </tr>
                    {/* Row 11 */}
                    <tr className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-6 py-4 font-medium text-gray-900 border-b border-transparent">113</td>
                      <td className="px-6 py-4 border-b border-transparent">Task Change Management</td>
                      <td className="px-6 py-4 border-b border-transparent">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 shadow-sm">
                          Pending
                        </span>
                      </td>
                      <td className="px-6 py-4 border-b border-transparent">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Minus className="w-4 h-4 text-gray-500" /> Low
                        </div>
                      </td>
                      <td className="px-6 py-4 border-b border-transparent">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold overflow-hidden">
                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Alex" alt="A" className="w-full h-full object-cover" />
                          </div>
                          Alex
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 border-b border-transparent">Oct 25, 2023</td>
                      <td className="px-6 py-4 border-b border-transparent">
                        <div className="flex items-center gap-3">
                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-500 w-[40%] rounded-full" />
                          </div>
                          <span className="text-xs font-semibold text-gray-500 w-8">40%</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
}
