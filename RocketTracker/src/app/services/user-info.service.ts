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
    DocumentSnapshot,
} from 'angularfire2/firestore';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class UserInfoService {

    additionalUserInfosCollection: AngularFirestoreCollection<AdditionalUserInfo>;

    constructor(private db: AngularFirestore) {
        this.additionalUserInfosCollection = this.db.collection('users');
    }

    GetByUid(uid: string): AngularFirestoreDocument<AdditionalUserInfo> {
        return this.additionalUserInfosCollection.doc<AdditionalUserInfo>(uid);
    }

    GetByUids(uids: string[]): Observable<AdditionalUserInfo[]> {
        return this.db.collection<AdditionalUserInfo>('users', ref => ref.where('id', 'in', uids)).valueChanges();
    }

    SaveInformation(uid: string, info: AdditionalUserInfo): Promise<void> {
        return this.additionalUserInfosCollection.doc(uid).update({
            name: info.name,
            age: info.age,
            birthday: info.birthday,
            languageKey: info.languageKey
        });
    }
}
