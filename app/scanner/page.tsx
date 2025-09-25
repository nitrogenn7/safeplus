"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function ScannerPage() {
  const [user, setUser] = useState<any>(null);
  const [text, setText] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => { supabase.auth.getUser().then(({ data }) => setUser(data.user)) }, []);

  if (!user) return (
    <div className="text-center py-20">
      <p className="text-lg">Please log in to use the scanner.</p>
      <button onClick={() => router.push("/login")} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Log in</button>
    </div>
  );

  const handleScan = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      setScore(data.score);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        className="w-full p-4 border rounded mb-4"
        rows={6}
        placeholder="Paste suspicious text here"
      />
      <button onClick={handleScan} disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded">
        {loading ? "Scanning..." : "Scan"}
      </button>
      {score !== null && <p className="mt-4 text-xl">Suspicion Score: {score}</p>}
    </div>
  );
}
