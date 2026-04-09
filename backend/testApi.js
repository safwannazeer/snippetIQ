fetch("http://127.0.0.1:5000/api/ai/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ mode: "generate", prompt: "sum of two numbers in JS" })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
