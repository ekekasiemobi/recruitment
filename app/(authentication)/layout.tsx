import type { Metadata } from "next";

// import "./globals.css";

import { AuthProvider } from "./components/AuthContext";

import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Job Portal",
  description:
    "Find your next career opportunity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
          }}
        />
      </body>
    </html>
  );
}