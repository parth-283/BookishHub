import { Handler } from '@netlify/functions';

const handler: Handler = async (event, context) => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Welcome to bookishHub world's of books.`,
      }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

export { handler };
