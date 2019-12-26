import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Language } from 'src/app/models/language';
import { Observable, BehaviorSubject } from 'rxjs';
import { AdditionalUserInfo } from 'src/app/models/additional-user-info';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnChanges, OnInit {

  @Input() currentUser: Observable<AdditionalUserInfo>;

  currentLanguageKey = new BehaviorSubject<string>('');
  languages: Language[] = [{
    key: 'de',
    name: 'Deutsch',
    icon: 'de'
  },
  {
    key: 'en',
    name: 'English',
    icon: 'gb',
  }
  ]

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.currentUser){
      console.log(this.currentUser);
      this.currentUser.subscribe(data=>{
        if(data!= undefined){
          this.currentLanguageKey.next(data.languageKey);
        }
      })
    }
  }

}
