
// import express from 'express'
// import * as dotenv from 'dotenv'
// import cors from 'cors'
// import { OpenAI } from 'openai';  // Correct import
// // import { Configuration, OpenAIApi } from 'openai'
// // import { Configuration, OpenAIApi } from 'openai';
// import Configuration from 'openai'
// import OpenAIApi from 'openai'


// dotenv.config();
// // console.log(process.env.OPENAI_API_KEY);process.env.OPENAI_API_KEY

// const configuration = new Configuration({
//   apiKey:'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',
// });

// const openai = new OpenAIApi(configuration);

// const app = express()
// app.use(cors())
// app.use(express.json())

// app.get('/', async (req, res) => {
//   res.status(200).send({
//     message: 'Hello from CodeX!'
//   })
// })

// app.post('/', async (req, res) => {
//   try {
//     const prompt = req.body.prompt;

//     const response = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `${prompt}`,
//       temperature: 0, // Higher values means the model will take more risks.
//       max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
//       top_p: 1, // alternative to sampling with temperature, called nucleus sampling
//       frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
//       presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
//     });

//     res.status(200).send({
//       bot: response.data.choices[0].text
//     });

//   } catch (error) {
//     console.error(error)
//     res.status(500).send(error || 'Something went wrong');
//   }
// })

// app.listen(5000, () => console.log('AI server started on http://localhost:5000'));




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
