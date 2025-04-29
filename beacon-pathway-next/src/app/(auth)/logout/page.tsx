"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function LogoutPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const signOut = async () => {
      try {
        const { error } = await supabase.auth.signOut();

        if (error) {
          throw error;
        }

        // Redirect to login page after successful logout
        router.push("/login");
      } catch (error: any) {
        setError(error.message || "An error occurred during logout.");
      }
    };

    signOut();
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Logging Out</h1>

          {error ? (
            <>
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
              <button
                onClick={() => router.push("/login")}
                className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Return to Login
              </button>
            </>
          ) : (
            <p className="text-gray-600">Please wait while we log you out...</p>
          )}
        </div>
      </div>
    </div>
  );
}
