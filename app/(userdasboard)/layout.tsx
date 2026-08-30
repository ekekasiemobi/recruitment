import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Briefcase,Bookmark, Bell, Settings, LogOut, LayoutDashboard, Search, PhoneCall} from 'lucide-react';

export default function UserDashboardLayout({children}: {children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-screen bg-white text-gray-700 font-sans flex flex-col">
        
        <div className="border-b border-gray-100 bg-white">
        
          <div className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 py-2 px-4 sm:px-8 flex justify-between items-center">

            <div className="flex items-center gap-6">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <Link href="/jobs" className="hover:text-blue-600">Find Job</Link>
              <Link href="/dashboard" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-0.5">Dashboard</Link>
              <Link href="/dashboard/jobAlert" className="hover:text-blue-600">Job Alerts</Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <PhoneCall className="w-3 h-3" />
                <span>+1-202-555-0178</span>
              </div>
              <span>🇺🇸 English</span>
            </div>

          </div>

          <div className="container mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">

            <div className="flex items-center gap-8">
             
              <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5" />
                </div>
                Her Recruit
              </Link>

              <div className="hidden md:flex items-center border border-gray-200 rounded-md px-3 py-1.5 w-80 bg-white">
                <span className="text-xs text-gray-500 border-r border-gray-200 pr-2 mr-2">🇮🇳 India</span>
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input type="text" placeholder="Job title, keyword, company" className="w-full text-xs outline-none bg-transparent"/>
              </div>

            </div>

            <div className="flex items-center gap-4">
              <div className="relative p-2 text-gray-500 hover:text-gray-700">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </div>
              <Image src="/userprofile.avif" alt="Kassie profile" className="w-9 h-9 rounded-full object-cover" height={500} width={500}/>
            </div>
          </div>
        </div>

   
        <div className="container w-full mx-auto flex flex-col md:flex-row">
         
          <div className="w-full md:w-64 border-r border-gray-100 p-4 sm:p-6 flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-4">
                Candidate Dashboard
              </p>
              <nav className="space-y-1">
                <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-blue-600 bg-blue-50 border-l-4 border-blue-600 rounded-r-md">
                  <LayoutDashboard className="w-4 h-4" />
                  Overview
                </Link>

                <Link  href="/dashboard/appliedJob" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md"
                >
                  <Briefcase className="w-4 h-4 text-gray-400" />
                  Applied Jobs
                </Link>

                <Link href="/dashboard/favoriteJob" 
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md"
                >
                  <Bookmark className="w-4 h-4 text-gray-400" />
                  Favorite Jobs
                </Link>

                <Link href="/dashboard/jobAlert" 
                  className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <Bell className="w-4 h-4 text-gray-400" />
                    Job Alert
                  </div>
                  <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full">09</span>
                </Link>

                <Link  href="/dashboard" 
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md"
                >
                  <Settings className="w-4 h-4 text-gray-400" />
                  Settings
                </Link>
              </nav>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100">
              <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 w-full">
                <LogOut className="w-4 h-4" />
                Log-out
              </button>
            </div>
          </div>

      
          <main className="flex-1 p-4 sm:p-8 bg-white">
            {children}
          </main>
        </div>

        <footer className="border-t border-gray-100 py-4 text-center text-xs text-gray-400">
          © 2021 Her Recruit - Job Board. All rights Reserved
        </footer>
      </div>
     </>
  );
}