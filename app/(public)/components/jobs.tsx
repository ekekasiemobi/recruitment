'use client'
// import Nav from '../../components/nav'
import type { SubmitHandler } from "react-hook-form"
import { useForm} from "react-hook-form"
import { useEffect, useState } from 'react'
import axios from 'axios'
import type { JobResponse } from '../../types/types'
import type { Inputs } from '../../types/types'
import Link from "next/link"
import  {formatRelativeTime } from '../../types/formatetime';

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
                        <Link className="pb-15" href={`/jobdetails/${job.id

                        }`}>
                        
                        <div key={job.guid} className='bg-white  grid md:grid-cols-[26vw_1fr] justify-between p-5 mt-10 md:gap-15 gap-6 relative shadow-xs'>
                            <img className='md:hidden absolute w-9 -top-5 mx-5 rounded' src={job.companyLogo} alt="" />

                            <div className='flex gap-3 justify-start items-center mt-2 md:mt-0 '>
                                <img className='w-15 hidden md:block rounded' src={job.company_logo} alt="" />
                                
                                <div className='flex flex-col gap-1'>
                                    

                                    <div>
                                        <p className='font-bold text-sm league-spartan'>{job.title}</p>
                                    </div>

                                    <div className='flex gap-2'>
                                        <p className='text-[#84B1AF] text font-bold league-spartan'>{job.company_name}</p>
                                    </div>
                                    
                                    <div className='flex gap-7'>
                                        <p className='text league-spartan'>{formatRelativeTime(job.publication_date)}</p>
                                        <p className='text league-spartan'>{job.employmentType}</p>
                                        <p className='text league-spartan'>{job.locationRestrictions}</p>
                                    
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-start md:justify-end gap-2 border-t pt-4 md:border-0 ">
                                {job.categories?.map((category, index) =>{
                                    return(
                                        <p key={index} className="league-spartan bg-[#F0F6F5] p-2 text-[#5AA6A5] font-bold text-xs flex items-center justify-center rounded ">{category}</p>
                                    )
                                })}   
                            
                            </div>
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