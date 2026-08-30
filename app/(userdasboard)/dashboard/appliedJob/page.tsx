'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { JobResponse } from '@/app/types/types';
import { MapPin, DollarSign, Check, ArrowLeft, ArrowRight, } from 'lucide-react';
import Image from 'next/image';


export default function AppliedJobsPage() {
  const [jobs, setJobs] = useState<JobResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const jobsPerPage = 8;

  useEffect(() => {
    async function fetchAppliedJobs() {
      try {
        setLoading(true);
        const res = await fetch('https://remotive.com/api/remote-jobs');
        const data = await res.json();
        if (data && data.jobs) {
          setJobs(data.jobs);
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAppliedJobs();
  }, []);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage) || 5;

  return (
    <div className="space-y-6 w-full">
    
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">
          Applied Jobs{' '}
          <span className="text-gray-400 font-normal text-sm">
            ({jobs.length > 0 ? jobs.length : 8})
          </span>
        </h1>
      </div>

      <div className="bg-white rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-162">
            <thead>
              <tr className="bg-gray-100/70 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-4">JOBS</th>
                <th className="py-3 px-4">DATE APPLIED</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-400">
                    Loading applied jobs...
                  </td>
                </tr>
              ) : currentJobs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-400">
                    No applied jobs found.
                  </td>
                </tr>
              ) : (
                currentJobs.map((job, idx) => {
  
                  const isHighlighted = currentPage === 1 && idx === 3;

                  return (
                    <tr
                      key={job.id}
                      className={`transition ${
                        isHighlighted
                          ? 'bg-blue-50/40 border-2 border-blue-500 rounded-lg'
                          : 'hover:bg-gray-50/60'
                      }`}
                    >

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3.5">
                          {job.company_logo ? (
                            <img src={job.company_logo} alt={job.company_name}
                              className="w-10 h-10 rounded-lg object-cover border border-gray-100 bg-white" 
                            />
                          ) : (
                            <div className="w-10 h-10 bg-blue-600 text-white font-bold rounded-lg flex items-center justify-center text-xs">
                              {job.company_name?.charAt(0) || 'J'}
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900 text-xs sm:text-sm">
                                {job.title}
                              </span>
                              <span className="bg-blue-50 text-blue-600 text-[10px] font-medium px-2 py-0.5 rounded-full capitalize">
                                {job.job_type || 'Full Time'}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400 text-[11px] mt-1">
                              <span className="flex items-center gap-0.5">
                                <MapPin className="w-3 h-3" />
                                {job.candidate_required_location || 'Remote'}
                              </span>
                              <span className="flex items-center gap-0.5">
                                <DollarSign className="w-3 h-3" />
                                {job.salary || '$50k-80k/month'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-gray-500 font-normal whitespace-nowrap">
                        {job.publication_date
                          ? new Date(job.publication_date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : 'Feb 2, 2019'}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                          <Check className="w-3.5 h-3.5" /> Active
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <Link
                          href={`/jobdetails/${job.id}`}
                          className={`inline-block font-semibold px-4 py-2 rounded-md text-xs transition ${
                            isHighlighted
                              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                              : 'bg-blue-50 hover:bg-blue-100 text-blue-600'
                          }`}
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 pt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {[1, 2, 3].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-9 h-9 rounded-full text-xs font-semibold transition ${
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {page < 10 ? `0${page}` : page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}