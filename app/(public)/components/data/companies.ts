export type Company = {
  id: number;
  name: string;
  description: string;
  jobCount: number;
  logo?: string;
};

export const companies: Company[] = [
  {
    id: 1,
    name: "Instagram",
    description: "Technology & Social Media",
    jobCount: 24,
  },
  {
    id: 2,
    name: "Tesla",
    description: "Automotive & Technology",
    jobCount: 18,
  },
  {
    id: 3,
    name: "McDonald's",
    description: "Food & Hospitality",
    jobCount: 31,
  },
  {
    id: 4,
    name: "Apple",
    description: "Technology & Electronics",
    jobCount: 42,
  },
];