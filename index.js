const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const USER_ID = 'john_doe_17091999';
const EMAIL = 'john@xyz.com';
const ROLL_NUMBER = 'ABCD123';

app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data || [];
        const numbers = data.filter(item => /^\d+$/.test(item));
        const alphabets = data.filter(item => /^[a-zA-Z]+$/.test(item));
        const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
        const highestLowercaseAlphabet = lowercaseAlphabets.length > 0
            ? [lowercaseAlphabets.reduce((a, b) => (a > b ? a : b))]
            : [];

        res.json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet
        });
    } catch (error) {
        res.json({
            is_success: false,
            error: error.message
        });
    }
});

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
