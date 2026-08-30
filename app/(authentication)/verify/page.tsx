"use client";

import {
  FormEvent,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import {AuthInput, Button } from "../components/AuthInput";

export default function VerifyCodePage() {
  const router = useRouter();

  const [code, setCode] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (code.length !== 6) {
      setError(
        "Enter the 6-digit verification code."
      );

      return;
    }

    sessionStorage.setItem(
      "resetVerified",
      "true"
    );

    toast.success(
      "Verification successful."
    );

    router.push("/reset-password");
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-6">
        <div className="w-full">

          <h1 className="text-3xl font-bold text-[#1B4332]">
            Verify your email
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter the verification code sent to
            your email.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <AuthInput
              id="code"
              name="code"
              label="Verification code"
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) =>
                setCode(
                  e.target.value.replace(
                    /\D/g,
                    ""
                  )
                )
              }
              error={error}
            />

            <Button
              type="submit"
              
            >
              Verify code
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}