import { Component, OnInit } from '@angular/core';
import { RocketPlayerService } from 'src/app/services/rocket-player.service';
import { Observable } from 'rxjs';
import { RocketPlayer } from '../../models/rocket-player';
import DateUtils from 'src/app/helpers/DateUtils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  rocketPlayers: RocketPlayer[]

  constructor(private rocketPlayerService: RocketPlayerService) { }

  ngOnInit() {
    this.rocketPlayerService.rocketPlayers.subscribe(x => this.rocketPlayers = x);
  }
}
