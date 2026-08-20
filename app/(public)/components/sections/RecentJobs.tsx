import Link from "next/link";

import { jobs } from "../data/jobs";
import JobCard from "../cards/JobCard";
console.log(jobs)
export default function RecentJobs() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#171717] sm:text-3xl">
              Recent Jobs Available
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Discover the latest opportunities from top employers.
            </p>
          </div>

          <Link
            href="/jobs"
            className="hidden text-sm font-medium text-[#159a8c] hover:underline sm:block"
          >
            View all
          </Link>
        </div>

        <div className="space-y-3">
          {jobs.slice(0, 5).map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/jobs"
            className="text-sm font-medium text-[#159a8c]"
          >
            View all jobs
          </Link>
        </div>
      </div>
    </section>
  );
}