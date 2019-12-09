import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Upvote } from '../models/votes';

@Injectable({
  providedIn: 'root'
})
export class UpvoteService {

  constructor(private db: AngularFirestore) { }



  GetByRankingId(id: string){
    return this.db.collection('rocketranking').doc(id).collection<Upvote>('upvotes').valueChanges();
  }
}
