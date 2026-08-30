"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import {AuthInput, Button } from "../components/AuthInput";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const verified =
      sessionStorage.getItem(
        "resetVerified"
      );

    if (verified !== "true") {
      router.replace(
        "/forgot-password"
      );
    }
  }, [router]);

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const newErrors: Record<
      string,
      string
    > = {};

    if (password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters.";
    }

    if (
      password !==
      confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    /*
     * DummyJSON does not provide a real
     * password reset endpoint.
     */

    sessionStorage.removeItem(
      "resetVerified"
    );

    sessionStorage.removeItem(
      "resetEmail"
    );

    toast.success(
      "Password reset successfully."
    );

    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-6">
        <div className="w-full">

          <h1 className="text-3xl font-bold text-[#1B4332]">
            Create new password
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter a new password for your account.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <AuthInput
              id="password"
              name="password"
              label="New password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              error={errors.password}
            />

            <AuthInput
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm password"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              error={
                errors.confirmPassword
              }
            />

            <Button
              type="submit"
              
            >
              Reset password
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}