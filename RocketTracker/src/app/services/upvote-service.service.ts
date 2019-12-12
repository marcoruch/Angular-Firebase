import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Upvotes } from '../models/votes';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UpvoteService {

  constructor(private db: AngularFirestore) { }



  GetByRankingId(id: string) {
    return this.db.collection('rocketranking').doc(id).collection<Upvotes>('upvotes').valueChanges().pipe(take(1));
  }

  AddUpvote(uid: string, currentUserUid: string, docId: string) {
    let docRef: AngularFirestoreCollection<Upvotes> = this.db.collection(`rocketRanking`).doc(docId).collection('downvotes');

    docRef.get().toPromise().then(x => { console.log(x.docs.length); x.docs.forEach((x) => console.log(x.data()))})
/*
    docRef.get().toPromise().then(x => {

      if (x.exists) {
        let newUids: string[];
        Object.assign(newUids, x.data().uids);
        console.log(newUids);
        if (x.data().uids.filter(x => x === currentUserUid).length == 0) {
          newUids.push(currentUserUid);
          docRef.update({ uids: newUids });
        } else {
          console.log("This Upvote was already noted...");
        }
      } else {
        docRef.update({ uids: [currentUserUid] })
      }

    });
*/
  }

}
