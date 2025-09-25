'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AuthPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [msg, setMsg] = useState('');
    const handle = async (e: any) => {
        e.preventDefault();
        if (mode === 'login') {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            if (error) setMsg(error.message);
            else setMsg('Logged in');
        } else {
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) setMsg(error.message);
            else setMsg('Confirmation email sent (if enabled)');
        }
    };
    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-semibold">{mode === 'login' ? 'Login' :
                'Sign up'}</h2>
            <form onSubmit={handle} className="mt-4 space-y-3">
                <input value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email" className="w-full p-2 border rounded" />
                <input value={password} onChange={(e) =>
                    setPassword(e.target.value)} placeholder="Password" type="password"
                    className="w-full p-2 border rounded" />
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-black text-white rounded"
                        type="submit">{mode === 'login' ? 'Login' : 'Create account'}</button>
                    <button type="button" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="px-4 py-2 border rounded">{mode ===
                        'login' ? 'Switch to Sign up' : 'Switch to Login'}</button>
                </div>
                {msg && <div className="text-sm mt-2">{msg}</div>}
            </form>
        </div>
    );
}
