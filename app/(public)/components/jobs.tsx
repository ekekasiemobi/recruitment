
'use client'
// import Nav from '../../components/nav'
import type { SubmitHandler } from "react-hook-form"

import { useForm} from "react-hook-form"
import { useEffect, useState } from 'react'
import axios from 'axios'
import type { JobResponse } from '../../types/types'
import type { Inputs } from '../../types/types'
import Link from "next/link"
import  {formatRelativeTime } from '../../types/formatetime'
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

function Home() {
    const [jobs, setJobs] = useState<JobResponse[]>([])
    const [error, setError] = useState("")

    // console.log(error)

    const {register,handleSubmit,formState: { errors },} = useForm<Inputs>()
    // console.log(watch("example"))

    useEffect(() =>{
        async function fetchJobs() {
        
            try{
                // const response: any = await axios.get('https://www.arbeitnow.com/api/job-board-api',{

                // const response: any = await axios.get('https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=2bfa69d4&app_key=abec593fd7d9eba5ad0a8a0ac1e1c101',{

                const response: any = await axios.get('https://remotive.com/api/remote-jobs',{
                    headers:{
                        "Content-Type":"application/json;Charset=UTF-8"
                    }
                })

                if(response.status === 200){
                    const fetchedJobs = response.data.jobs
                    console.log(response.data)
                    setJobs(fetchedJobs) 
                }
            }
            catch(error: any){
                setError(error.message)
            }
        }
        fetchJobs()
    },[])


    const onSubmit: SubmitHandler<Inputs> = (data) =>{

        // console.log(data)
        const searchQuery = data.example?.trim()
        if(searchQuery.length > 0){
            const filteredJobs = jobs.filter((job) =>
                job.categories?.some((category) =>
                    category.toLowerCase().includes(searchQuery.toLowerCase())
                )
            ); 
            setJobs(filteredJobs)
        } else{
            setJobs(jobs)
        }
    } 

    if (error) return <p className="p-5 text-center text-red-500">Error: {error}</p>

  return (
    <>
        {/* <Nav/> */}

        <main className='bg-white min-h-screen '>
       
            <div className='sm-bg md:md-bg bg-[#5EA4A3] p-15 relative'>
                
            </div>

            <div className='w-[90vw] mx-auto pt-10'>

                {/* <form className='bg-white p-3 w-[90vw] mx-auto shadow-xs flex justify-between gap-3 absolute -mt-20' onSubmit={handleSubmit(onSubmit)}>
                        
                    <input className='w-full p-3'  type="search"  placeholder='Search by categories' {...register("example")} />
                    {errors.example && <span>This field is required</span>}

                    <input className=' bg-[#5EA4A3] text-white text-xs px-5 rounded' type="submit" />
                </form> */}
                
                {jobs
                    ?.filter((job) => job.slug !== "chainstack").slice(0, 21).map((job) => {

                    return( 
                      <Link href={`/jobdetails/${job.id}`} 
                        key={job.id} 
                        className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-9 transition hover:shadow-md"
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
        
                          {/* Info Badges */}
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
                )
                })}
                 
            </div>

        </main>
    </>
  )
}

export default Home