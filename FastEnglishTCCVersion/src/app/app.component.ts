import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { InicialPage } from '../pages/inicial/inicial';
import { EstudanteHomePage } from '../pages/estudante-home/estudante-home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  // rootPage: any = null;
  rootPage: any = InicialPage;

  constructor(public platform: Platform, public afAuth: AngularFireAuth) {

    platform.ready().then(() => {

      // método para autenticar o status do usuário
      afAuth.auth.onAuthStateChanged((user) => {

        if (user != null) { this.rootPage = EstudanteHomePage; } //logado

        else { this.rootPage = InicialPage; } //deslogado

      })

    });

  }
}
