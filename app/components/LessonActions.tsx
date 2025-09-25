"use client";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LessonActions({ lessonId }: { lessonId: string }) {
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        const checkProgress = async () => {
            const { data } = await supabase
                .from("progress")
                .select("*")
                .eq("lesson_id", lessonId)
                .single();
            setCompleted(!!data?.completed);
        };
        checkProgress();
    }, [lessonId]);

    const markComplete = async () => {
        await supabase.from("progress").upsert({
            lesson_id: lessonId,
            completed: true,
            completed_at: new Date(),
        });
        setCompleted(true);
    };

    return (
        <button
            disabled={completed}
            onClick={markComplete}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
        >
            {completed ? "✅ Completed" : "Mark as Completed"}
        </button>
    );
}
