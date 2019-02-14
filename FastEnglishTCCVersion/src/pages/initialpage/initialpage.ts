import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//página de login do aluno
import {StudentloginPage} from '../studentlogin/studentlogin';


//página de cadastro de um novo usuario
import {SignupPage} from  '../signup/signup';
import {ProfessorLoginPage} from '../professor-login/professor-login';

@Component({
  selector: 'page-initialpage',
  templateUrl: 'initialpage.html',
})
export class InitialPage {

  constructor(public navCtrl: NavController) {
  }

  public goto_login_professor(): void { this.navCtrl.push(ProfessorLoginPage) }

  public goto_student_signup(): void { this.navCtrl.push(SignupPage) }

  public goto_login() : void{ this.navCtrl.push(StudentloginPage); }

}
