import React from 'react';
import Link from 'next/link';
import { 
  User, 
  Clock, 
  Briefcase, 
  GraduationCap, 
  DollarSign, 
  MapPin, 
  Mail, 
  Phone, 
  MessageSquare, 
  Bookmark, 
  Award,
  Check
} from 'lucide-react';
import { formatRelativeTime } from '../../../types/formatetime'; 
import Hero2 from '../../components/hero2';

async function getJobData(jobId: string) {
  try {
    const res = await fetch('https://remotive.com/api/remote-jobs', {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) return { currentJob: null, relatedJobs: [] };
    
    const data = await res.json();
    const jobs = data.jobs || [];
    
    const currentJob = jobs.find((j: any) => j.id.toString() === jobId) || null;
    const relatedJobs = jobs
      .filter((j: any) => j.id.toString() !== jobId)
      .slice(0, 3);

    return { currentJob, relatedJobs };
  } catch (error) {
    return { currentJob: null, relatedJobs: [] };
  }
}

export default async function JobDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const { currentJob, relatedJobs } = await getJobData(id);

  if (!currentJob) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800">Job Not Found</h2>
          <p className="text-gray-500 mt-2">The job position you are looking for does not exist or has expired.</p>
          <Link href="/" className="mt-6 inline-block bg-[#2a9d8f] text-white px-6 py-2.5 rounded-lg text-sm font-medium">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
    <Hero2 title="Job detail" />
    <div className="min-h-screen bg-white text-gray-800 py-10 px-4 md:px-8">

      <div className="max-w-7xl mx-auto bg-white">
        <div className="max-w-7xl mx-auto p-6 sm:p-8">

          <div className="flex items-center justify-between mb-4">
            <span className="bg-[#2a9d8f]/10 text-[#2a9d8f] text-xs font-semibold px-3 py-1 rounded-full">
              {formatRelativeTime ? formatRelativeTime(currentJob.publication_date) : '10 min ago'}
            </span>
            <button
              aria-label="Bookmark Job"
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <Bookmark className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-start gap-4 mb-6">
            {currentJob.company_logo ? (
              <img
                src={currentJob.company_logo}
                alt={currentJob.company_name}
                className="w-12 h-12 rounded-xl object-cover" />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-linear-to-tr from-orange-400 via-pink-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xl">
                {currentJob.company_name?.charAt(0) || 'C'}
              </div>
            )}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                {currentJob.title}
              </h1>
              <p className="text-gray-500 text-sm font-medium mt-1">
                {currentJob.company_name}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-gray-100 pt-6">

            <div className="flex flex-wrap items-center gap-6 text-xs text-gray-500 font-medium">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#2a9d8f]" />
                <span>{currentJob.category || 'Commerce'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2a9d8f]" />
                <span>{currentJob.job_type || 'Full time'}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#2a9d8f]" />
                <span>{currentJob.salary || '$40000-$42000'}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2a9d8f]" />
                <span>{currentJob.candidate_required_location || 'New-York, USA'}</span>
              </div>
            </div>


            <a
              href={currentJob.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center bg-[#2a9d8f] hover:bg-[#238377] text-white text-sm font-medium px-8 py-3 rounded-xl shadow-xs transition"
            >
              Apply Job
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        <div className="lg:col-span-8 flex flex-col gap-8">


          <div className="bg-white p-6 sm:p-8 rounded-2xl ">
            <div>
              {[
                "Work with cross-functional teams to define, design, and ship new features.",
                "Ensure performance, quality, and responsiveness of application modules.",
                "Collaborate with engineering leadership on standard practices and specs.",
                "Participate in code reviews, design syncs, and architecture decisions.",
                "Maintain high standards for testing, security, and component quality.",
                "Identify and correct bottlenecks and fix technical debt or bugs."
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 p-0.5 rounded-full bg-emerald-50 text-emerald-600">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            <div
              className="prose max-w-none text-gray-700 text-sm leading-relaxed border-t pt-6 border-gray-100"
              dangerouslySetInnerHTML={{ __html: currentJob.description }} />

            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-100">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#2a9d8f]/10 text-[#2a9d8f]">
                {currentJob.job_type || 'Full time'}
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                {currentJob.category || 'Commerce'}
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                {currentJob.candidate_required_location || 'Remote'}
              </span>
              {currentJob.tags?.slice(0, 3).map((tag: string, i: number) => (
                <span key={i} className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  {tag}
                </span>
              ))}
            </div>
          </div>


          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Related Jobs</h3>
            {relatedJobs.map((job: any) => (
              <Link href={`/jobdetails/${job.id}`}
                key={job.id}
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition hover:shadow-md"
              >
                <div className="space-y-3 w-full sm:w-auto">
                  <div className="flex items-center justify-between sm:justify-start gap-3">
                    <span className="bg-emerald-50 text-emerald-600 text-xs px-2.5 py-1 rounded-md font-medium">
                      {formatRelativeTime ? formatRelativeTime(job.publication_date) : 'Recently'}
                    </span>
                    <button className="sm:hidden text-gray-400 hover:text-gray-600">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    {job.company_logo ? (
                      <img src={job.company_logo} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                        {job.company_name?.charAt(0) || 'C'}
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-gray-900 text-base leading-snug">{job.title}</h4>
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
                      <span>{job.salary || '$40000-$60000'}</span>
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
                    className="w-full sm:w-auto text-center bg-[#2a9d8f] hover:bg-[#238377] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition"
                  >
                    Job Details
                  </Link>
                </div>
              </Link>
            ))}
          </div>

        </div>


        <div className="lg:col-span-4 flex flex-col gap-6">

          <div className="bg-[#f0fdfa] p-6 rounded-2xl border border-emerald-100 space-y-5">
            <h2 className="font-bold text-gray-900 text-lg">Job Overview</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-[#2a9d8f] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Job Title</p>
                  <p className="text-xs font-semibold text-gray-800">{currentJob.title}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#2a9d8f] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Job Type</p>
                  <p className="text-xs font-semibold text-gray-800">{currentJob.job_type || 'Full Time'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-[#2a9d8f] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Category</p>
                  <p className="text-xs font-semibold text-gray-800">{currentJob.category || 'Commerce'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-[#2a9d8f] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Experience</p>
                  <p className="text-xs font-semibold text-gray-800">5 Years</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-[#2a9d8f] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Degree</p>
                  <p className="text-xs font-semibold text-gray-800">Master</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-[#2a9d8f] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Offered Salary</p>
                  <p className="text-xs font-semibold text-gray-800">{currentJob.salary || '$40000-$42000'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#2a9d8f] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Location</p>
                  <p className="text-xs font-semibold text-gray-800">{currentJob.candidate_required_location || 'New-York, USA'}</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-emerald-200 mt-2 relative h-40 bg-slate-200">
              <iframe
                title="Job Location Map"
                className="w-full h-full border-0"
                src="https://maps.google.com/maps?q=New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
                loading="lazy" />
            </div>
          </div>

          <div className="bg-[#f0fdfa] p-6 rounded-2xl border border-emerald-100 space-y-4">
            <h2 className="font-bold text-gray-900 text-lg">Send Us Message</h2>

            <form className="space-y-3">
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#2a9d8f]" />
              </div>

              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#2a9d8f]" />
              </div>

              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#2a9d8f]" />
              </div>

              <div className="relative">
                <MessageSquare className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                <textarea
                  rows={3}
                  placeholder="Your Message"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#2a9d8f] resize-none" />
              </div>

              <button
                type="submit"
                className="bg-[#2a9d8f] hover:bg-[#238377] text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>

      </div>
    </div></>
  );
}