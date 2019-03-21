import { Component, ViewChild } from '@angular/core';
import { Platform, IonicPage } from 'ionic-angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { Nav } from 'ionic-angular';
import { ProfessorHomePage } from "../pages/professor-home/professor-home";
import { EstudanteHomePage } from '../pages/estudante-home/estudante-home';
import { InicialPage } from '../pages/inicial/inicial';
import { AngularFirestore } from '@angular/fire/firestore';
// @IonicPage()
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;
  pages: Array<{ icon: string, title: string, component: string }>;
  // rootPage: any = InicialPage;
  rootPage: any = InicialPage;
  public usuario: any = {};

  constructor(public platform: Platform, public afAuth: AngularFireAuth, public db: AngularFirestore) {

    platform.ready().then(() => {

      afAuth.auth.onAuthStateChanged((user) => {

        if (user != null) {

          this.rootPage = EstudanteHomePage;
          
          // let sub = this.db.collection('usuarios').doc<any>(user.uid).valueChanges()
          // .subscribe((_user) => {
          //   this.usuario = _user.identificador; 
          //   sub.unsubscribe();
          // })

          // if (this.usuario == 'admProf2019') {
          //   this.rootPage = ProfessorHomePage;
          // } else {
          //   this.rootPage = EstudanteHomePage;
          // }
        } else {
          this.rootPage = InicialPage;
        }

      })

    });

  }
}
