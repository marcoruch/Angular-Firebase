import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


/* Components */
import { AppComponent } from './app.component';

import { LoginRegisterModalComponent } from './components/login-register-modal/login-register-modal.component';



import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule  } from '@angular/fire/auth';
import { CustomMaterialModule } from './core/material.module';
import { LogoutSectionComponent } from './components/logout-section/logout-section.component';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserProfileButtonComponent } from './components/user-profile-button/user-profile-button.component';
import { AppRoutingModule } from './app-routing.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HomeComponent } from './components/home/home.component';
import { DailyPlayerRankingComponent } from './components/daily-player-ranking/daily-player-ranking.component';
import { NgxChartingModule } from './core/ngx-charting.module';

@NgModule({
  declarations: [
    /* Components */
    AppComponent,
    LoginRegisterModalComponent,
    LogoutSectionComponent,
    UserProfileButtonComponent,
    UserProfileComponent,
    HomeComponent,
    DailyPlayerRankingComponent,
    /*=============*/
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    CustomMaterialModule,
    NgxChartingModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
