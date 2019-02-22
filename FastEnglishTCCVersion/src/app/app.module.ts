import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { EstudanteLoginPage } from '../pages/estudante-login/estudante-login';
import { InicialPage } from '../pages/inicial/inicial';
import { EstudanteCadPage } from '../pages/estudante-cad/estudante-cad';
import { EstudanteHomePage }  from '../pages/estudante-home/estudante-home';
import { ProfessorLoginPage } from '../pages/professor-login/professor-login';
import { ProfessorCadPage } from "../pages/professor-cad/professor-cad";
import { ProfessorHomePage } from "../pages/professor-home/professor-home";
import { AtividadesCadPage } from "../pages/atividades-cad/atividades-cad";


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
    EstudanteLoginPage,
    InicialPage,
    EstudanteCadPage,
    EstudanteHomePage,
    ProfessorLoginPage,
    ProfessorCadPage,
    ProfessorHomePage,
    AtividadesCadPage,
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
    EstudanteLoginPage,
    InicialPage,
    EstudanteCadPage,
    EstudanteHomePage,
    ProfessorLoginPage,
    ProfessorCadPage,
    ProfessorHomePage,
    AtividadesCadPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
