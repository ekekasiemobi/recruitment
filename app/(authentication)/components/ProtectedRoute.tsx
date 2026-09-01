"use client";

import {ReactNode, useEffect,} from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: ( | "Job seeker" | "employer")[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const router = useRouter();

  const {user, loading, isAuthenticated,} = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated|| !user) {
      router.replace("/login");
      return;
    }

    if (allowedRoles && user && !allowedRoles.includes(
        user.role as | "Job seeker" | "employer"
      )
    ) {
      router.replace("/login");
    }
  }, [
    loading,
    isAuthenticated,
    user,
    allowedRoles,
    router,
  ]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading...
        </p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  if (
    allowedRoles &&
    user &&
    !allowedRoles.includes(
      user.role as | "Job seeker" | "employer"
    )
  ) {
    return null;
  }

  return <>{children}</>;
}