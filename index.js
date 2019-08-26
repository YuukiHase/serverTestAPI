const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors({ origin: true }));

app.post('/testAPI', (request, response) => {
    if (request.body) {
        let { method, url, body } = request.body;

        if (method === 'GET') {
            let startTime = new Date().getTime();

            axios({
                method: 'GET',
                url: `${url}`
            }).then(res => {
                let time = new Date().getTime() - startTime;
                let data = {
                    time,
                    data: res.data
                }
                response.send(JSON.stringify(data));
            }).catch(err => {
                console.log(err);
                response.send(err)
            });
        } else if (method === 'POST') {
            let startTime = new Date().getTime();

            axios({
                method: 'POST',
                url: `${url}`,
                data: body
            }).then(res => {
                let time = new Date().getTime() - startTime;
                let data = {
                    time,
                    data: res.data
                }
                response.send(JSON.stringify(data));
            }).catch(err => {
                response.send("Fail")
            });
        }
    } else {
        return response.send('Fail');
    }
});

exports.api = functions.https.onRequest(app);