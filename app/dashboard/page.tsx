"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login"); // ✅ redirect to login if not authenticated
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    checkUser();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
      {/* dashboard content here */}
    </div>
  );
}
