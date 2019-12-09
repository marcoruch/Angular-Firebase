import { Component, OnInit } from '@angular/core';
import { RocketRankingService } from 'src/app/services/rocket-ranking-service.service';
import { RocketRanking } from 'src/app/models/rocket-ranking';
import { AdditionalUserInfo } from 'src/app/models/additional-user-info';
import { UserInfoService } from 'src/app/services/user-info.service';
import { Observable, observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseError } from 'firebase';
import { UpvoteService } from 'src/app/services/upvote-service.service';
import { DownvoteService } from 'src/app/services/downvote-service.service';
import { Downvote, Upvote } from 'src/app/models/votes';

@Component({
  selector: 'app-daily-player-ranking',
  templateUrl: './daily-player-ranking.component.html',
  styleUrls: ['./daily-player-ranking.component.scss']
})
export class DailyPlayerRankingComponent implements OnInit {
  user: firebase.User;
  rocketRanking: RocketRanking;

  upVotesObs: Observable<Upvote[]>
  upVotes: Upvote[];

  downVotesObs: Observable<Downvote[]>
  downVotes: Downvote[];
  rocketRankingData: { name: string, value: number, uid: string }[];

  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  isCurrentRanking: boolean = false;
  userCanChooseUp: boolean = false;
  userCanChooseDown: boolean = false;

  constructor(private rocketRankingService: RocketRankingService, private downVoteService: DownvoteService, private upVoteService: UpvoteService, private afAuth: AuthService) {

  }

  view: any[] = [800, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Spieler';
  showYAxisLabel = true;
  yAxisLabel = 'Votes';
  legendTitle = "Spieler";
  chartTitle = '';


  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
    this.afAuth.user.subscribe(x => this.user = x);
    this.rocketRankingService.rocketRankings.subscribe(x => {
      this.rocketRanking = x[0];
      this.chartTitle = `Rangliste ${x[0].rankingDate.toDate().toLocaleDateString('de-DE', this.options)}`;
      this.isCurrentRanking = this.IsCurrentRanking(x[0]);
      this.downVotesObs = this.downVoteService.GetByRankingId(x[0].id);
      this.upVotesObs = this.upVoteService.GetByRankingId(x[0].id);
    this.downVotesObs.subscribe(x => this.downVotes = x);
    this.upVotesObs.subscribe(x => this.upVotes = x);

    this.userCanChooseUp = this.UserCanChooseUp();
    this.userCanChooseDown = this.UserCanChooseDown();
    });
    this.rocketRankingService.rocketRankings.subscribe(x =>
      this.rocketRankingData = x[0].players.map((x) => {
        return { "name": x.name, "value": x.points, "uid": x.uid }
      }));

      
    
  }

  HandleClick(uid: string) {
    console.log(uid);
  }

  IsCurrentRanking(rocketRanking: RocketRanking) {
    let today = new Date();
    let rankingDate = rocketRanking.rankingDate.toDate();
    return rankingDate.getDate() == today.getDate() &&
      rankingDate.getMonth() == today.getMonth() &&
      rankingDate.getFullYear() == today.getFullYear()
  }

  UserCanChooseUp() {
    return !(this.upVotes.filter(x => x.fromUid === this.user.uid).length > 0);
  }

  UserCanChooseDown() {
    return !(this.downVotes.filter(x => x.fromUid === this.user.uid).length > 0);
  }
}
