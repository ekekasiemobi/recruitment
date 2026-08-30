'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPin, DollarSign, Calendar, Bookmark, Pencil, ArrowLeft, ArrowRight, } from 'lucide-react';
import { JobResponse } from '@/app/types/types';

function JobAlert() {
  const [alertJobs, setAlertJobs] = useState<JobResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const jobsPerPage = 12;

  useEffect(() => {
    async function fetchJobAlerts() {
      try {
        setLoading(true);
        const res = await fetch('https://remotive.com/api/remote-jobs');
        const data = await res.json();
        if (data && data.jobs) {
          setAlertJobs(data.jobs);

          if (data.jobs.length >= 12) {
            setBookmarkedIds([data.jobs[2]?.id, data.jobs[10]?.id, data.jobs[11]?.id]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch job alerts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobAlerts();
  }, []);

  const toggleBookmark = (jobId: number) => {
    setBookmarkedIds((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = alertJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(alertJobs.length / jobsPerPage) || 5;

  return (
    <div className="space-y-6 max-w-5xl">

      <div className="flex items-center justify-between">
        <h1 className="text-base font-semibold text-gray-900">
          Job Alerts{' '}
          <span className="text-gray-400 font-normal text-sm">
            ({alertJobs.length > 0 ? `${alertJobs.length} new Jobs` : '0 new jobs'})
          </span>
        </h1>

        <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-blue-600 font-medium transition">
          <Pencil className="w-3.5 h-3.5" />
          Edit Job Alerts
        </button>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="py-12 text-center text-xs text-gray-400 bg-white rounded-lg border border-gray-100">
            Loading job alerts...
          </div>
        ) : currentJobs.length === 0 ? (
          <div className="py-12 text-center text-xs text-gray-400 bg-white rounded-lg border border-gray-100">
            No job alerts available right now.
          </div>
        ) : (
          currentJobs.map((job, idx) => {
            const isBookmarked = bookmarkedIds.includes(job.id);

            const isHighlighted = currentPage === 1 && idx === 5;

            return (
              <div
                key={job.id}
                className={`p-3.5 sm:p-4 rounded-lg bg-white border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isHighlighted
                    ? 'border-blue-500 ring-1 ring-blue-500/20 shadow-xs'
                    : 'border-gray-100 hover:border-gray-200'
                }`}
              >

                <div className="flex items-start gap-3.5">
                  {job.company_logo ? (
                    <img
                      src={job.company_logo}
                      alt={job.company_name}
                      className="w-10 h-10 rounded-md object-cover border border-gray-100 bg-white shrink-0 mt-0.5"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-blue-600 text-white font-bold rounded-md flex items-center justify-center text-xs shrink-0 mt-0.5">
                      {job.company_name?.charAt(0) || 'J'}
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold text-gray-900 text-sm">
                        {job.title}
                      </h2>
                      <span className="bg-blue-50 text-blue-600 text-[10px] font-medium px-2 py-0.5 rounded-full capitalize">
                        {job.job_type || 'Full Time'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-400 text-xs">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-300" />
                        {job.candidate_required_location || 'Remote'}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-gray-300" />
                        {job.salary || '$50k-80k/month'}
                      </span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <Calendar className="w-3.5 h-3.5 text-gray-300" />
                        4 Days Remaining
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-50">
                  <button
                    onClick={() => toggleBookmark(job.id)}
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark job'}
                    className="p-1.5 text-gray-700 hover:text-blue-600 transition"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${
                        isBookmarked ? 'fill-gray-900 text-gray-900' : 'text-gray-400'
                      }`}
                    />
                  </button>

                  <Link
                    href={`/jobdetails/${job.id}`}
                    className={`text-xs font-semibold px-4 py-2 rounded-md flex items-center justify-center gap-1.5 whitespace-nowrap min-w-30 transition ${
                      isHighlighted
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-blue-50 hover:bg-blue-100 text-blue-600'
                    }`}
                  >
                    Apply Now
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="flex items-center justify-center gap-2 pt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 disabled:opacity-40 disabled:cursor-not-allowed transition text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>

        {[1, 2].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 rounded-full text-xs font-semibold transition ${
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
          className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 disabled:opacity-40 disabled:cursor-not-allowed transition text-xs"
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default  JobAlert