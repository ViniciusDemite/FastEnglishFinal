import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-professor-cad',
  templateUrl: 'professor-cad.html',
})
export class ProfessorCadPage {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfessorCadPage');
  }

}
