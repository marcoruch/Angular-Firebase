import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Downvotes, Upvotes } from 'src/app/models/votes';
import { Observable, forkJoin } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';
import { RocketPlayer } from 'src/app/models/rocket-player';
import { UpvoteService } from 'src/app/services/upvote-service.service';
import { DownvoteService } from 'src/app/services/downvote-service.service';

@Component({
  selector: 'app-voting-list',
  templateUrl: './voting-list.component.html',
  styleUrls: ['./voting-list.component.scss']
})
export class VotingListComponent implements OnInit {

  // Inputs
  @Input() rocketRankingId: string;
  @Input() upvotes: Upvotes;
  @Input() downvotes: Downvotes;
  @Input() rocketPlayersOfTheDay: RocketPlayer[];

  userUid: string;
  user: Observable<firebase.User>;

  // Properties
  userCanUpvote: boolean = false;
  userCanDownvote: boolean = false;

  constructor(private afAuth: AuthService, private upvoteService: UpvoteService, private downvoteService: DownvoteService) {
    this.user = this.afAuth.user;
  }

  ngOnInit() {
    this.user.subscribe(x => console.log(x))
    console.log(this.upvotes);
    console.log(this.downvotes);
    console.log(this.rocketPlayersOfTheDay);
    this.user.subscribe(user => {
      this.userUid = user.uid;
      this.userCanUpvote = this.UserCanUpvote(this.upvotes.uids, user.uid);
      this.userCanDownvote = this.UserCanDownvote(this.downvotes.uids, user.uid);
    }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.downvotes) {
      this.userCanDownvote = this.UserCanDownvote(changes.downvotes.currentValue.uids, this.userUid);
    }
    if (changes.upvotes) {
      console.log(changes.upvotes);

      this.userCanUpvote = this.UserCanUpvote(changes.upvotes.currentValue.uids, this.userUid);
    console.log(this.userCanUpvote);
    }
  }
  

  private UserCanUpvote(uids: string[], uid: string) {
    return (!uids) || !(uids.filter(x => x === uid).length > 0);
  }

  private UserCanDownvote(uids: string[], uid: string) {
    return (!uids) || !(uids.filter(x => x === uid).length > 0);
  }

  Upvoted(uid: string) {
     this.upvoteService.AddUpvote(uid,this.userUid, this.rocketRankingId);
  }

  Downvoted(uid: string) {
    this.downvoteService.AddDownvote(uid,this.userUid, this.rocketRankingId)
  }
}
