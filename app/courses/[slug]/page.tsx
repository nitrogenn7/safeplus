import { supabase } from '@/lib/supabaseClient';


export default async function LessonPage({ params }: { params: { slug: string } }) {
    const slug = params.slug;
    const { data } = await supabase.from('lessons').select('*').eq('slug', slug).single();
    const lesson = data;


    return (
        <div>
            <h2 className="text-2xl font-semibold">{lesson.title}</h2>
            <div className="mt-4 prose max-w-none" dangerouslySetInnerHTML={{ __html: lesson.content_html || lesson.content }} />
            <form action="#" className="mt-6">
                <button className="px-4 py-2 bg-black text-white rounded">Mark Complete</button>
            </form>
        </div>
    );
}