const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("Missing GEMINI_API_KEY in environment");
}

const genAI = new GoogleGenerativeAI(apiKey);

exports.generateCode = async (req, res) => {
  try {
    if (!apiKey) {
      return res.status(500).json({ message: "Missing GEMINI_API_KEY environment variable." });
    }

    const { mode = "generate", prompt = "", code = "", language = "javascript" } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    let instruction;
    if (mode === "explain") {
      if (!code) {
        return res.status(400).json({ message: "Code is required for explain mode." });
      }
      instruction = `Explain the following ${language} code in plain terms, without changing its behavior:\n\n${code}`;
    } else {
      if (!prompt.trim()) {
        return res.status(400).json({ message: "Prompt is required for generate mode." });
      }
      instruction = `Generate only code (no explanation) for the following request: ${prompt}`;
    }

    const result = await model.generateContent(instruction);

    const response = await result.response;
    const text = await response.text();

    res.json({ result: text });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};