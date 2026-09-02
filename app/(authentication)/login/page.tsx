"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {ArrowRight, BriefcaseBusiness, Eye, EyeOff,} from "lucide-react";
import { useAuth } from "../components/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    userName: "",
    password: "",
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

    if (!form.userName.trim()) {
      setError(
        "Please enter your username."
      );
      return;
    }

    if (!form.password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
     

      await login(
        form.userName,
        form.password
      );

      
      const role =
        localStorage.getItem(
          "signupRole"
        );

      if (role === "employer") {
        router.push(
          "/"
        );
      } else if (
        role === "Job seeker"
      ) {
        router.push(
          "/dashboard"
        );
      } else {
        router.push("/");
      }
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

            <div className="w-full max-w-[445px]">

              

              <div className="mb-7">

                <h1 className="text-[30px] font-semibold leading-tight text-[#171717]">
                  Login.
                </h1>

                <p className="mt-2 text-[14px] text-[#8B939E]">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-medium text-[#1677D2] hover:underline"
                  >
                    Create Account
                  </Link>
                </p>

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

                

                <input
                  type="userName"
                  name="userName"
                  value={form.userName}
                  onChange={handleChange}
                  placeholder="Enter username"
                  autoComplete="userName"
                  className="h-[43px] w-full rounded-[5px] border border-[#E1E4E8] bg-white px-4 text-[13px] text-[#333] outline-none transition placeholder:text-[#9BA3AE] focus:border-[#1677D2]"
                />

                
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
                    autoComplete="current-password"
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

                

                <div className="flex items-center justify-between">

                  <label className="flex cursor-pointer items-center gap-2 text-[12px] text-[#8A929D]">

                    <input
                      type="checkbox"
                      className="h-[16px] w-[16px] accent-[#1677D2]"
                    />

                    Remember me

                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-[12px] font-medium text-[#1677D2] hover:underline"
                  >
                    Forgot Password?
                  </Link>

                </div>

                

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-[47px] w-full items-center justify-center gap-3 rounded-[4px] bg-[#1677D2] text-[14px] font-semibold text-white transition hover:bg-[#1069C2] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Logging in..."
                    : "Login"}

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
          />
          <img 
    src="/authImg.png" 
    alt="Hiring background" 
    className="absolute inset-0 w-full h-full object-cover"
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