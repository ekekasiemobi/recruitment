'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { JobResponse } from '@/app/types/types';
import { MapPin, DollarSign, Check } from 'lucide-react';

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

export default function AppliedJobsPage() {
  const [jobs, setJobs] = useState<JobResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedJobId, setSelectedJobId] = useState<number | string | null>(null);
  
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

      <div className="bg-white rounded-lg border overflow-hidden">
        <Table className="min-w-162">
          <TableHeader className="bg-gray-100/70">
            <TableRow>
              <TableHead className="py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                JOBS
              </TableHead>
              <TableHead className="py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                DATE APPLIED
              </TableHead>
              <TableHead className="py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                STATUS
              </TableHead>
              <TableHead className="py-3 px-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider text-right">
                ACTION
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs">
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="py-12 text-center text-gray-400">
                  Loading applied jobs...
                </TableCell>
              </TableRow>
            ) : currentJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-12 text-center text-gray-400">
                  No applied jobs found.
                </TableCell>
              </TableRow>
            ) : (
              currentJobs.map((job) => {
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
                      <div className="flex items-center gap-3.5">
                        {job.company_logo ? (
                          <img
                            src={job.company_logo}
                            alt={job.company_name}
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
                    </TableCell>

                    <TableCell className="py-3.5 px-4 text-gray-500 font-normal whitespace-nowrap">
                      {job.publication_date
                        ? new Date(job.publication_date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : 'Feb 2, 2019'}
                    </TableCell>

                    <TableCell className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                        <Check className="w-3.5 h-3.5" /> Active
                      </span>
                    </TableCell>

                    <TableCell className="py-3.5 px-4 text-right whitespace-nowrap">
                      <Link
                        href={`/jobdetails/${job.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className={`inline-block font-semibold px-4 py-2 rounded-md text-xs transition ${
                          isHighlighted
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                            : 'bg-blue-50 hover:bg-blue-100 text-blue-600'
                        }`}
                      >
                        View Details
                      </Link>
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