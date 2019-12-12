import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
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
import DateUtils from '../helpers/DateUtils';
@Injectable({
  providedIn: 'root'
})
export class RocketRankingService {

  constructor(private db: AngularFirestore) {
    
  }

  GetByDate(date: Date): Observable<RocketRanking[]> {
    // Since Querying by Date doesn't seem to function properly, each RocketRanking-Document owns an additional String-Property with the Date.
    return this.db.collection("rocketranking", ref => ref.where("rankingDateAsStr", "==", DateUtils.ToddMMyyyy(date)).limit(1)).snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as RocketRanking;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }
}
