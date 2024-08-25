// netlify-functions/bfhl.js
const USER_ID = "john_doe_17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
        try {
            const data = JSON.parse(event.body);
            if (!Array.isArray(data.data)) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ is_success: false, message: 'Invalid input' }),
                };
            }

            const numbers = data.data.filter(item => !isNaN(item));
            const alphabets = data.data.filter(item => isNaN(item));
            const lowercaseAlphabets = alphabets.filter(char => char === char.toLowerCase());
            const highestLowercaseAlphabet = lowercaseAlphabets.length > 0
                ? [lowercaseAlphabets.sort().pop()]
                : [];

            return {
                statusCode: 200,
                body: JSON.stringify({
                    is_success: true,
                    user_id: USER_ID,
                    email: EMAIL,
                    roll_number: ROLL_NUMBER,
                    numbers,
                    alphabets,
                    highest_lowercase_alphabet: highestLowercaseAlphabet,
                }),
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ is_success: false, message: 'Internal server error' }),
            };
        }
    } else if (event.httpMethod === 'GET') {
        return {
            statusCode: 200,
            body: JSON.stringify({ operation_code: 1 }),
        };
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ is_success: false, message: 'Method not allowed' }),
        };
    }
};
