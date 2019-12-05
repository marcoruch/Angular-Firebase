import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { RocketPlayerService } from './services/rocket-player.service';
import { RocketPlayer } from './models/rocket-player';
import { AuthService } from './services/auth.service';
import { map } from 'rxjs/operators';
import { AdditionalUserInfo } from './models/additional-user-info';
import { UserInfoService } from './services/user-info.service';
import { filter } from 'rxjs/operators'
import { EMPTY } from 'rxjs'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  rocketPlayers: Observable<RocketPlayer[]>
  user: Observable<AdditionalUserInfo>;

  constructor(private rocketPlayerService: RocketPlayerService,
    private userInfoService: UserInfoService,
    private authService: AuthService) {
  }

  HandleUserUpdate(currentUser: firebase.User) {
    console.log(currentUser);
    if (currentUser == null) {
      this.user = EMPTY;
    } else {
      this.FetchUserInfo(currentUser);
    }
  }

  FetchUserInfo(currentUser: firebase.User) {
    this.userInfoService.GetByUid(currentUser.uid).pipe(x => this.user = x)
  }

  ngOnInit(): void {
    this.rocketPlayers = this.rocketPlayerService.rocketPlayers;
    this.authService.user.subscribe(currentUser => this.HandleUserUpdate(currentUser));
  }
}
