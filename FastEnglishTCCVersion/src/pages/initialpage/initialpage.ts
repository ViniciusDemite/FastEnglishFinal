import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//página de login do aluno
import {StudentloginPage} from '../studentlogin/studentlogin';


//página de cadastro de um novo usuario
import {SignupPage} from  '../signup/signup';
import { HomeStudentPage } from '../home-student/home-student';
import {ProfessorLoginPage} from '../professor-login/professor-login';



/**
 * Generated class for the InitialpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-initialpage',
  templateUrl: 'initialpage.html',
})
export class InitialpagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }



  /**
   * página de login do estudante
   */
  public login() : void{

    this.navCtrl.push(StudentloginPage);
    
  }


  /**
   *  página de cadastyro de um novo usuario
   */
  public signup() : void{

    this.navCtrl.push(SignupPage);
    
  }


  /**
   * login_professor
   */
  public login_professor() {
    
    this.navCtrl.push(ProfessorLoginPage)
  
  }

  /**
   * home_student
   */
  public home_student() {

    this.navCtrl.setRoot(HomeStudentPage);
    
  }



}
