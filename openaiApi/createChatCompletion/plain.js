const { config } = require('dotenv');

const envConfigs = config().parsed || {};

async function callGPT4API(prompt) {
  const apiKey = envConfigs['API_KEY'];
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  const requestBody = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  const responseData = await response.json();

  const util = require('util');
  console.log('\n');
  console.log('------------->');
  console.log('responseData =>');
  console.log(util.inspect(response.status, { depth: null }));
  console.log(util.inspect(responseData, { depth: null }));
  console.log('<-------------');
  console.log('\n');

  /*
  {
    error: {
      message: 'The model `davinci-codex` has been deprecated, learn more here: https://platform.openai.com/docs/deprecations',
      type: 'invalid_request_error',
      param: null,
      code: 'model_not_found'
    }
  }
  -----------------------------
  {
    id: 'chatcmpl-8ey0bZ9qkRLHzyvvfitUJDWcvzRO2',
    object: 'chat.completion',
    created: 1704774485,
    model: 'gpt-3.5-turbo-0613',
    choices: [
      {
        index: 0,
        message: {
          role: 'assistant',
          content: "Here's a simple example of a JavaScript function that calls the OpenAI GPT-3 API:\n" +
            '\n' +
            '```javascript\n' +
            'async function callGPT3(prompt) {\n' +
            '  // Assuming you have an API key stored in a variable called `apiKey`\n' +
            "  const apiKey = 'YOUR_API_KEY';\n" +
            '\n' +
            '  // Generating the payload for the API call\n' +
            '  const payload = {\n' +
            '    prompt,\n' +
            '    max_tokens: 100,\n' +
            '    temperature: 0.7\n' +
            '  };\n' +
            '\n' +
            '  try {\n' +
            '    // Making a POST request to the GPT-3 API\n' +
            "    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {\n" +
            "      method: 'POST',\n" +
            '      headers: {\n' +
            "        'Content-Type': 'application/json',\n" +
            "        'Authorization': `Bearer ${apiKey}`\n" +
            '      },\n' +
            '      body: JSON.stringify(payload)\n' +
            '    });\n' +
            '\n' +
            '    // Parsing the response JSON\n' +
            '    const data = await response.json();\n' +
            '\n' +
            '    // Returning the generated text from the API call\n' +
            '    return data.choices[0].text;\n' +
            '  } catch (error) {\n' +
            '    // Handling any errors that occur during the API call\n' +
            "    console.error('Error calling GPT-3 API:', error);\n" +
            '    return null;\n' +
            '  }\n' +
            '}\n' +
            '```\n' +
            '\n' +
            "To use this function, you can pass in a prompt as an argument and it will return the generated text from the GPT-3 API. Make sure to replace `'YOUR_API_KEY'` with your actual API key.\n" +
            '\n' +
            'Example usage:\n' +
            '\n' +
            '```javascript\n' +
            "const prompt = 'Once upon a time';\n" +
            'callGPT3(prompt)\n' +
            '  .then(generatedText => {\n' +
            "    console.log('Generated Text:', generatedText);\n" +
            '  })\n' +
            '  .catch(error => {\n' +
            "    console.error('Error calling GPT-3:', error);\n" +
            '  });\n' +
            '```\n' +
            '\n' +
            'This will call the GPT-3 API with the specified prompt and log the generated text to the console.'
        },
        logprobs: null,
        finish_reason: 'stop'
      }
    ],
    usage: { prompt_tokens: 25, completion_tokens: 385, total_tokens: 410 },
    system_fingerprint: null
  }
  -----------------------------
  {
    id: 'chatcmpl-8hp89qr4WhWHAh8pJy7Y1q2jEeZBf',
    object: 'chat.completion',
    created: 1705455341,
    model: 'gpt-3.5-turbo-0613',
    choices: [
      {
        index: 0,
        message: {
          role: 'assistant',
          content: "Here's an example of a JavaScript function that you can use to make a call to GPT (OpenAI's language model):\n" +
            '\n' +
            '```javascript\n' +
            'async function callGPT(prompt) {\n' +
            "  // Replace 'YOUR_API_KEY' with your actual OpenAI API key\n" +
            "  const apiKey = 'YOUR_API_KEY';\n" +
            "  const endpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';\n" +
            '\n' +
            '  const headers = {\n' +
            "    'Content-Type': 'application/json',\n" +
            "    'Authorization': `Bearer ${apiKey}`\n" +
            '  };\n' +
            '\n' +
            '  const data = {\n' +
            "    'prompt': prompt,\n" +
            "    'max_tokens': 100\n" +
            '  };\n' +
            '\n' +
            '  const response = await fetch(endpoint, {\n' +
            "    method: 'POST',\n" +
            '    headers: headers,\n' +
            '    body: JSON.stringify(data)\n' +
            '  });\n' +
            '\n' +
            '  const result = await response.json();\n' +
            '  const completion = result.choices[0].text.trim();\n' +
            '\n' +
            '  return completion;\n' +
            '}\n' +
            '\n' +
            '// Example usage:\n' +
            'const prompt = "Once upon a time";\n' +
            'callGPT(prompt)\n' +
            '  .then(completion => {\n' +
            '    console.log(completion);\n' +
            '  })\n' +
            '  .catch(error => {\n' +
            '    console.error(error);\n' +
            '  });\n' +
            '```\n' +
            '\n' +
            "In this code, we define the `callGPT` function that takes a `prompt` as input and returns the response from GPT. You will need to replace `'YOUR_API_KEY'` with your actual OpenAI API key.\n" +
            '\n' +
            'The function makes an asynchronous POST request to the GPT API endpoint with the prompt and other required parameters. It then extracts the completion from the response and returns it.\n' +
            '\n' +
            'To use the function, simply call it with a `prompt`. The example usage shows how to log the completion to the console. Please note that GPT has certain usage limits, so make sure you are aware of and adhere to them.\n' +
            '\n' +
            "Also, keep in mind that using GPT or any language model can come with ethical considerations. It's important to use AI responsibly and be aware of potential biases or misuse."
        },
        logprobs: null,
        finish_reason: 'stop'
      }
    ],
    usage: { prompt_tokens: 25, completion_tokens: 398, total_tokens: 423 },
    system_fingerprint: null
  }
  ----------------------
  {
    id: 'chatcmpl-8hpCKFlq4xKmjW6JXjGFNWJ8boAsB',
    object: 'chat.completion',
    created: 1705455600,
    model: 'gpt-3.5-turbo-0613',
    choices: [
      {
        index: 0,
        message: {
          role: 'assistant',
          content: 'To call the GPT (Generative Pre-trained Transformer) API using JavaScript, you can use the `fetch()` function to make an HTTP POST request to the API endpoint with your data.\n' +
            '\n' +
            "Here's an example of a JavaScript function that calls the GPT API:\n" +
            '\n' +
            '```javascript\n' +
            'async function callGPT(prompt) {\n' +
            "  const apiUrl = 'https://gpt-api-endpoint.com/generate'; // Replace with the actual API endpoint\n" +
            '  \n' +
            '  const requestData = {\n' +
            '    prompt: prompt,\n' +
            '    // Add any additional data you need to send to the API. For example:\n' +
            "    // apiKey: 'your-api-key',\n" +
            "    // model: 'gpt2',\n" +
            '    // maxTokens: 100,\n' +
            '  };\n' +
            '  \n' +
            '  const requestOptions = {\n' +
            "    method: 'POST',\n" +
            "    headers: { 'Content-Type': 'application/json' },\n" +
            '    body: JSON.stringify(requestData),\n' +
            '  };\n' +
            '  \n' +
            '  try {\n' +
            '    // Make the API call\n' +
            '    const response = await fetch(apiUrl, requestOptions);\n' +
            '    const data = await response.json();\n' +
            '    \n' +
            '    // Handle the response data\n' +
            '    console.log(data); // Do something with the generated output\n' +
            '  } catch (error) {\n' +
            "    console.error('Error:', error);\n" +
            '  }\n' +
            '}\n' +
            '```\n' +
            '\n' +
            'To use this function, simply call it with your desired prompt as the argument. For example:\n' +
            '\n' +
            '```javascript\n' +
            "callGPT('Once upon a time');\n" +
            '\n' +
            '// Output:\n' +
            '// { "output": "Generated text from GPT API" }\n' +
            '```\n' +
            '\n' +
            "Note: Replace `'https://gpt-api-endpoint.com/generate'` with the actual API endpoint provided by the GPT service you are using. Also, don't forget to provide any necessary authentication, configuration, or options in the `requestData` object before making the API call."
        },
        logprobs: null,
        finish_reason: 'stop'
      }
    ],
    usage: { prompt_tokens: 25, completion_tokens: 357, total_tokens: 382 },
    system_fingerprint: null
  }
  */

  const generatedText = responseData.choices[0].text;

  return generatedText;
}

// Example usage
const prompt = 'Write a JavaScript function to call gpt';

callGPT4API(prompt).then((response) => {
  console.log(response);
});

/*
ok what about conversation context?



https://huggingface.co/spaces/coqui/xtts
*/
