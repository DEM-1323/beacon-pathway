import { redirect } from "next/navigation";
import { createClient } from "@/lib/utils/supabase/server";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  // Check if the user is authenticated using server-side Supabase client
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect based on authentication status
  if (!user) {
    redirect("/login");
  } else {
    redirect("/dashboard");
  }

  // This won't be rendered due to the redirects above
  return null;
}
