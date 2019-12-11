import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Upvotes } from '../models/votes';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UpvoteService {

  constructor(private db: AngularFirestore) { }



  GetByRankingId(id: string){
    return this.db.collection('rocketranking').doc(id).collection<Upvotes>('upvotes').valueChanges().pipe(take(1));
  }
}
