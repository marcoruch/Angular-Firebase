import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Upvotes } from '../models/votes';
import { take } from 'rxjs/operators';
import { RocketRankingService } from './rocket-ranking-service.service';
import { RocketRanking } from '../models/rocket-ranking';

@Injectable({
  providedIn: 'root'
})
export class UpvoteService {

  constructor(private db: AngularFirestore, private rocketRankingService: RocketRankingService) { }



  GetByRankingId(id: string) {
    return this.db.collection('rocketranking').doc(id).collection<Upvotes>('upvotes').valueChanges().pipe(take(1));
  }

  async AddUpvote(uid: string, currentUserUid: string, docId: string) {
    await this.db.collection(`rocketranking`).doc(docId).collection<Upvotes>('upvotes').get().toPromise().then(async (x: firebase.firestore.QuerySnapshot) => {

      let existingDoc: firebase.firestore.QueryDocumentSnapshot = null;

      x.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
        if (doc.id === uid) {
          existingDoc = doc;
        }
      })

      this.db.collection(`rocketranking`).doc(docId).get

      let rankingDoc: firebase.firestore.DocumentSnapshot = await this.rocketRankingService.GetByRankingId(docId).get().toPromise().then(x => x);

      if (existingDoc !== null) {
        let data = existingDoc.data() as Upvotes;
        if (data.uids.filter(x => x === currentUserUid).length === 0) {
          let newData = [...data.uids, currentUserUid];
          await existingDoc.ref.update({ uids: newData });
          this.UpdateRocketRanking(uid, rankingDoc);
        } else {
          console.log("This Upvote was already noted...");
        }
      } else {
        let newData = [currentUserUid];
        await this.db.collection(`rocketranking`).doc(docId).collection<Upvotes>('upvotes').doc(uid).set({ uids: newData })
        this.UpdateRocketRanking(uid, rankingDoc)
      }
    })
  }

  private UpdateRocketRanking(uid: string, rankingDoc: firebase.firestore.DocumentSnapshot) {
    let rocketRankingData = rankingDoc.data() as RocketRanking;
          let newPlayers = rocketRankingData.players.reduce(function(pV, cV, cI){
            if (cV.uid === uid) {
              cV.points ++;
            }
            pV.push(cV);
            return pV; // *********  Important ******
          }, []);
          rocketRankingData.players = [...newPlayers];
          rankingDoc.ref.update(rocketRankingData);
  }

}
