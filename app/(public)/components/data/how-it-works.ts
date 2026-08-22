import {
  UserPlus,
  FileText,
  Search,
  Send,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type HowItWorksStep = {
  id: number;
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const howItWorksSteps: HowItWorksStep[] = [
  {
    id: 1,
    step: "01",
    title: "Create Account",
    description:
      "Create your account and complete your profile to get started.",
    icon: UserPlus,
  },
  {
    id: 2,
    step: "02",
    title: "Upload Resume",
    description:
      "Upload your resume and showcase your skills and experience.",
    icon: FileText,
  },
  {
    id: 3,
    step: "03",
    title: "Find Jobs",
    description:
      "Search through available opportunities and find jobs that match your skills.",
    icon: Search,
  },
  {
    id: 4,
    step: "04",
    title: "Apply Job",
    description:
      "Apply for your preferred position and take the next step in your career.",
    icon: Send,
  },
];