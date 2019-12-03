import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { RocketPlayerService } from './services/rocket-player.service';
import { RocketPlayer } from './models/rocket-player';
import { AuthService } from './services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  rocketPlayers: Observable<RocketPlayer[]>
  user: firebase.User;

  constructor(private rocketPlayerService: RocketPlayerService,
    private authService: AuthService) {
    this.authService.anonymousLogin();
  }

  ngOnInit(): void {
    this.rocketPlayers = this.rocketPlayerService.rocketPlayers;
    this.authService.user.subscribe(currentUser => this.user = currentUser);
  }
}
