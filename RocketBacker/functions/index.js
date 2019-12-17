const functions = require('firebase-functions');
const express = require("express");
const admin = require('firebase-admin');
const cors = require('cors');
const fetch = require("node-fetch");
const bodyParser = require('body-parser');
admin.initializeApp();

/* nexmo */
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
    apiKey: '68138ee5',
    apiSecret: `4JvfmyE8oCrq3RwI`,
});
/********/


// init firestore
const firestore = admin.firestore();

// init express
const app = express();

// use bodyparser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: true }));


function ToddMMyyyy(date) {
    let day = date.getDate();
    let month = date.getMonth();
    let strDay;
    let strMonth;
    month = month + 1;
    if ((String(day)).length === 1) {
        strDay = '0' + day;

    } else {

        strDay = day.toString();
    }
    if ((String(month)).length === 1) {
        strMonth = '0' + month;

    } else {
        strMonth = month.toString();
    }

    return strDay + '.' + strMonth + '.' + date.getFullYear();
}

exports.rocketTrackerRanking = functions.region('europe-west1').pubsub
    .schedule('01 00 * * *').onRun(async context => {
        await firestore.collection('rocketranking').add({
            rankingDate: admin.firestore.Timestamp.now().toDate(),
            rankingDateAsStr: ToddMMyyyy(admin.firestore.Timestamp.now().toDate()),
            players: [],
        }).then(async (x) => {
            await firestore.collection('rocketranking').doc(x.id).collection("upvotes").add();

            await firestore.collection('rocketranking').doc(x.id).collection("downvotes").add()
        })
    });


exports.greetOlivier = functions.pubsub.schedule('00 08 * * *').onRun(async (context) => {
    const from = '41766013420';
    const to = '41764666520';
    const opts = {
        "type": "unicode"
    }


    const response = await fetch("https://api.darksky.net/forecast/a0f71b044b84cc5f4c29b9f00c3fb334/46.4984,9.83909?units=si");
    const json = await response.json();
    const text = `Guten Morgen Olivier,

Dein persönlicher Assistent wünscht dir einen guten Start in den Tag. In St. Moritz sind es momentan ${json.currently.temperature} Grad kalt! Brr.. Brr..

Bis morgen!
`;

   await nexmo.message.sendSms(from, to, text, opts, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if (responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
});