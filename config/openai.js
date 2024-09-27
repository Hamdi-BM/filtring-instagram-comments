const OpenAI = require('openai');
const dotenv = require('dotenv');
dotenv.config();
// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

module.exports = openai;

