import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';


export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const { data: lessons } = await supabase
    .from("lessons")
    .select("*")
    .eq("slug", slug)
    .single();

    return (
        <div>
            <h2 className="text-2xl font-semibold">Courses</h2>
            <p className="mt-2">One main course: Social Engineering (Email / Text scams).</p>
            <div className="mt-4 grid gap-3">
                {lessons?.map((l: any) => (
                    <Link key={l.id} href={`/courses/${l.slug}`} className="p-4 border rounded hover:shadow">{l.title}</Link>
                ))}
            </div>
        </div>
    );
}