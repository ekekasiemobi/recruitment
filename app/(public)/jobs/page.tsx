'use client';

import { useEffect, useState, useMemo } from 'react';
import TopCompanies from "./components/TopCompanies"
import Link from 'next/link';
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Bookmark,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { formatRelativeTime } from '../../types/formatetime'; 
import type { JobResponse } from '../../types/types'
import Hero2 from '../components/hero2';

function JobsListingPage() {
  const [jobs, setJobs] = useState<JobResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

 
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedJobType, setSelectedJobType] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('latest');

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        const res = await fetch('https://remotive.com/api/remote-jobs');
        if (!res.ok) throw new Error('Failed to fetch jobs');
        const data = await res.json();
        setJobs(data.jobs || []);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
        const matchesTitle = job.title.toLowerCase().includes(searchTitle.toLowerCase()) || job.company_name.toLowerCase().includes(searchTitle.toLowerCase());
        const matchesCategory = selectedCategory ? job.category?.toLowerCase() === selectedCategory.toLowerCase() : true;
        const matchesType = selectedJobType ? job.job_type?.toLowerCase() === selectedJobType.toLowerCase() : true;
        return matchesTitle && matchesCategory && matchesType;
      })
      .sort((a, b) => {
        if (sortBy === 'latest') {
          return (
            new Date(b.publication_date).getTime() - new Date(a.publication_date).getTime()
          );
        }
        return 0;
      });
  }, [jobs, searchTitle, selectedCategory, selectedJobType, sortBy]);

  const totalResults = filteredJobs.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 text-red-500 font-semibold">
        Error loading jobs: {error}
      </div>
    );
  }

  return (
    <>
    <Hero2 title="Jobs"/>
    <div className="min-h-screen bg-[#f8fafc] text-gray-800 py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        <aside className="lg:col-span-4 flex flex-col gap-6">

          <div className="bg-[#f0fdfa] p-6 rounded-2xl border border-emerald-100 space-y-6">

            <div>
              <label className="block text-xs font-bold text-gray-900 mb-2">
                Search by Job Title
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Job title or company"
                  value={searchTitle}
                  onChange={(e) => {
                    setSearchTitle(e.target.value);
                    setCurrentPage(1);
                  } }
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-[#2a9d8f]" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-900 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <select className="w-full pl-10 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-xs appearance-none focus:outline-none focus:ring-1 focus:ring-[#2a9d8f] text-gray-500 cursor-pointer">
                  <option value="">Choose city</option>
                  <option value="worldwide">Worldwide</option>
                  <option value="usa">USA</option>
                  <option value="europe">Europe</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
              </div>
            </div>


            <div>
              <label className="block text-xs font-bold text-gray-900 mb-3">
                Category
              </label>
              <div className="space-y-2.5">
                {[
                  'Software Development',
                  'Customer Support',
                  'Design',
                  'Marketing',
                  'Sales'
                ].map((cat) => (
                  <label key={cat} className="flex items-center justify-between text-xs text-gray-600 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedCategory === cat}
                        onChange={() => {
                          setSelectedCategory(selectedCategory === cat ? '' : cat);
                          setCurrentPage(1);
                        } }
                        className="rounded border-gray-300 text-[#2a9d8f] focus:ring-[#2a9d8f]" />
                      <span>{cat}</span>
                    </div>
                    <span className="text-gray-400">10</span>
                  </label>
                ))}
              </div>
              <button className="mt-4 w-full bg-[#2a9d8f] hover:bg-[#238377] text-white text-xs font-semibold py-2.5 rounded-xl transition">
                Show More
              </button>
            </div>


            <div>
              <label className="block text-xs font-bold text-gray-900 mb-3">
                Job Type
              </label>
              <div className="space-y-2.5">
                {[
                  { label: 'Full Time', value: 'full_time' },
                  { label: 'Part Time', value: 'part_time' },
                  { label: 'Freelance', value: 'freelance' },
                  { label: 'Contract', value: 'contract' }
                ].map((item) => (
                  <label key={item.value} className="flex items-center justify-between text-xs text-gray-600 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedJobType === item.value}
                        onChange={() => {
                          setSelectedJobType(selectedJobType === item.value ? '' : item.value);
                          setCurrentPage(1);
                        } }
                        className="rounded border-gray-300 text-[#2a9d8f] focus:ring-[#2a9d8f]" />
                      <span>{item.label}</span>
                    </div>
                    <span className="text-gray-400">10</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-900 mb-3">
                Experience Level
              </label>
              <div className="space-y-2.5">
                {['No-experience', 'Fresher', 'Intermediate', 'Expert'].map((exp) => (
                  <label key={exp} className="flex items-center justify-between text-xs text-gray-600 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-[#2a9d8f] focus:ring-[#2a9d8f]" />
                      <span>{exp}</span>
                    </div>
                    <span className="text-gray-400">10</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-900 mb-3">
                Date Posted
              </label>
              <div className="space-y-2.5">
                {['All', 'Last Hour', 'Last 24 Hours', 'Last 7 Days', 'Last 30 Days'].map((date) => (
                  <label key={date} className="flex items-center justify-between text-xs text-gray-600 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-[#2a9d8f] focus:ring-[#2a9d8f]" />
                      <span>{date}</span>
                    </div>
                    <span className="text-gray-400">10</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-900 mb-3">
                Salary
              </label>
              <input type="range" min="0" max="9999" className="w-full accent-[#2a9d8f]" />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500 font-medium">Salary: $0 - $9999</span>
                <button className="bg-[#2a9d8f] text-white text-xs px-3 py-1 rounded-lg">Apply</button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-900 mb-3">
                Tags
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['engineering', 'design', 'ui/ux', 'marketing', 'management', 'soft', 'construction'].map((tag) => (
                  <span key={tag} className="bg-white border border-gray-200 text-gray-600 text-[11px] px-2.5 py-1 rounded-md cursor-pointer hover:border-[#2a9d8f]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

          <div className="bg-linear-to-b from-slate-400 to-slate-700 p-8 rounded-2xl text-white min-h-65 flex flex-col justify-end shadow-sm">
            <h3 className="text-2xl font-extrabold tracking-tight">WE ARE HIRING</h3>
            <p className="text-sm font-medium opacity-90 mt-1">Apply Today!</p>
          </div>

        </aside>


        <main className="lg:col-span-8 flex flex-col gap-6">


          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              Showing {totalResults > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + itemsPerPage, totalResults)} of {totalResults} results
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 text-gray-800 rounded-lg px-3 py-1.5 pr-8 appearance-none focus:outline-none cursor-pointer"
              >
                <option value="latest">Sort by latest</option>
                <option value="oldest">Sort by oldest</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>


          <div className="space-y-4">
            {loading ? (Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 animate-pulse h-36" />
            ))
            ) : currentJobs.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-gray-100 text-gray-500">
                No jobs match your selected filters.
              </div>
            ) : (
              currentJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition hover:shadow-md"
                >
                  <div className="space-y-3 w-full sm:w-auto">

                    <div className="flex items-center justify-between sm:justify-start gap-3">
                      <span className="bg-[#2a9d8f]/10 text-[#2a9d8f] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                        {formatRelativeTime ? formatRelativeTime(job.publication_date) : 'Recently'}
                      </span>
                      <button className="sm:hidden text-gray-400 hover:text-gray-600">
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>


                    <div className="flex items-center gap-3">
                      {job.company_logo ? (
                        <img
                          src={job.company_logo}
                          alt={job.company_name}
                          className="w-10 h-10 rounded-xl object-cover border border-gray-100" />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-orange-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                          {job.company_name?.charAt(0) || 'C'}
                        </div>
                      )}
                      <div>
                        <h2 className="font-bold text-gray-900 text-base leading-snug">{job.title}</h2>
                        <p className="text-xs text-gray-500">{job.company_name}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-1">
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5 text-gray-400" />
                        <span>{job.category || 'Commerce'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{job.job_type || 'Full time'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                        <span>{job.salary || '$40000-$42000'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <span>{job.candidate_required_location || 'Worldwide'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 pt-3 sm:pt-0 border-gray-100">
                    <button className="hidden sm:block text-gray-400 hover:text-gray-600 p-2">
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <Link
                      href={`/jobdetails/${job.id}`}
                      className="w-full sm:w-auto text-center bg-[#2a9d8f] hover:bg-[#238377] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition"
                    >
                      Job Details
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNum = index + 1;
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 rounded-lg text-xs font-semibold transition flex items-center justify-center ${isActive
                        ? 'bg-[#2a9d8f] text-white'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-8 px-3 rounded-lg text-xs font-medium border border-gray-200 bg-white text-gray-600 flex items-center gap-1 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}



        </main>

      </div>
      <TopCompanies />
    </div></>
  );
}
export default JobsListingPage
