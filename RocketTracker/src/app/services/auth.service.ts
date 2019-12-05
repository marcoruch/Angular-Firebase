import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import { AdditionalUserInfo } from '../models/additional-user-info';
import { EMPTY } from 'rxjs'


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user: Observable<firebase.User | null>;

    usersPath: string = 'users';

    constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
        this.user = this.afAuth.authState;
    }

    UpdateUserDoc(user: firebase.User, userInfo: AdditionalUserInfo) {
        return new Promise((resolve, reject) => {
            this.db.collection(this.usersPath).doc(user.uid)
                .set(userInfo)
                .then(() => resolve())
                .catch((e) => reject(e))
        })
    }

    async passwordEmailLogin(email: string, password: string) {
        return await this.afAuth.auth.signInWithEmailAndPassword(email, password).then(x => x);
    }

    async registerEmailPassword(email: string, password: string, userInfo: AdditionalUserInfo) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((user: firebase.auth.UserCredential) => {
                this.UpdateUserDoc(user.user, userInfo);
            })
            .catch((e) => console.log(e));
    }

    async signOut() {
        this.afAuth.auth.signOut();
    }

    anonymousLogin() {
        return this.afAuth.auth.signInAnonymously()
    }
}