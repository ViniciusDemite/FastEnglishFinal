import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AtividadesCadPage } from '../atividades-cad/atividades-cad';

@Component({
  selector: 'page-professor-home',
  templateUrl: 'professor-home.html',
})
export class ProfessorHomePage {

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth) {
  }

  public logout(): void {
    this.afAuth.auth.signOut();
  }

  public goto_atividades_cad(): void {
    this.navCtrl.push(AtividadesCadPage);
  }

}
