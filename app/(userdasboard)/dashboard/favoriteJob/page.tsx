'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { JobResponse } from '@/app/types/types';
import {MapPin, DollarSign, Calendar, Bookmark, XCircle, ArrowRight } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export default function FavoriteJobsPage() {
  const [favoriteJobs, setFavoriteJobs] = useState<JobResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedJobId, setSelectedJobId] = useState<number | string | null>(null);

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

      <div className="bg-white rounded-lg border overflow-hidden">
        <Table className="min-w-175">
          <TableHeader className="bg-gray-100/70">
            <TableRow>
              <TableHead className="py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                JOB TITLE & DETAILS
              </TableHead>
              <TableHead className="py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider text-right">
                ACTION
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs">
            {loading ? (
              <TableRow>
                <TableCell colSpan={2} className="py-12 text-center text-gray-400">
                  Loading favorite jobs...
                </TableCell>
              </TableRow>
            ) : currentJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} className="py-12 text-center text-gray-400">
                  No favorite jobs saved yet.
                </TableCell>
              </TableRow>
            ) : (
              currentJobs.map((job, idx) => {
                const isExpired = idx === 0 || idx === 4 || idx === 7 || idx === 8;
                const isHighlighted = selectedJobId === job.id;

                return (
                  <TableRow
                    key={job.id}
                    onClick={() => setSelectedJobId(job.id)}
                    className={`cursor-pointer transition-colors ${
                      isHighlighted
                        ? 'bg-blue-50/60 border-2 border-blue-500 rounded-lg'
                        : 'hover:bg-gray-50/80'
                    }`}
                  >
                    <TableCell className="py-3.5 px-4">
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
                    </TableCell>

                    <TableCell className="py-3.5 px-4 text-right whitespace-nowrap align-middle">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFavorite(job.id);
                          }}
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
                            onClick={(e) => e.stopPropagation()}
                            className={`text-xs font-semibold px-4 py-2 rounded-md inline-flex items-center justify-center gap-1.5 whitespace-nowrap min-w-30 transition ${
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
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination className="pt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage((prev) => prev - 1);
              }}
              className={currentPage === 1 ? 'pointer-events-none opacity-40' : 'cursor-pointer'}
            />
          </PaginationItem>

          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={currentPage === page}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(page);
                }}
                className="cursor-pointer"
              >
                {page < 10 ? `0${page}` : page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
              }}
              className={currentPage === totalPages ? 'pointer-events-none opacity-40' : 'cursor-pointer'}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}