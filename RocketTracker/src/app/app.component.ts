import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { AdditionalUserInfo } from './models/additional-user-info';
import { UserInfoService } from './services/user-info.service';
import { EMPTY } from 'rxjs'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  user: Observable<AdditionalUserInfo>;

  constructor(private userInfoService: UserInfoService,
    private authService: AuthService) {
  }

  HandleUserUpdate(currentUser: firebase.User) {
    if (currentUser == null) {
      this.user = EMPTY;
    } else {
      this.FetchUserInfo(currentUser);
    }
  }

  FetchUserInfo(currentUser: firebase.User) {
    this.user = this.userInfoService.GetByUid(currentUser.uid).valueChanges()
  }

  ngOnInit(): void {
    this.authService.user.subscribe(currentUser => this.HandleUserUpdate(currentUser));
  }
}
