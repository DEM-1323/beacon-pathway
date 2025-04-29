import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - Beacon Pathway",
  description: "Log in or sign up for Beacon Pathway",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Auth pages have no navbar, only the content */}
      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>
      <footer className="py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Beacon Pathway. All rights reserved.
      </footer>
    </div>
  );
}
