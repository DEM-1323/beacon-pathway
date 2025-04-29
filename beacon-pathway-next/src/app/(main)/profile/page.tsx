import { redirect } from "next/navigation";
import { createClient } from "@/lib/utils/supabase/server";
import LogoutButton from "@/components/LogoutButton";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Your Profile</h1>
        <LogoutButton />
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-lg font-medium">Account Information</h2>
          <p className="text-gray-500">Manage your account details</p>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <dl className="divide-y divide-gray-200">
            <div className="py-4 grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="text-sm text-gray-900 col-span-2">
                {data.user.email}
              </dd>
            </div>
            <div className="py-4 grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">User ID</dt>
              <dd className="text-sm text-gray-900 col-span-2">
                {data.user.id}
              </dd>
            </div>
            <div className="py-4 grid grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-gray-500">
                Last Sign In
              </dt>
              <dd className="text-sm text-gray-900 col-span-2">
                {data.user.last_sign_in_at
                  ? new Date(data.user.last_sign_in_at).toLocaleString()
                  : "N/A"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
