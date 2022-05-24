const express = require('express');
const app = express();
const port = 3000;

require('dotenv').config()
const axios = require('axios');

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.get('/test', function (req, res) {
    const body = {
        "messaging_product": "whatsapp",
        "preview_url": false,
        "recipient_type": "individual",
        "to": process.env.TARGET_PHONE_NUMBER,
        "type": "text",
        "text": {
            "body": "Hello dear user! You have entered a magical world of wonder! 🎉",
        }
    };

    console.log('phone number', process.env.TARGET_PHONE_NUMBER)

    const config = {
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN}`
        }
    };

    // create an axios post request with bearer token and content type json 
    axios.post(`https://graph.facebook.com/v13.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
        body,
        config
    ).then(response => {
        console.log('Text sent.');
        console.log(response.data);
        res.send('Text sent to number.')
    }).catch(error => {
        console.log('Error sending text.');
        console.log(error);
        res.send('Error sending text.')
    });
});

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
});