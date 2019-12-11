import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Downvotes } from '../models/votes';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DownvoteService {

  constructor(private db: AngularFirestore) { }



  GetByRankingId(id: string){
    return this.db.collection('rocketranking').doc(id).collection<Downvotes>('downvotes').valueChanges().pipe(take(1));
  }
}
