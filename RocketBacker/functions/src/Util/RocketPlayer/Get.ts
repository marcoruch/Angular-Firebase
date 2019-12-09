import dateFormat = require('dateformat');
import { Request, Response } from 'firebase-functions';
import { QueryDocumentSnapshot, DocumentData } from '@google-cloud/firestore';

exports.GetAllRocketPlayers = async (firebase: any, firestore: FirebaseFirestore.Firestore, req: Request, res: Response) => {
    const fetchedPlayers: DocumentData[] = [];
    const querySnapshot = await firestore.collection('rocketPlayers').orderBy("lastLogin", "desc").get()
    querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
        const part: DocumentData = doc.data();
        part.lastSubscribeTimeAsStr = dateFormat(doc.data().lastSubscribeTime.toDate(), "dd.mm.yyyy");
        fetchedPlayers.push(part);
    });
    res.status(200).json(fetchedPlayers);
    return;
}


exports.GetRocketPlayersCount = async (firebase: any, firestore: FirebaseFirestore.Firestore, req: Request, res: Response) => {
    await firestore.collection('rocketPlayers').get().then(snap => {
        res.status(200).json(snap.size);
    });
    return;
}