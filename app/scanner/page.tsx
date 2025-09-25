'use client';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';


export default function ScannerPage() {
    const [text, setText] = useState('');
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();


    const handleScan = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            });
            const json = await res.json();
            setResult(json.analysis);
        } catch (e) {
            setResult([{ label: 'error', explanation: 'Analysis failed' }]);
        }
        setLoading(false);
    };

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => setIsLoggedIn(!!data.user));
    }, []);

    if (!isLoggedIn) {
        return (
            <div className="text-center py-12">
                <h2 className="text-xl font-semibold">🔐 Please log in to use the scanner</h2>
                <button
                    onClick={() => router.push("/login")}
                    className="mt-4 px-4 py-2 bg-black text-white rounded-lg"
                >
                    Go to Login
                </button>
            </div>
        );
    }


    return (
        <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl font-semibold">Scanner</h2>
            <textarea value={text} onChange={(e) => setText(e.target.value)} rows={8} className="w-full p-3 border rounded" placeholder="Paste suspicious message here..." />
            <div className="flex gap-3">
                <button onClick={handleScan} className="px-4 py-2 bg-black text-white rounded" disabled={!text || loading}>{loading ? 'Analyzing...' : 'Scan'}</button>
                <button onClick={() => { setText(''); setResult(null); }} className="px-4 py-2 border rounded">Clear</button>
            </div>


            {result && (
                <div className="mt-4 border rounded p-4 bg-gray-50">
                    <h3 className="font-semibold">Analysis</h3>
                    <div className="mt-2 space-y-2">
                        {Array.isArray(result) ? (
                            result.map((r: any, i: number) => (
                                <div key={i} className="p-2 border rounded">
                                    <div className="font-medium">{r.label}</div>
                                    {r.score && <div className="text-sm">Score: {r.score}</div>}
                                    <div className="text-sm mt-1 whitespace-pre-wrap">{r.explanation}</div>
                                </div>
                            ))
                        ) : (
                            <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}