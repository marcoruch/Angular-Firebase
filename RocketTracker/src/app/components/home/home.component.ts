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

  rocketPlayers: Observable<RocketPlayer[]>

  CurrentDate: Date = new Date();

  constructor(private rocketPlayerService: RocketPlayerService) { }

  ngOnInit() {
    this.rocketPlayers = this.rocketPlayerService.rocketPlayers;
  }


  NextDay() {
    this.CurrentDate = DateUtils.addDays(this.CurrentDate, 1);
  }

  LastDay() {
    this.CurrentDate = DateUtils.addDays(this.CurrentDate, -1);

  }
}
