"use client";

import {
  InputHTMLAttributes,
  useState,
} from "react";

import { Eye, EyeOff } from "lucide-react";

interface AuthInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function AuthInput({
  label,
  error,
  id,
  type = "text",
  className = "",
  ...props
}: AuthInputProps) {
  const [showPassword, setShowPassword] =
    useState(false);

  const isPassword = type === "password";

  const inputType =
    isPassword && showPassword
      ? "text"
      : type;

  return (
    <div className="w-full space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-[#242424]"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={inputType}
          {...props}
          className={`h-12 w-full rounded-md border bg-white px-4 text-sm text-[#242424] outline-none transition placeholder:text-gray-400 focus:border-[#1B4332] focus:ring-1 focus:ring-[#1B4332] ${
            isPassword ? "pr-12" : ""
          } ${
            error
              ? "border-red-500"
              : "border-gray-300"
          } ${className}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() =>
              setShowPassword(
                (previous) => !previous
              )
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {showPassword ? (
              <EyeOff size={19} />
            ) : (
              <Eye size={19} />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs text-green-500">
          {error}
        </p>
      )}
    </div>
  );
}
export function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="flex h-[47px] w-full items-center justify-center gap-3 rounded-[4px] bg-[#1677D2] text-[14px] font-semibold text-white transition hover:bg-[#1069C2] disabled:cursor-not-allowed disabled:opacity-60"
      {...props}
    >
      {children}
    </button>
  );
}