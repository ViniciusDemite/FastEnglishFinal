import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { EstudanteAtividadesPage } from '../estudante-atividades/estudante-atividades';
import { EstudanteProfilePage } from '../estudante-profile/estudante-profile';


@Component({
  selector: 'page-estudante-home',
  templateUrl: 'estudante-home.html',
})
export class EstudanteHomePage {

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth) {
  }

  public logout(): void {
    this.afAuth.auth.signOut();
  }

  public goto_estudante_atividades(): void {
    this.navCtrl.push(EstudanteAtividadesPage);
  }

  public goto_estudante_profile(): void {
    this.navCtrl.push(EstudanteProfilePage);
  }

}
