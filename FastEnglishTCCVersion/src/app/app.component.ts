import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { InitialPage} from '../pages/initialpage/initialpage';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomeStudentPage } from '../pages/home-student/home-student';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // @ViewChild(Nav) nav: Nav;

  // rootPage: any = null;
  rootPage: any = InitialPage;

  // pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public afAuth: AngularFireAuth) {

    platform.ready().then(() => {

      // método para autenticar o status do usuário
      afAuth.auth.onAuthStateChanged((user) => {

        if (user != null) { this.rootPage = HomeStudentPage; } //logado

        else { this.rootPage = InitialPage; } //deslogado

      })

    });
    // this.initializeApp();

    // // used for an example of ngFor and navigation
    // // Aqui fica os componentes que estão na lista de menu lateral
    // this.pages = [
    //   { title: 'Home', component: HomePage },
    //   { title: 'Homework List', component: ListPage }
      
    // ];

  }

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     // Okay, so the platform is ready and our plugins are available.
  //     // Here you can do any higher level native things you might need.
  //     this.statusBar.styleDefault();
  //     this.splashScreen.hide();
  //   });
  // }

  // openPage(page) {
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   this.nav.setRoot(page.component);
  // }
}
