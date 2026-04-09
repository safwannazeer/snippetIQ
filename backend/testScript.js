const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" }); 

async function test() {
  try {
    const result = await model.generateContent("hello");
    console.log("SUCCESS:", await result.response.text());
  } catch (e) {
    console.log("ERROR:", e.message);
  }
}
test();
