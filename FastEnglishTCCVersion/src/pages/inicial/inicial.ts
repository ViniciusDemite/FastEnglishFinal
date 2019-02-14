import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfessorLoginPage } from '../professor-login/professor-login';
import { EstudanteLoginPage } from '../estudante-login/estudante-login';
import { EstudanteCadPage } from '../estudante-cad/estudante-cad';

@Component({
  selector: 'page-inicial',
  templateUrl: 'inicial.html',
})
export class InicialPage {

  constructor(public navCtrl: NavController) {
  }

  public goto_professor_login(): void { this.navCtrl.push(ProfessorLoginPage) }

  public goto_estudante_cad(): void { this.navCtrl.push(EstudanteCadPage) }

  public goto_estudante_login(): void { this.navCtrl.push(EstudanteLoginPage); }

}