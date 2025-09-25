import { NextResponse } from 'next/server';
import { analyzeText } from '@/lib/aiAnalysis';
import { supabase } from '@/lib/supabaseClient';


export async function POST(req: Request) {
const body = await req.json();
const { text } = body;
if (!text) return NextResponse.json({ error: 'text required' }, { status: 400 });


const analysis = await analyzeText(text);


// If user logged in, store the scan (optional)
try {
const token = req.headers.get('supabase-auth');
if (token) {
const { data: user } = await supabase.auth.getUser(token as string);
if (user?.user?.id) {
await supabase.from('scans').insert([
{ user_id: user.user.id, text, result: JSON.stringify(analysis) }
]);
}
}
} catch (e) {
// ignore storage errors in MVP
}


return NextResponse.json({ analysis });
}