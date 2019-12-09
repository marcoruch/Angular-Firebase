import { Component, OnInit } from '@angular/core';
import { RocketPlayerService } from 'src/app/services/rocket-player.service';
import { Observable } from 'rxjs';
import { RocketPlayer } from '../../models/rocket-player';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  rocketPlayers: Observable<RocketPlayer[]>

  
  constructor(private rocketPlayerService: RocketPlayerService) { }

  ngOnInit() {
    this.rocketPlayers = this.rocketPlayerService.rocketPlayers;
  }
}
