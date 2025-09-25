"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Protected({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (!data.user) router.push("/login"); // redirect if not logged in
            else setUser(data.user);
            setLoading(false);
        });
    }, []);

    if (loading) return <p className="text-center py-20">Loading...</p>;

    return <>{children}</>;
}
