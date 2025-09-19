
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3002;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Placeholder for Gemini AI API Key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'your-gemini-api-key';

// Endpoint for course recommendations
app.post('/api/recommendations', (req, res) => {
  const { topics, skillLevel } = req.body;

  // ** Simulation of Gemini AI API Call **
  // In a real application, you would make a call to the Gemini AI API here.
  // For example:
  /*
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  async function run() {
    const prompt = `Recommend 5 courses for a user interested in ${topics.join(', ')} at a ${skillLevel} skill level.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const recommendations = JSON.parse(text); // Assuming the AI returns a JSON string
    res.json(recommendations);
  }

  run();
  */

  // Mock recommendations for the assessment
  const mockRecommendations = [
    {
      course_id: 'GEMINI001',
      title: 'Introduction to Generative AI',
      description: 'Learn the fundamentals of generative AI and large language models.',
      category: 'AI',
      instructor: 'Dr. AI',
      duration: '4 weeks',
    },
    {
      course_id: 'GEMINI002',
      title: 'Advanced JavaScript for AI Engineers',
      description: 'Deepen your JavaScript knowledge for building AI-powered applications.',
      category: 'Programming',
      instructor: 'Jane Doe',
      duration: '6 weeks',
    },
    {
      course_id: 'GEMINI003',
      title: 'Prompt Engineering for Beginners',
      description: 'Master the art of crafting effective prompts for large language models.',
      category: 'AI',
      instructor: 'John Smith',
      duration: '2 weeks',
    },
  ];

  res.json(mockRecommendations);
});

app.listen(port, () => {
  console.log(`Course Recommendation Microservice listening at http://localhost:${port}`);
});
