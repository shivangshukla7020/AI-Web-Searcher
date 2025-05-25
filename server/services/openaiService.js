const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function summarizeContent(text) {
  try {
    const chat = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an assistant that summarizes text concisely.",
        },
        {
          role: "user",
          content: `Summarize the following:\n\n${text}`,
        },
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 100,
    });

    return chat.choices[0].message.content.trim();
  } catch (err) {
    console.error("Summarization failed:", err.message);
    return text; // fallback
  }
}

module.exports = { summarizeContent };
