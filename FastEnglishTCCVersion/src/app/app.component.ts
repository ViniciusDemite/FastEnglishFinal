import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { AngularFireAuth } from '@angular/fire/auth';
import { Nav } from 'ionic-angular';
import { ProfessorHomePage } from "../pages/professor-home/professor-home";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  nav: Nav;
  pages: Array<{ title: string, component: string, openTab?: any }>;
  rootPage = ProfessorHomePage;

  constructor(public platform: Platform, public afAuth: AngularFireAuth) {

    // platform.ready().then(() => {

    //   // método para autenticar o status do usuário
    //   afAuth.auth.onAuthStateChanged((user) => {

    //     if (user != null) { this.rootPage = EstudanteHomePage; } //logado

    //     else { this.rootPage = InicialPage; } //deslogado

    //   })

    // });

    this.pages = [
      { title: 'Ativities', component: 'AtividadesCadPage', openTab: 1 },
      // { title: 'Atividades', component: 'EstudanteAtividadesPage', openTab: 1 } ,
      // { title: 'Professor', component: 'EstudanteProfessorPage' },
    ];

  }

  public openPage(page) {
    this.nav.setRoot(page.component, { openTab: page.openTab });
  }
}
