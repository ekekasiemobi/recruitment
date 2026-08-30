'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { JobResponse } from '@/app/types/types';
import { MapPin, DollarSign, Calendar, Bookmark, XCircle, ArrowLeft, ArrowRight } from 'lucide-react';

export default function FavoriteJobsPage() {
  const [favoriteJobs, setFavoriteJobs] = useState<JobResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const jobsPerPage = 12;

  useEffect(() => {
    async function fetchFavoriteJobs() {
      try {
        setLoading(true);
        const res = await fetch('https://remotive.com/api/remote-jobs');
        const data = await res.json();
        if (data && data.jobs) {
          setFavoriteJobs(data.jobs);
        }
      } catch (error) {
        console.error('Failed to fetch favorite jobs:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFavoriteJobs();
  }, []);

  const handleRemoveFavorite = (jobId: number) => {
    setFavoriteJobs((prev) => prev.filter((job) => job.id !== jobId));
  };


  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = favoriteJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(favoriteJobs.length / jobsPerPage) || 5;

  return (
    <div className="space-y-6 max-w-5xl">

      <div>
        <h1 className="text-base font-semibold text-gray-900">
          Favorite Jobs{' '}
          <span className="text-gray-400 font-normal text-sm">
            ({favoriteJobs.length > 0 ? favoriteJobs.length : 17})
          </span>
        </h1>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="py-12 text-center text-xs text-gray-400 bg-white rounded-lg border border-gray-100">
            Loading favorite jobs...
          </div>
        ) : currentJobs.length === 0 ? (
          <div className="py-12 text-center text-xs text-gray-400 bg-white rounded-lg border border-gray-100">
            No favorite jobs saved yet.
          </div>
        ) : (
          currentJobs.map((job, idx) => {
      
            const isExpired = idx === 0 || idx === 4 || idx === 7 || idx === 8;

            const isHighlighted = currentPage === 1 && idx === 2;

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
                      {isExpired ? (
                        <span className="flex items-center gap-1 text-red-500 font-medium">
                          <XCircle className="w-3.5 h-3.5" />
                          Job Expire
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-gray-400">
                          <Calendar className="w-3.5 h-3.5 text-gray-300" />
                          4 Days Remaining
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-50">
                  <button
                    onClick={() => handleRemoveFavorite(job.id)}
                    title="Remove favorite"
                    className="p-1.5 text-gray-900 hover:text-red-500 transition"
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>

                  {isExpired ? (
                    <button
                      disabled
                      className="bg-gray-100 text-gray-400 text-xs font-semibold px-4 py-2 rounded-md cursor-not-allowed whitespace-nowrap min-w-30 text-center"
                    >
                      Deadline Expired
                    </button>
                  ) : (
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
                  )}
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