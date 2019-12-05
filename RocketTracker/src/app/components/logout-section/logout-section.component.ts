import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout-section',
  templateUrl: './logout-section.component.html',
  styleUrls: ['./logout-section.component.scss']
})
export class LogoutSectionComponent implements OnInit {

  constructor(private authService: AuthService) { 

  }

  ngOnInit() {
  }

  signOut() {
    this.authService.signOut();
  }

}
