import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RocketPlayer } from '../models/rocket-player';
import { RocketRanking } from '../models/rocket-ranking';



import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
  DocumentChangeAction,
  Action,
  DocumentSnapshotDoesNotExist,
  DocumentSnapshotExists,
} from 'angularfire2/firestore';
import { RocketPlayerService } from './rocket-player.service';
@Injectable({
  providedIn: 'root'
})
export class RocketRankingService {

  rocketPlayersCollection: AngularFirestoreCollection<RocketRanking>;
  rocketRankings: Observable<RocketRanking[]>;

  constructor(private db: AngularFirestore, private rocketPlayerService: RocketPlayerService) {
 
    this.rocketPlayersCollection = this.db.collection("rocketranking");
    this.rocketRankings = this.rocketPlayersCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as RocketRanking;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }
}
