import * as functions from 'firebase-functions';
import { DocumentSnapshot, QuerySnapshot } from '@google-cloud/firestore';
const express = require("express");
const admin = require('firebase-admin');
const cors = require('cors');
const bodyParser = require('body-parser');

admin.initializeApp();

// init firestore
const firestore: FirebaseFirestore.Firestore = admin.firestore();

// init express
const app = express();

// use bodyparser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: true }));



exports.aggregatePositiveVotes = functions.firestore
  .document('rocketranking/{rocketRankingId}/upvotes/{upvoteId}')
  .onWrite((change: functions.Change<DocumentSnapshot>, context: functions.EventContext) => {


    // const upvoteId: string = context.params.upvoteId;
    const rocketRankingId: string = context.params.rocketRankingId;

    const docRef = firestore.collection('rocketRanking').doc(rocketRankingId);

    return docRef.collection('upvotes')
      .get()
      .then((querySnapshot: QuerySnapshot) => {
        let upvoteCount = querySnapshot.size;
        const data = { upvoteCount }
        return docRef.update(data);

      }).catch(err => console.log(err))
  })


  exports.aggregateNegativeVotes = functions.firestore
  .document('rocketranking/{rocketRankingId}/downvotes/{downvoteId}')
  .onWrite((change: functions.Change<DocumentSnapshot>, context: functions.EventContext) => {


    // const downvoteId: string = context.params.downvoteId;
    const rocketRankingId: string = context.params.rocketRankingId;

    const docRef = firestore.collection('rocketRanking').doc(rocketRankingId);

    return docRef.collection('downvotes')
      .get()
      .then((querySnapshot: QuerySnapshot) => {
        let downvoteCount = querySnapshot.size;
        const data = { downvoteCount }
        return docRef.update(data);

      }).catch(err => console.log(err))
  })


/* ==============/ Curriculum Vitae /=================== */
app.get('/rocketPlayers', (req: Request, res: Response) => {
  const { ValidateAndProcessFirebaseRequest } = require('./General/Util/Authorization')
  const { GetAllRocketPlayers } = require('./Util/RocketPlayer/Get')
  return ValidateAndProcessFirebaseRequest(GetAllRocketPlayers, admin, firestore, req, res)
});

app.get('/rocketPlayersCount', (req: Request, res: Response) => {
  const { ValidateAndProcessFirebaseRequest } = require('./General/Util/Authorization')
  const { GetRocketPlayersCount } = require('./Util/RocketPlayer/Get')
  return ValidateAndProcessFirebaseRequest(GetRocketPlayersCount, admin, firestore, req, res)
});
/* ============================================= */

const main = express();
main.use('/api', app);

// export main
exports.main = functions.https.onRequest(main);