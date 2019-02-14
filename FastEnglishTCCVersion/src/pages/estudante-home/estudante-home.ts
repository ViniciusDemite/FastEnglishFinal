import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';


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

}
