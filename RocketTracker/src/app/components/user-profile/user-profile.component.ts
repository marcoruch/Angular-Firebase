import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserInfoService } from 'src/app/services/user-info.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { SnackBarService } from 'src/app/services/snack-bar-service.service';
import { Language } from 'src/app/models/language';
import defaultLanguages from 'src/app/data/languages';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: Observable<firebase.User>;
  userUid: string;

  /* info */
  name: string = "";
  birthday: Date;
  languageKey: string = '';
  /* info */

  languages: Language[] = defaultLanguages;

  constructor(private userInfoService: UserInfoService,
    private afAuth: AuthService, private snackBarService: SnackBarService) {
    this.user = this.afAuth.user;
  }

  ngOnInit() {
    this.user.subscribe(x => {
      this.userUid = x.uid;
      this.userInfoService.GetByUid(x.uid).valueChanges().subscribe(x => {
        this.birthday = x.birthday.toDate();
        this.name = x.name;
        this.languageKey = x.languageKey;
      })
    })
  }

  SaveInformation() {
    this.userInfoService.SaveInformation(this.userUid, {
      name: this.name,
      birthday: firebase.firestore.Timestamp.fromDate(this.birthday),
      age: this.CalculateAge(this.birthday),
      languageKey: this.languageKey,
    }).then(() => {
      this.openSnackBar("Erfolgreich gespeichert.");
    }).catch(err => {
      this.openSnackBar(err);
    })
  }

  CalculateAge(birthday: Date) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }


  openSnackBar(message: string) {
    this.snackBarService.openSnackBar(message, "Schliessen")
  }

}
