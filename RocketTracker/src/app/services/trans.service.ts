import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AngularFirestore, DocumentChangeAction, Action, DocumentSnapshot } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Translations } from '../models/translations';
import { Observable } from 'rxjs';
import { UserInfoService } from './user-info.service';
import { AuthService } from './auth.service';
import { AdditionalUserInfo } from '../models/additional-user-info';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class TransService {
  private currentTranslation: Observable<Translations>;
  private loadedLanguages: string[] = [];
  private userInfo: AdditionalUserInfo;
  private user: firebase.User;

  constructor(private translate: TranslateService, private db: AngularFirestore, private userService: UserInfoService, authService: AuthService) {
    translate.setDefaultLang('de');
    translate.use('de');
    authService.user.subscribe(user => {
      this.user = user;
      this.userService.GetByUid(user.uid).snapshotChanges().subscribe(x => {
        this.userInfo = x.payload.data() as AdditionalUserInfo;
      })
    });
  }

  private LoadLanguage(langKey: string) {
    try {
      this.currentTranslation = this.db.collection<Translations>('translations', ref => ref.where('key', '==', langKey).limit(1))
        .snapshotChanges()
        .pipe(map((actions: DocumentChangeAction<Translations>[]) => {
          let actionRes = actions[0];
          const data = actionRes.payload.doc.data() as Translations;
          data.id = actionRes.payload.doc.id;
          return data;
        }
        ));
    }

    catch (error) {
      console.log("Could not load Language..." + langKey, error);
    }
  }

  async SetLanguage(langKey: string) {
    const promise = new Promise((resolve, reject) => {
      this.LoadLanguage(langKey);
      if (!this.loadedLanguages.includes(langKey)) {
        this.currentTranslation.subscribe((curr: Translations) => {
          this.translate.setTranslation(langKey, curr.translations);
          resolve();
        })
        this.loadedLanguages.push(langKey);
      } else {
        resolve();
      }

      if (typeof this.user !== "undefined") {
        if (typeof this.userInfo !== "undefined" && this.userInfo.languageKey !== langKey) {
          this.userService.ChangeLanguage(this.user.uid, langKey);
        }
      }

      this.translate.use(langKey);
    });
    await promise;
  }
}
