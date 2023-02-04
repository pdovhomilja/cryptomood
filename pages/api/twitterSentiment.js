const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt:
    'Classify the sentiment in these tweets:\n\n1. "I can\'t stand homework"\n2. "This sucks. I\'m bored 😠"\n3. "I can\'t wait for Halloween!!!"\n4. "My cat is adorable ❤️❤️"\n5. "I hate chocolate"\n\nTweet sentiment ratings:\n1. Negative\n2. Negative\n3. Positive\n4. Positive\n5. Negative',
  temperature: 0,
  max_tokens: 60,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});
