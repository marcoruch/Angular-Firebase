import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Translations } from '../models/translations';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransService {
  private currentTranslation: Observable<Translations>;
  private loadedLanguages: string[] = [];

  constructor(private translate: TranslateService, private db: AngularFirestore) {
    translate.setDefaultLang('de');
    translate.use('de');
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
      this.translate.use(langKey);
    });
    await promise;
  }
}
