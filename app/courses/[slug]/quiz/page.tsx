"use client";
import { useState } from "react";

export default function FinalQuiz({ onPass }: { onPass: () => void }) {
    const [score, setScore] = useState<number | null>(null);

    const questions = [
        {
            q: "What is a common phishing email red flag?",
            options: ["Urgent tone", "Professional logo", "Correct spelling"],
            correct: 0,
        },
        {
            q: "Why should you hover over links?",
            options: ["Check destination", "Make them open faster", "Translate"],
            correct: 0,
        },
    ];

    const handleSubmit = (answers: number[]) => {
        const correct = questions.filter((q, i) => q.correct === answers[i]).length;
        const result = (correct / questions.length) * 100;
        setScore(result);
        if (result >= 70) onPass();
    };

    // TODO: quiz form UI with radios and submit → call handleSubmit
}
