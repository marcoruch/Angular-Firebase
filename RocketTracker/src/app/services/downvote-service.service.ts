import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Downvote } from '../models/votes';

@Injectable({
  providedIn: 'root'
})
export class DownvoteService {

  constructor(private db: AngularFirestore) { }



  GetByRankingId(id: string){
    return this.db.collection('rocketranking').doc(id).collection<Downvote>('downvotes').valueChanges();
  }
}
