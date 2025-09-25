import Protected from "@/app/components/Protected";
import CourseContent from "../page";

export default async function CoursePage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return (
    <Protected>
      <CourseContent slug={slug} />
    </Protected>
  );
}
