require("dotenv").config();

const API_KEY = process.env.OPENAI_API_KEY;
const OpenAI = require('openai');
const fs = require('fs');

const openai = new OpenAI({
    apiKey: API_KEY,
    timeout: 20 * 1000, // 20 seconds
});

const ask = async doubt => {
    try {
        const prompt = await fs.promises.readFile('./prompt.txt', 'utf8');
        const completion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: prompt },
                { role: 'user', content: doubt },
            ],
            model: 'gpt-3.5-turbo',
        });
        
        if(completion && completion.choices && completion.choices.length > 0) return completion.choices[0].message.content;
        else return null;
    }
    catch (err) {
        return null;
    }
};

module.exports = { ask };