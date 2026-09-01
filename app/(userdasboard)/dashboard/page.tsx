'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Briefcase, Bookmark, Bell, ArrowRight, Check } from 'lucide-react';
import { JobResponse } from '@/app/types/types';
import Image from 'next/image';
import ProtectedRoute from '@/app/(authentication)/components/ProtectedRoute';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function UserDashboard() {
  const [appliedJobs, setAppliedJobs] = useState<JobResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedJobId, setSelectedJobId] = useState<number | string | null>(null);

  useEffect(() => {
    async function fetchAppliedJobs() {
      try {
        setLoading(true);
        const response = await fetch('https://remotive.com/api/remote-jobs');
        const data = await response.json();

        if (data && data.jobs) {
          setAppliedJobs(data.jobs.slice(0, 5));
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAppliedJobs();
  }, []);

  return (
    <ProtectedRoute>
      <div className="space-y-6 w-full">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Hello, Esther Howard</h1>
          <p className="text-xs text-gray-400 mt-1">
            Here is your daily activities and job alerts
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-50/50 p-4 rounded-xl flex items-center justify-between border border-blue-100">
            <div>
              <p className="text-xl font-bold text-gray-900">589</p>
              <p className="text-xs text-gray-500 mt-0.5">Applied jobs</p>
            </div>
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-600 shadow-xs">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-amber-50/50 p-4 rounded-xl flex items-center justify-between border border-amber-100">
            <div>
              <p className="text-xl font-bold text-gray-900">238</p>
              <p className="text-xs text-gray-500 mt-0.5">Favorite jobs</p>
            </div>
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-amber-500 shadow-xs">
              <Bookmark className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-emerald-50/50 p-4 rounded-xl flex items-center justify-between border border-emerald-100">
            <div>
              <p className="text-xl font-bold text-gray-900">574</p>
              <p className="text-xs text-gray-500 mt-0.5">Job Alerts</p>
            </div>
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-emerald-500 shadow-xs">
              <Bell className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-red-500 text-white rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image
              src="/userprofile.avif"
              alt="User profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
              height={500}
              width={500}
            />
            <div>
              <h3 className="font-semibold text-sm sm:text-base">
                Your profile editing is not completed.
              </h3>
              <p className="text-xs text-red-100 mt-0.5">
                Complete your profile editing & build your custom Resume
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/settings"
            className="bg-white text-red-500 hover:bg-red-50 text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 whitespace-nowrap transition"
          >
            Edit Profile
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900">Recently Applied</h2>
            <Link
              href="/jobs"
              className="text-xs text-gray-400 hover:text-blue-600 flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-white rounded-lg border overflow-hidden">
            <Table className="min-w-150">
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="py-2.5 px-4 text-[11px] font-semibold text-gray-400 uppercase">
                    Job
                  </TableHead>
                  <TableHead className="py-2.5 px-4 text-[11px] font-semibold text-gray-400 uppercase">
                    Date Applied
                  </TableHead>
                  <TableHead className="py-2.5 px-4 text-[11px] font-semibold text-gray-400 uppercase">
                    Status
                  </TableHead>
                  <TableHead className="py-2.5 px-4 text-[11px] font-semibold text-gray-400 uppercase text-right">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="text-xs">
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="py-8 text-center text-gray-400">
                      Loading recent applications...
                    </TableCell>
                  </TableRow>
                ) : appliedJobs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="py-8 text-center text-gray-400">
                      No recent applications found.
                    </TableCell>
                  </TableRow>
                ) : (
                  appliedJobs.map((job) => {
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
                        <TableCell className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            {job.company_logo ? (
                              <img
                                src={job.company_logo}
                                alt={job.company_name}
                                className="w-9 h-9 rounded-md object-cover border border-gray-100"
                              />
                            ) : (
                              <div className="w-9 h-9 bg-blue-600 text-white font-bold rounded-md flex items-center justify-center text-xs">
                                {job.company_name?.charAt(0) || 'J'}
                              </div>
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900">
                                  {job.title}
                                </span>
                                <span className="bg-blue-50 text-blue-600 text-[10px] font-medium px-2 py-0.5 rounded-full">
                                  {job.job_type || 'Full Time'}
                                </span>
                              </div>
                              <p className="text-gray-400 text-[11px] mt-0.5">
                                {job.candidate_required_location || 'Remote'} •{' '}
                                {job.salary || '$50k-80k/month'}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="py-3 px-4 text-gray-500 whitespace-nowrap">
                          {job.publication_date
                            ? job.publication_date.slice(0, 10)
                            : 'Recently'}
                        </TableCell>

                        <TableCell className="py-3 px-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                            <Check className="w-3.5 h-3.5" /> Active
                          </span>
                        </TableCell>

                        <TableCell className="py-3 px-4 text-right whitespace-nowrap">
                          <Link
                            href={`/jobdetails/${job.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className={`inline-block font-semibold px-3 py-1.5 rounded-md transition text-xs ${
                              isHighlighted
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-blue-600'
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
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default UserDashboard;