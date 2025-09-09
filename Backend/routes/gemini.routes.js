const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv").config();

const geminiRouter = express.Router();

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

geminiRouter.post("/", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Get Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Start chat with instructions
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: `You are a Todo App assistant.
Reply in JSON for actions:
- Add -> {"action":"add","task":"..."}
- Update -> {"action":"update","id":"...","task":"..."}
- Delete -> {"action":"delete","id":"..."}
- Show tasks -> {"action":"list"}
If unsure, reply as plain text.`
            }
          ]
        }
      ]
    });

    // Send user message
    const result = await chat.sendMessage(userMessage);
    let aiReply = result.response.text();

    // Remove Markdown wrappers
    aiReply = aiReply.replace(/```json|```/g, "").trim();

    let actionObj = null;
    try {
      const parsed = JSON.parse(aiReply);
      if (parsed && parsed.action) {
        actionObj = parsed;
      }
    } catch (err) {
      // not JSON, keep as text
    }

    res.status(200).json({
      reply: actionObj ? null : aiReply,
      action: actionObj || null,
    });
  } catch (err) {
    console.error("Chatbot Error:", err);
    res.status(500).json({
      reply: "⚠️ Something went wrong.",
      action: null,
    });
  }
});

module.exports = geminiRouter;

console.log("Gemini chatbot is working 🚀");

