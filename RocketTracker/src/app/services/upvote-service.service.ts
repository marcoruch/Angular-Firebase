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
    this.db.collection(`rocketranking`).doc(docId).collection<Upvotes>('upvotes').get().toPromise().then((x: firebase.firestore.QuerySnapshot) => {

      let existingDoc: firebase.firestore.QueryDocumentSnapshot = null;

      x.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
        if (doc.id === uid) {
          existingDoc = doc;
        }
      })
      if (existingDoc !== null) {
        let data = existingDoc.data() as Upvotes;
        if (data.uids.filter(x => x === currentUserUid).length === 0) {
          let newData = [...data.uids, currentUserUid];
          existingDoc.ref.update({ uids: newData });
        } else {
          console.log("This Upvote was already noted...");
        }
      }

    })
  }

}
