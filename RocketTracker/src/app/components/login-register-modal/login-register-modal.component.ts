import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AdditionalUserInfo } from '../../models/additional-user-info';


@Component({
  selector: 'app-login-register-modal',
  templateUrl: './login-register-modal.component.html',
  styleUrls: ['./login-register-modal.component.scss']
})
export class LoginRegisterModalComponent implements OnInit {

  modalVisible: boolean = false;
  registerModalVisible: boolean = false;


  /* model */
  email: string = '';
  username: string = '';
  userAge?: number;
  password: string = '';
  repeatPassword: string = '';
  loginErrorMsg: string = '';
  registerErrorMsg: string ='';
  /*========*/
  constructor(private afAuth: AuthService) { }

  ngOnInit() {

  }


  toggleModal() {
    this.registerModalVisible = false;
    this.modalVisible = !this.modalVisible;
  }

  toggleRegisterModal() {
    this.modalVisible = false;
    this.registerModalVisible = !this.registerModalVisible;

  }

  async submitLogin() {
    try {
      var result = await this.afAuth.passwordEmailLogin(this.username, this.password);
      return result;
    } catch (error) {
      this.loginErrorMsg = error;
    }
  }

  submitRegister() {

    let additionalInfo: AdditionalUserInfo = <AdditionalUserInfo> {};
    additionalInfo.age = this.userAge;
    additionalInfo.name = this.username;
    if (this.password === this.repeatPassword) {
      try {
        this.afAuth.registerEmailPassword(this.email, this.password, additionalInfo)
      } catch (error) {
        this.registerErrorMsg = error;
      }
    }
  }

}
