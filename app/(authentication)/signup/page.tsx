"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BriefcaseBusiness,
  Eye,
  EyeOff,
  
  UserRound,
} from "lucide-react";

import { useAuth } from "../components/AuthContext";

type AccountType = "Job seeker" | "employer";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();

  const [accountType, setAccountType] =
    useState<AccountType>("employer");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (!form.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!form.username.trim()) {
      setError("Please enter a username.");
      return;
    }

    if (!form.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (form.password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (
      form.password !== form.confirmPassword
    ) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      

      await signup({
        fullName: form.fullName,
        username: form.username,
        email: form.email,
        password: form.password,
        role: accountType,
      });

      
      localStorage.setItem(
        "signupRole",
        accountType
      );

      localStorage.setItem(
        "signupEmail",
        form.email
      );

      router.push("/login");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">

      <div className="flex min-h-screen w-full">

       
        <section className="flex w-full flex-col bg-white lg:w-[50%]">

         
          <div>

              <span className="text-[20px] font-bold tracking-tight text-[#202124]">
                Her Recruit
              </span>
            
          </div>

          

          <div className="mx-auto flex w-full max-w-[560px] flex-1 items-center px-8 py-12 sm:px-12 lg:px-16 xl:px-20">

            <div className="w-full">

              

              <div className="mb-5">
                <h1 className="text-[30px] font-semibold leading-tight text-[#171717]">
                  Create account.
                </h1>

                <p className="mt-2 text-[14px] text-[#8B939E]">
                  Already have account?{" "}
                  <Link
                    href="/login"
                    className="font-medium text-[#1677D2] hover:underline"
                  >
                    Log In
                  </Link>
                </p>
              </div>

              

              <div className="mb-5 rounded-[7px] bg-[#F0F1F3] p-1">

                <p className="mb-1.5 text-center text-[9px] font-medium uppercase tracking-wide text-[#8C939E]">
                  Create account as a
                </p>

                <div className="grid grid-cols-2 gap-1">

                  

                  <button
                    type="button"
                    onClick={() =>
                      setAccountType("Job seeker")
                    }
                    className={`flex h-[42px] items-center justify-center gap-2 rounded-[5px] text-[13px] font-medium transition ${
                      accountType === "Job seeker"
                        ? "bg-[#0A315C] text-white"
                        : "text-[#59616C] hover:bg-white"
                    }`}
                  >
                    <UserRound size={17} />

                  Job seeker
                  </button>

                
                  <button
                    type="button"
                    onClick={() =>
                      setAccountType("employer")
                    }
                    className={`flex h-[42px] items-center justify-center gap-2 rounded-[5px] text-[13px] font-medium transition ${
                      accountType === "employer"
                        ? "bg-[#0A315C] text-white"
                        : "text-[#59616C] hover:bg-white"
                    }`}
                  >
                    <BriefcaseBusiness
                      size={17}
                    />

                    Employers
                  </button>

                </div>
              </div>

             

              {error && (
                <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                {/* Full name + username */}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    autoComplete="name"
                    className="h-[43px] w-full rounded-[5px] border border-[#E1E4E8] bg-white px-4 text-[13px] text-[#333] outline-none transition placeholder:text-[#9BA3AE] focus:border-[#1677D2]"
                  />

                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Username"
                    autoComplete="username"
                    className="h-[43px] w-full rounded-[5px] border border-[#E1E4E8] bg-white px-4 text-[13px] text-[#333] outline-none transition placeholder:text-[#9BA3AE] focus:border-[#1677D2]"
                  />

                </div>

                {/* Email */}

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  autoComplete="email"
                  className="h-[43px] w-full rounded-[5px] border border-[#E1E4E8] bg-white px-4 text-[13px] text-[#333] outline-none transition placeholder:text-[#9BA3AE] focus:border-[#1677D2]"
                />

                {/* Password */}

                <div className="relative">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    autoComplete="new-password"
                    className="h-[43px] w-full rounded-[5px] border border-[#E1E4E8] bg-white px-4 pr-12 text-[13px] text-[#333] outline-none transition placeholder:text-[#9BA3AE] focus:border-[#1677D2]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5F6368]"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

                

                <div className="relative">

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={
                      form.confirmPassword
                    }
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                    className="h-[43px] w-full rounded-[5px] border border-[#E1E4E8] bg-white px-4 pr-12 text-[13px] text-[#333] outline-none transition placeholder:text-[#9BA3AE] focus:border-[#1677D2]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5F6368]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

               

                <label className="flex cursor-pointer items-center gap-2 text-[12px] text-[#8A929D]">

                  <input
                    type="checkbox"
                    required
                    className="h-[17px] w-[17px] rounded border-[#D6DCE2] accent-[#1677D2]"
                  />

                  <span>
                    I've read and agree with your{" "}
                    <Link
                      href="/terms"
                      className="font-medium text-[#1677D2]"
                    >
                      Terms of Services
                    </Link>
                  </span>

                </label>

                

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-[47px] w-full items-center justify-center gap-3 rounded-[4px] bg-[#1677D2] text-[14px] font-semibold text-white transition hover:bg-[#1069C2] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Creating Account..."
                    : "Create Account"}

                  {!loading && (
                    <ArrowRight size={19} />
                  )}
                </button>

              </form>

              

            </div>
          </div>
        </section>

       
        <section className="relative hidden min-h-screen overflow-hidden lg:flex lg:w-[50%]">

         

          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/images/auth/auth-bg.jpg')",
            }}
          />

         

          <div className="absolute inset-0 bg-[#06274C]/80" />

          

          <div className="relative z-10 flex w-full flex-col justify-end px-12 pb-20 xl:px-20">

            <h2 className="max-w-[650px] text-[44px] font-normal leading-[1.08] tracking-[-1.5px] text-white xl:text-[48px]">
              Over 1,75,324 candidates
              <br />
              waiting for good employees.
            </h2>

           
            <div className="mt-10 grid max-w-[650px] grid-cols-3 gap-8">

              

              <div>
                <div className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-[7px] bg-white/10 text-white backdrop-blur-sm">
                  <BriefcaseBusiness
                    size={23}
                  />
                </div>

                <p className="text-[17px] font-medium text-white">
                  1,75,324
                </p>

                <p className="mt-1 text-[12px] text-white/65">
                  Live Job
                </p>
              </div>

              

              <div>
                <div className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-[7px] bg-white/10 text-white backdrop-blur-sm">
                  <BriefcaseBusiness
                    size={23}
                  />
                </div>

                <p className="text-[17px] font-medium text-white">
                  97,354
                </p>

                <p className="mt-1 text-[12px] text-white/65">
                  Companies
                </p>
              </div>

              
              <div>
                <div className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-[7px] bg-white/10 text-white backdrop-blur-sm">
                  <BriefcaseBusiness
                    size={23}
                  />
                </div>

                <p className="text-[17px] font-medium text-white">
                  7,532
                </p>

                <p className="mt-1 text-[12px] text-white/65">
                  New Jobs
                </p>
              </div>

            </div>

          </div>
        </section>

      </div>
    </main>
  );
}