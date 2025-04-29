import { redirect } from "next/navigation";
import { createClient } from "@/lib/utils/supabase/server";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default async function Dashboard() {
  // Check if the user is authenticated
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // Redirect to login if not authenticated
  if (error || !user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col space-y-8">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <LogoutButton />
      </header>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Welcome, {user.email}</h2>
        <p className="text-gray-600 mb-4">
          You are now logged in to Beacon Pathway.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Your Pathway</h2>
          <p className="text-gray-600 mb-4">
            Take our pathway assessment quiz to discover personalized career and
            learning opportunities.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Start Pathway Quiz
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <p className="text-gray-600 mb-4">
            View and update your profile information.
          </p>
          <Link
            href="/profile"
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            View Profile
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">BeaconBot</h2>
          <p className="text-gray-600 mb-4">
            Get instant answers to your questions about academic pathways and
            opportunities.
          </p>
          <Link
            href="/beaconbot"
            className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
          >
            Chat with BeaconBot
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Schedule Builder</h2>
          <p className="text-gray-600 mb-4">
            Plan your academic journey with our intuitive schedule building
            tool.
          </p>
          <Link
            href="/schedule-builder"
            className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
          >
            Build Your Schedule
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Beacon Community</h2>
          <p className="text-gray-600 mb-4">
            Connect with peers and mentors on similar academic and career paths.
          </p>
          <Link
            href="/beacon-community"
            className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
          >
            Join Community
          </Link>
        </div>
      </section>
    </div>
  );
}
