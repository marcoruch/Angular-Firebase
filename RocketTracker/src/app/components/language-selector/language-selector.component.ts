import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Language } from 'src/app/models/language';
import { Observable, BehaviorSubject } from 'rxjs';
import { AdditionalUserInfo } from 'src/app/models/additional-user-info';
import { TranslateService } from '@ngx-translate/core';
import { TransService } from 'src/app/services/trans.service';
import { SnackBarService } from 'src/app/services/snack-bar-service.service';
import defaultLanguages from 'src/app/data/languages';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnChanges, OnInit {

  @Input() currentUser: Observable<AdditionalUserInfo>;

  currentLanguageKey = new BehaviorSubject<string>('');

  languages: Language[] = defaultLanguages;

  constructor(private translate: TranslateService, private transService: TransService, private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.translate.onLangChange.subscribe((x: { lang: string }) => {
      this.currentLanguageKey.next(x.lang)}
      );
  }

  ngOnChanges() {
    if (this.currentUser) {
      this.currentUser.subscribe(data => {
        if (data != undefined) {
          this.currentLanguageKey.next(data.languageKey);
        }
      })
    }
  }

  async changeLanguage(languageKey: string) {
    if (languageKey !== this.currentLanguageKey.value) {
      await this.transService.SetLanguage(languageKey);
      this.translate.get('changedLanguage').toPromise().then(x => {
        this.snackBarService.openSnackBar(x,  "X")
      })
    }
  }

}
