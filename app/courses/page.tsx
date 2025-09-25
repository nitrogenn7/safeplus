'use client'

import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CourseContent({ slug }: { slug: string }) {
    const [lessons, setLessons] = useState<any[]>([]);
    const [progress, setProgress] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (data.user) setUser(data.user);
        });
    }, []);

    useEffect(() => {
        if (!user) return;

        // Fetch lessons
        supabase.from("lessons").select("*").eq("course_slug", slug).order("position", { ascending: true })
            .then(({ data }) => setLessons(data || []));

        // Fetch user progress
        supabase.from("user_progress").select("*").eq("user_id", user.id).eq("course_slug", slug)
            .then(({ data }) => setProgress(data || []));
    }, [user]);

    const getStatus = (lessonSlug: string) => progress.find(p => p.lesson_slug === lessonSlug)?.completed ? "✅" : "⬜";

    if (!slug) return <p className="text-center py-20">Loading course...</p>;

    return (
        <div className="max-w-3xl mx-auto py-12">
            <h1 className="text-3xl font-bold mb-6">{slug.replace("-", " ")}</h1>
            <ul className="space-y-4">
                {lessons.map(lesson => {
                    const unlocked = lessons.findIndex(l => l.lesson_slug === lesson.lesson_slug) === 0 ||
                        progress.find(p => p.lesson_slug === lessons[lessons.findIndex(l => l.lesson_slug === lesson.lesson_slug) - 1].lesson_slug)?.completed;
                    return (
                        <li key={lesson.lesson_slug}>
                            {unlocked ? (
                                <Link href={`/course/${slug}/${lesson.lesson_slug}`} className="text-blue-600 underline">
                                    {getStatus(lesson.lesson_slug)} {lesson.title}
                                </Link>
                            ) : (
                                <span className="opacity-50">{getStatus(lesson.lesson_slug)} {lesson.title}</span>
                            )}
                        </li>
                    )
                })}
            </ul>

            {/* Show link to quiz if all lessons completed */}
            {lessons.length > 0 && lessons.every(l => progress.find(p => p.lesson_slug === l.lesson_slug)?.completed) && (
                <div className="mt-6">
                    <Link href={`/course/${slug}/quiz`} className="bg-green-600 text-white px-6 py-2 rounded">
                        🎓 Take Final Quiz
                    </Link>
                </div>
            )}
        </div>
    );
}
