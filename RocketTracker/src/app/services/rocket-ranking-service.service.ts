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
  DocumentSnapshot,
} from 'angularfire2/firestore';
import { RocketPlayerService } from './rocket-player.service';
import DateUtils from '../helpers/DateUtils';
import { firestore } from 'firebase';
import { UserInfoService } from './user-info.service';
import { AdditionalUserInfo } from '../models/additional-user-info';
@Injectable({
  providedIn: 'root'
})
export class RocketRankingService {

  constructor(private db: AngularFirestore, private userService: UserInfoService) {
    
  }

  GetByRankingId(id: string) {
    return this.db.collection('rocketranking').doc<RocketRanking>(id);
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

  SubscribeUser(rocketRanking: RocketRanking, user: firebase.User) {
    let rocketRankingDocument: AngularFirestoreDocument  = this.db.collection("rocketranking").doc(rocketRanking.id);

    console.log(user.uid);
    this.userService.GetByUid(user.uid).get().toPromise().then((x: firestore.DocumentSnapshot) => {
      let userInfo = x.data() as AdditionalUserInfo;
      let newPlayers = [...rocketRanking.players, {name: userInfo.name, points: 0, badPoints: 0, uid: user.uid}];
      console.log(newPlayers);
      rocketRankingDocument.update({players: newPlayers});
    })
    
  }
}
