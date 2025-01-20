
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { OpenAI } from 'openai';  // Correct import for OpenAI API client

dotenv.config();

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Make sure to load your API key from .env
});

const app = express();
app.use(cors());
app.use(express.json());

// Basic route to test the server
app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!',
  });
});

// POST request to get AI response
app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    // Call the OpenAI API for completion using the new method
    const response = await openai.completions.create({
      model: 'gpt-3.5-turbo',
      prompt: prompt,
      max_tokens: 500,
      temperature: 0,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    // Send the response back to the client
    res.status(200).send({
      bot: response.choices[0].text.trim(),  // Ensure the response text is trimmed
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message || 'Something went wrong' });
  }
});

// Start the server
app.listen(5000, () => console.log('AI server started on http://localhost:5000'));
