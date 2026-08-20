import Link from "next/link";
import {
  Bookmark,
  BriefcaseBusiness,
  Clock3,
  MapPin,
} from "lucide-react";

import type { Job } from "../data/jobs";

type JobCardProps = {
  job: Job;
};

export default function JobCard({ job }: JobCardProps) {
  return (
    <article className="group rounded-xl border border-[#e6e9e8] bg-white p-5 transition-all duration-200 hover:border-[#159a8c]/40 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        {/* Company + Job */}
        <div className="flex min-w-0 gap-4">
          {/* Logo */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#e8eceb] bg-[#f5f8f7]">
            <div className="text-xs font-bold text-[#159a8c]">
              {job.company.charAt(0)}
            </div>
          </div>

          <div className="min-w-0">
            <Link
              href={`/jobs/${job.id}`}
              className="block truncate text-sm font-semibold text-[#171717] transition-colors hover:text-[#159a8c]"
            >
              {job.title}
            </Link>

            <p className="mt-1 text-xs text-gray-500">
              {job.company}
            </p>
          </div>
        </div>

        {/* Bookmark */}
        <button
          type="button"
          aria-label={`Save ${job.title}`}
          className="shrink-0 text-gray-400 transition-colors hover:text-[#159a8c]"
        >
          <Bookmark className="h-[18px] w-[18px]" />
        </button>
      </div>

      {/* Job Information */}
      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <MapPin className="h-3.5 w-3.5 text-[#159a8c]" />
          <span>{job.location}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <BriefcaseBusiness className="h-3.5 w-3.5 text-[#159a8c]" />
          <span>{job.jobType}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Clock3 className="h-3.5 w-3.5 text-[#159a8c]" />
          <span>{job.experience}</span>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-5 flex items-center justify-between gap-4 border-t border-[#eef0ef] pt-4">
        <div>
          {job.salary && (
            <p className="text-xs font-medium text-[#171717]">
              {job.salary}
            </p>
          )}

          <p className="mt-1 text-[11px] text-gray-400">
            {job.postedDate}
          </p>
        </div>

        <Link
          href={`/jobs/${job.id}`}
          className="rounded-md bg-[#159a8c] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#0f756a]"
        >
          Apply Now
        </Link>
      </div>
    </article>
  );
}