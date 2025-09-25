"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [progress, setProgress] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push("/login");
      else setUser(data.user);
    });
  }, []);

  useEffect(() => {
    if (!user) return;
    supabase.from("user_progress").select("*").eq("user_id", user.id)
      .then(({ data }) => setProgress(data || []));
  }, [user]);

  const downloadCertificate = () => {
    alert("Certificate download placeholder");
  };

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p>Lessons Completed: {progress.filter(p => p.completed).length}</p>
      <p>Quiz Passed: {progress.some(p => p.quiz_passed) ? "✅" : "❌"}</p>
      {progress.some(p => p.quiz_passed) && (
        <button onClick={downloadCertificate} className="mt-4 px-6 py-2 bg-green-600 text-white rounded">Download Certificate</button>
      )}
    </div>
  );
}
