export type Job = {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  jobType: string;
  experience: string;
  salary?: string;
  postedDate: string;
};

export const jobs: Job[] = [
  {
    id: 1,
    title: "Forensic Security Director",
    company: "SecureTech",
    companyLogo: "/images/companies/securetech.png",
    location: "Lagos, Nigeria",
    jobType: "Full Time",
    experience: "5+ Years",
    salary: "₦500k - ₦800k",
    postedDate: "2 days ago",
  },
  {
    id: 2,
    title: "Regional Creative Facilitator",
    company: "Creative Hub",
    companyLogo: "/images/companies/creative-hub.png",
    location: "Abuja, Nigeria",
    jobType: "Full Time",
    experience: "3+ Years",
    salary: "₦350k - ₦550k",
    postedDate: "3 days ago",
  },
  {
    id: 3,
    title: "Internal Integration Planner",
    company: "TechFlow",
    companyLogo: "/images/companies/techflow.png",
    location: "Lagos, Nigeria",
    jobType: "Full Time",
    experience: "2+ Years",
    salary: "₦300k - ₦450k",
    postedDate: "4 days ago",
  },
  {
    id: 4,
    title: "District Internet Director",
    company: "NetWorks",
    companyLogo: "/images/companies/networks.png",
    location: "Port Harcourt, Nigeria",
    jobType: "Contract",
    experience: "4+ Years",
    salary: "₦400k - ₦600k",
    postedDate: "5 days ago",
  },
  {
    id: 5,
    title: "Corporate Tactics Facilitator",
    company: "Global Corp",
    companyLogo: "/images/companies/global-corp.png",
    location: "Lagos, Nigeria",
    jobType: "Full Time",
    experience: "3+ Years",
    salary: "₦350k - ₦500k",
    postedDate: "6 days ago",
  },
];