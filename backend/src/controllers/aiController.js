const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

exports.generateCode = async (req, res) => {
  try {
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ message: "Missing GROQ_API_KEY environment variable." });
    }

    const { mode = "generate", prompt = "", code = "", language = "javascript" } = req.body;

    let userMessage;
    if (mode === "explain") {
      if (!code) return res.status(400).json({ message: "Code is required for explain mode." });
      userMessage = `Explain the following ${language} code in plain terms. Do not change it, just explain what it does:\n\n${code}`;
    } else {
      if (!prompt.trim()) return res.status(400).json({ message: "Prompt is required for generate mode." });
userMessage = `You are a code-only assistant. Output ONLY raw ${language} code. No explanations, no comments, no markdown, no backticks, no fences, no introductions. Just the working code. Task: ${prompt}`;
    }

    let result = "";

    const stream = await groq.chat.completions.create({
      messages: [{ role: "user", content: userMessage }],
      model: "qwen/qwen3-32b",
      temperature: 0.6,
      max_completion_tokens: 4096,
      top_p: 0.95,
      stream: true,
      reasoning_effort: "default",
      stop: null,
    });

    for await (const chunk of stream) {
      result += chunk.choices[0]?.delta?.content || "";
    }

    // Strip markdown fences if model still adds them
    // Strip <think>...</think> block and markdown fences
result = result.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
result = result.replace(/^```[\w]*\s*\n?/m, "").replace(/\n?```\s*$/m, "").trim();

res.json({ result });

  } catch (error) {
    console.error("Groq error:", error.message);
    res.status(500).json({ message: error.message });
  }
};