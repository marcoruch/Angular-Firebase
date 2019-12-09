import { Component, OnInit, Input } from '@angular/core';
import { AdditionalUserInfo } from '../../models/additional-user-info';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile-button',
  templateUrl: './user-profile-button.component.html',
  styleUrls: ['./user-profile-button.component.scss']
})
export class UserProfileButtonComponent implements OnInit {
  @Input() user: Observable<AdditionalUserInfo>;

  constructor() {

  }

  ngOnInit() {
    
  }

}
