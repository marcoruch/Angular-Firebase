import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AdditionalUserInfo } from '../models/additional-user-info';
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
export class UserInfoService {

    additionalUserInfosCollection: AngularFirestoreCollection<AdditionalUserInfo>;

    constructor(private db: AngularFirestore) {
        this.additionalUserInfosCollection = this.db.collection('users');
    }

    GetByUid(uid: string): Observable<AdditionalUserInfo> {
        return this.additionalUserInfosCollection.doc<AdditionalUserInfo>(uid).valueChanges();
    }
}
