import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { RocketRankingService } from 'src/app/services/rocket-ranking-service.service';
import { RocketRanking } from 'src/app/models/rocket-ranking';
import { AdditionalUserInfo } from 'src/app/models/additional-user-info';
import { UserInfoService } from 'src/app/services/user-info.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseError } from 'firebase';
import { UpvoteService } from 'src/app/services/upvote-service.service';
import { DownvoteService } from 'src/app/services/downvote-service.service';
import { Downvotes, Upvotes } from 'src/app/models/votes';
import DateUtils from 'src/app/helpers/DateUtils';
import { TranslateService } from '@ngx-translate/core';
import { TransService } from 'src/app/services/trans.service';

@Component({
  selector: 'app-daily-player-ranking',
  templateUrl: './daily-player-ranking.component.html',
  styleUrls: ['./daily-player-ranking.component.scss'],
})
export class DailyPlayerRankingComponent implements OnInit {

  date: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());

  error: boolean = false;
  user: firebase.User;
  rocketRanking: RocketRanking;
  rankingType: string = 'good';

  upVotes: Upvotes
  downVotes: Downvotes
  rocketRankingDataGood: { name: string, value: number, uid: string }[];
  rocketRankingDataBad: { name: string, value: number, uid: string }[];

  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  isCurrentRanking: boolean = false;

  constructor(private transServ: TransService, private rocketRankingService: RocketRankingService, private downVoteService: DownvoteService, private upVoteService: UpvoteService, private afAuth: AuthService) {
    this.afAuth.user.subscribe(x => this.user = x);
  }

  view: any[] = [window.innerWidth * 0.8 < 600 ? window.innerWidth : window.innerWidth * 0.8, 400];

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

  ngOnInit() {
    this.date.subscribe(date => {
      this.rocketRankingService.GetByDate(date).subscribe(x => {
        if (x[0]) {
          let rocketRanking = x[0];
          this.rocketRanking = rocketRanking;
          this.rocketRankingDataGood = this.GetRocketRankingDataGood(rocketRanking);
          this.rocketRankingDataBad = this.GetRocketRankingDataBad(rocketRanking);

          this.isCurrentRanking = this.IsCurrentRanking(rocketRanking);
          this.downVoteService.GetByRankingId(rocketRanking.id).subscribe(x => this.downVotes = x[0]);
          this.upVoteService.GetByRankingId(rocketRanking.id).subscribe(x => this.upVotes = x[0]);
        } else {
          this.rocketRanking = this.rocketRankingDataGood = null;
          this.error = true;
        }

        this.chartTitle = this.GetRocketRankingChartTitle(date);

      }, err => { console.log(err); this.error = true });
    })
  }

  GetRocketRankingDataGood(rocketRanking: RocketRanking) {
    if (rocketRanking.players) {
      return rocketRanking.players.map((x) => {
        return { "name": x.name, "value": x.points, "uid": x.uid }
      })
    } else {
      return [];
    }
  }

  GetRocketRankingDataBad(rocketRanking: RocketRanking) {
    if (rocketRanking.players) {
      return rocketRanking.players.map((x) => {
        return { "name": x.name, "value": x.badPoints, "uid": x.uid }
      })
    } else {
      return [];
    }
  }

  GetRocketRankingChartTitle(currentDate: Date) {
    return `Rangliste ${currentDate.toLocaleDateString('de-DE', this.options)}`;
  }

  IsCurrentRanking(rocketRanking: RocketRanking) {
    let today = new Date();
    let rankingDate = rocketRanking.rankingDate.toDate();
    return rankingDate.getDate() == today.getDate() &&
      rankingDate.getMonth() == today.getMonth() &&
      rankingDate.getFullYear() == today.getFullYear()
  }

  notRegisteredToDailyRanking() {
    if (this.rocketRanking) {
      return this.rocketRanking.players.filter(x => x.uid == this.user.uid).length == 0;
    } else {
      return false;
    }
  }

  registerForDailyRanking() {
    this.rocketRankingService.SubscribeUser(this.rocketRanking, this.user);
  }


  NextDay() {
    this.date.next(DateUtils.addDays(this.date.value, 1));
  }

  LastDay() {
    this.date.next(DateUtils.addDays(this.date.value, -1));

  }


}
