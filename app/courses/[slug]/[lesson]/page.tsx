"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, useParams } from "next/navigation";

export default function LessonPage({ lesson }: { lesson: any }) {
    const { slug, lesson: lessonSlug } = useParams();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [completed, setCompleted] = useState(false);

    useEffect(() => { supabase.auth.getUser().then(({ data }) => setUser(data.user)) }, []);

    useEffect(() => {
        if (!user) return;
        supabase.from("user_progress").select("completed")
            .eq("user_id", user.id)
            .eq("course_slug", slug)
            .eq("lesson_slug", lessonSlug)
            .single()
            .then(({ data }) => setCompleted(!!data?.completed));
    }, [user]);


    const markComplete = async () => {
        if (!user) return;

        // Upsert progress
        await supabase.from("user_progress").upsert({
            user_id: user.id,
            course_slug: slug,
            lesson_slug: lessonSlug,
            completed: true,
            completed_at: new Date()
        });

        setCompleted(true);

        // Fetch lessons safely
        const { data: lessonsData } = await supabase
            .from("lessons")
            .select("*")
            .eq("course_slug", slug)
            .order("position", { ascending: true });

        const lessons = lessonsData ?? []; // <-- null fallback

        const index = lessons.findIndex(l => l.lesson_slug === lessonSlug);

        if (index === -1) return; // safety check

        if (index + 1 < lessons.length) {
            router.push(`/course/${slug}/${lessons[index + 1].lesson_slug}`);
        } else {
            router.push(`/course/${slug}/quiz`);
        }
    };


    return (
        <div className="max-w-3xl mx-auto py-12">
            <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
            <div className="mb-4">{lesson.content}</div>
            <button onClick={markComplete} disabled={completed} className="px-6 py-2 bg-green-600 text-white rounded">
                {completed ? "✅ Completed" : "Mark as Completed"}
            </button>
        </div>
    );
}
