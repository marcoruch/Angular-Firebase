import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user: Observable<firebase.User | null>;

    constructor(private afAuth: AngularFireAuth) {
        this.user = this.afAuth.authState;
    }
    
    anonymousLogin() {
        return this.afAuth.auth.signInAnonymously()
    }
}