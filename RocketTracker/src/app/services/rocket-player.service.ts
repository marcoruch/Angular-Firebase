import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RocketPlayer } from '../models/rocket-player';
import {
    AngularFirestore,
    AngularFirestoreDocument,
    AngularFirestoreCollection,
    DocumentChangeAction,
    Action,
    DocumentSnapshotDoesNotExist,
    DocumentSnapshotExists,
} from 'angularfire2/firestore';

@Injectable({
    providedIn: 'root'
})
export class RocketPlayerService {

    rocketPlayersCollection: AngularFirestoreCollection<RocketPlayer>;
    rocketPlayers: Observable<RocketPlayer[]>;

    constructor(private db: AngularFirestore) {
        this.rocketPlayersCollection = this.db.collection('rocketPlayers');
        this.rocketPlayers = this.rocketPlayersCollection.snapshotChanges().pipe(map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data() as RocketPlayer;
                data.id = a.payload.doc.id;
                return data;
            })
        }));
    }
}
