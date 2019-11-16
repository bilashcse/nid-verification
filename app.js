const express = require('express');

const {verify} = require('./src/nid');

const app = express();
const port = process.env.PORT || 3004;
app.listen(port);

app.get('/validate', async (req, res) => {
    const { nidNumber, fullName, dob } = req.query;
    try {
        const result = await verify({ nidNumber, fullName, dob });
        res.json({
            isError: false,
            result
        });

    } catch (err) {
        console.error(err.message);
        res.send(`Error: `, err.message);
    }
});

app.get('/', async (req, res) => {
    res.send(`Server Up & Running`);
});



