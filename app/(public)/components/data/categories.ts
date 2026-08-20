import {
  Building2,
  Car,
  GraduationCap,
  HardHat,
  Landmark,
  Plane,
  ShoppingBag,
  Wheat,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export type Category = {
  id: number;
  title: string;
  jobCount: number;
  icon: LucideIcon;
};

export const categories: Category[] = [
  {
    id: 1,
    title: "Agriculture",
    jobCount: 120,
    icon: Wheat,
  },
  {
    id: 2,
    title: "Metal Production",
    jobCount: 86,
    icon: HardHat,
  },
  {
    id: 3,
    title: "Commerce",
    jobCount: 145,
    icon: ShoppingBag,
  },
  {
    id: 4,
    title: "Construction",
    jobCount: 98,
    icon: Building2,
  },
  {
    id: 5,
    title: "Hotels & Tourism",
    jobCount: 74,
    icon: Plane,
  },
  {
    id: 6,
    title: "Education",
    jobCount: 112,
    icon: GraduationCap,
  },
  {
    id: 7,
    title: "Financial Services",
    jobCount: 94,
    icon: Landmark,
  },
  {
    id: 8,
    title: "Transport",
    jobCount: 67,
    icon: Car,
  },
];