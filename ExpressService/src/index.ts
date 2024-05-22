import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req: Request, res: Response) => {
  const { messages } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    });

    const botMessage = response.choices[0].message.content;

    res.json(botMessage);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error communicating with ChatGPT");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
