import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { EstudanteAtividadesPage } from '../estudante-atividades/estudante-atividades';
import { EstudanteProfilePage } from '../estudante-profile/estudante-profile';
import { InicialPage } from '../inicial/inicial';


@Component({
  selector: 'page-estudante-home',
  templateUrl: 'estudante-home.html',
})
export class EstudanteHomePage {

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

  public goto_estudante_atividades(): void {
    this.navCtrl.push(EstudanteAtividadesPage);
  }

  public goto_estudante_profile(): void {
    this.navCtrl.push(EstudanteProfilePage);
  }

}
