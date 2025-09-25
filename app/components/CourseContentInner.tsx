"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function CourseContentInner({ slug }: { slug: string }) {
    const [lessons, setLessons] = useState<any[]>([]);

    useEffect(() => {
        if (!slug) return;

        const fetchLessons = async () => {
            const { data, error } = await supabase
                .from("lessons")
                .select("*")
                .eq("course_slug", slug.toLowerCase())
                .order("position", { ascending: true });

            console.log("Slug:", slug);
            console.log("Fetched lessons:", data, "Error:", error);

            setLessons(data ?? []);
        };

        fetchLessons();
    }, [slug]);

    if (lessons.length === 0) return <p className="text-center py-20">No lessons available.</p>;

    return (
        <div className="max-w-3xl mx-auto py-12">
            <h1 className="text-3xl font-bold mb-6">{slug.replace("-", " ")}</h1>
            <ul>
                {lessons.map((lesson) => (
                    <li key={lesson.lesson_slug}>{lesson.title}</li>
                ))}
            </ul>
        </div>
    );
}
