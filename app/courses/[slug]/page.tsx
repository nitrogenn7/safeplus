
import Protected from "@/app/components/Protected";
import CourseContent from "../page";
 // actual content component

export default function CoursePage({ params }: { params: { slug: string } }) {
    const { slug } = params;

    return (
        <Protected>
            {slug ? <CourseContent slug={slug} /> : <p className="text-center py-20">Loading course...</p>}
        </Protected>
    );
}
