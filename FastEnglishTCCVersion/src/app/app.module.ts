import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {StudentloginPage} from '../pages/studentlogin/studentlogin';
import {InitialpagePage} from '../pages/initialpage/initialpage';
import {SignupPage} from '../pages/signup/signup';
import {ForgotpasswordPage} from  '../pages/forgotpassword/forgotpassword';
import {HomeStudentPage}  from '../pages/home-student/home-student';
import {ProfessorLoginPage} from '../pages/professor-login/professor-login';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Serviços/modulo pro banco funiocnar a auth
import {AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

//importação do modulo que vai permitir que relizamos cadastro no banco pelo app
import {FormsModule} from '@angular/forms';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyAHsNdSnos3n2rVTk2xboShRwaIlxH6hA8",
  authDomain: "fastenglishtccversion.firebaseapp.com",
  databaseURL: "https://fastenglishtccversion.firebaseio.com",
  projectId: "fastenglishtccversion",
  storageBucket: "fastenglishtccversion.appspot.com",
  messagingSenderId: "758220830880"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    StudentloginPage,
    InitialpagePage,
    SignupPage,
    ForgotpasswordPage,
    HomeStudentPage,
    ProfessorLoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    //dar acesso as classes que vão manipular o fires store
    AngularFirestoreModule,
    FormsModule,
    //modulo de autenticação
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    StudentloginPage,
    InitialpagePage,
    SignupPage,
    ForgotpasswordPage,
    HomeStudentPage,
    ProfessorLoginPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
