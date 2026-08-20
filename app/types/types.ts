export type JobResponse = {
    companyLogo: string;
    companySlug: string;
    companyName: string;
    categories: string[];
    employmentType: string;
    title: string;
    description: string;
    remote: boolean;
    seniority: string;
    url: string;
    tags: string[];
    job_types: string[];
    locationRestrictions: string;
    created_at: number;
    guid: string;
    applicationLink: string;
    expiryDate: number;
    pubDate: number;
    maxSalary: number;
    minSalary: number;
    slug: string
    company_logo: string;
    company_name: string;
    publication_date: string;
    id: number; 
    category: string;
    job_type:string;
    salary:number;
    candidate_required_location: string;





}

export type Inputs = {
  example: string
  exampleRequired: string
}