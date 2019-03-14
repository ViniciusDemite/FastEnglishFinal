import { Component, ViewChild } from '@angular/core';
import { Platform, IonicPage } from 'ionic-angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { Nav } from 'ionic-angular';
import { ProfessorHomePage } from "../pages/professor-home/professor-home";
import { EstudanteHomePage } from '../pages/estudante-home/estudante-home';
import { InicialPage } from '../pages/inicial/inicial';
// @IonicPage()
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;
  pages: Array<{ icon: string, title: string, component: string }>;
  rootPage: any = InicialPage;

  constructor(public platform: Platform, public afAuth: AngularFireAuth) {

    platform.ready().then(() => {

      afAuth.auth.onAuthStateChanged((user) => {

        if (user != null) {
          this.rootPage = ProfessorHomePage;
        } else {
          this.rootPage = InicialPage;
        }

      })

      this.pages = [
        { icon: 'clipboard', title: 'Ativities', component: 'AtividadesCadPage' },
        { icon: 'person', title: 'Profile', component: 'ProfessorProfilePage' } ,
        // { icon: 'people', title: 'Students', component: 'ProfessorEstudantesPage' },
      ];

    });

  }

  public openPage(page) {
    // this.nav.setRoot(page.component);
    this.rootPage = page.component;
  }

  public logout(): void {
    this.afAuth.auth.signOut();
  }
}
