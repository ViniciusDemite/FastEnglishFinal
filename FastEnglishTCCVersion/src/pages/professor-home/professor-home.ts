
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { ProfessorAtividadesPage } from '../professor-atividades/professor-atividades';
import { ProfessorProfilePage } from '../professor-profile/professor-profile';
import { InicialPage } from '../inicial/inicial';

@Component({
  selector: 'page-professor-home',
  templateUrl: 'professor-home.html',
})
export class ProfessorHomePage {

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public alertCtrl: AlertController) {
  }

  public logout(): void {

    const prompt = this.alertCtrl.create({
      
      title: 'Logout',
      message: 'Are you sure you want to end your session?',

      buttons: [

        {
          text: 'Back'
        },

        {
          text: 'Proceed',
          handler: () => {
            this.afAuth.auth.signOut();
            this.navCtrl.setRoot(InicialPage);
          }
        }

      ]

    })
    prompt.present();
  }

  public goto_professor_atividades(): void {
    this.navCtrl.push(ProfessorAtividadesPage);
  }

  public goto_professor_profile(): void {
    this.navCtrl.push(ProfessorProfilePage);
  }

}
