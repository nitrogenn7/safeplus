"use client";

import Protected from "@/app/components/Protected";
import CourseContentInner from "../page";



// now points to the client component

export default function CoursePage({ params }: { params: { slug: string } }) {
    const { slug } = params;

    if (!slug) return <p className="text-center py-20">Loading course...</p>;

    return (
        <Protected>
            <CourseContentInner slug={slug} />
        </Protected>
    );
}
