"use client";

import {
  FormEvent,
  useState,
} from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import {AuthInput, Button} from "../components/AuthInput";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    setLoading(true);

   
    setTimeout(() => {
      sessionStorage.setItem(
        "resetEmail",
        email
      );

      toast.success(
        "Verification code sent."
      );

      setLoading(false);

      router.push("/verify");
    }, 700);
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-6">
        <div className="w-full">

          <h1 className="text-3xl font-bold text-[#1B4332]">
            Forgot password?
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter your email address to reset your
            password.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <AuthInput
              id="email"
              name="email"
              label="Email address"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              error={error}
            />

            <Button
              type="submit"
              disabled={loading}
              
            >
              {loading
                ? "Sending..."
                : "Continue"}
            </Button>
          </form>

          <Link
            href="/login"
            className="mt-6 block text-center text-sm text-[#1B4332] hover:underline"
          >
            Back to login
          </Link>
        </div>
      </div>
    </main>
  );
}