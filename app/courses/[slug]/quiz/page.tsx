"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, useParams } from "next/navigation";

export default function QuizPage({ questions }: { questions: any[] }) {
    const { slug } = useParams();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [answers, setAnswers] = useState<number[]>([]);
    const [score, setScore] = useState<number | null>(null);

    useEffect(() => { supabase.auth.getUser().then(({ data }) => setUser(data.user)) }, []);

    const submitQuiz = async () => {
        if (!user) return;
        let correct = 0;
        questions.forEach((q, i) => { if (q.correct_index === answers[i]) correct++; });
        const result = (correct / questions.length) * 100;
        setScore(result);

        if (result >= 80) {
            await supabase.from("user_progress").upsert({
                user_id: user.id,
                course_slug: slug,
                quiz_passed: true
            });
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-12">
            <h1 className="text-2xl font-bold mb-4">Final Quiz</h1>
            {questions.map((q, i) => (
                <div key={q.id} className="mb-4">
                    <p className="font-semibold">{q.question}</p>
                    {q.options.map((opt: string, idx: number) => (
                        <label key={idx} className="block">
                            <input
                                type="radio"
                                name={`q${i}`}
                                onChange={() => setAnswers(prev => { const copy = [...prev]; copy[i] = idx; return copy; })}
                            />
                            {opt}
                        </label>
                    ))}
                </div>
            ))}
            <button onClick={submitQuiz} className="px-6 py-2 bg-blue-600 text-white rounded mt-4">Submit Quiz</button>
            {score !== null && <p className="mt-4">Score: {score}</p>}
        </div>
    );
}
