import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function analyzeMessage(text: string) {
  const prompt = `
You are a social engineering risk detector.
Analyze the following message and return a single JSON number between 0 and 100 called "score", 
where 0 = completely safe and 100 = highly suspicious. DO NOT explain.

Message:
${text}
`;

  const res = await client.chat.completions.create({
    model: "gpt-nano",
    messages: [{ role: "user", content: prompt }],
    max_completion_tokens: 700, // correct param for nano models
    temperature: 0,
  });

  try {
    const content = res.choices[0].message?.content?.trim() ?? "0";
    const parsed = JSON.parse(content);
    return parsed.score;
  } catch {
    // fallback if model doesn't respond with JSON
    return parseInt(res.choices[0].message?.content || "0", 10);
  }
}
