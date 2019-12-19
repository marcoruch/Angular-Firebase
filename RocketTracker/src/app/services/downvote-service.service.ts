import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Downvotes } from '../models/votes';
import { take } from 'rxjs/operators';
import { RocketRanking } from '../models/rocket-ranking';
import { RocketRankingService } from './rocket-ranking-service.service';

@Injectable({
  providedIn: 'root'
})
export class DownvoteService {

  constructor(private db: AngularFirestore,  private rocketRankingService: RocketRankingService) { }



  GetByRankingId(id: string){
    return this.db.collection('rocketranking').doc(id).collection<Downvotes>('downvotes').valueChanges().pipe(take(1));
  }

  async AddDownvote(uid: string, currentUserUid: string, docId: string) {
    await this.db.collection(`rocketranking`).doc(docId).collection<Downvotes>('downvotes').get().toPromise().then(async (x: firebase.firestore.QuerySnapshot) => {

      let existingDoc: firebase.firestore.QueryDocumentSnapshot = null;

      x.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
        if (doc.id === uid) {
          existingDoc = doc;
        }
      })

      this.db.collection(`rocketranking`).doc(docId).get

      let rankingDoc: firebase.firestore.DocumentSnapshot = await this.rocketRankingService.GetByRankingId(docId).get().toPromise().then(x => x);

      if (existingDoc !== null) {
        let data = existingDoc.data() as Downvotes;
        if (data.uids.filter(x => x === currentUserUid).length === 0) {
          let newData = [...data.uids, currentUserUid];
          await existingDoc.ref.update({ uids: newData })
          this.UpdateRocketRanking(uid, rankingDoc);
        } else {
          console.log("This Downvote was already noted...");
        }
      } else {
        let newData =  [currentUserUid]
        await this.db.collection(`rocketranking`).doc(docId).collection<Downvotes>('downvotes').doc(uid).set({ uids: newData })
        this.UpdateRocketRanking(uid, rankingDoc)
      }
    })
  }

  private UpdateRocketRanking(uid: string, rankingDoc: firebase.firestore.DocumentSnapshot) {
    let rocketRankingData = rankingDoc.data() as RocketRanking;
          let newPlayers = rocketRankingData.players.reduce(function(pV, cV, cI){
            if (cV.uid === uid) {
              cV.badPoints ++;
            }
            pV.push(cV);
            return pV; // *********  Important ******
          }, []);
          rocketRankingData.players = [...newPlayers];
          rankingDoc.ref.update(rocketRankingData);
  }
}
