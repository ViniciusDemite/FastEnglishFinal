import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AtividadesEditPage } from '../atividades-edit/atividades-edit';
import { AtividadesCadPage } from '../atividades-cad/atividades-cad';

@Component({
  selector: 'page-professor-atividades',
  templateUrl: 'professor-atividades.html',
})
export class ProfessorAtividadesPage {

  public lista: Observable<any>;
  public atividades: any = {};

  constructor(public navCtrl: NavController, public db: AngularFirestore, public alertCtrl: AlertController) {
    this.lista = db.collection('atividades').valueChanges();
  }

  public goto_edit_atividades(id: string): void {
    this.navCtrl.push(AtividadesEditPage, {id: id});
  }

  public goto_atividades_cad(): void {
    this.navCtrl.push(AtividadesCadPage);
  }

  public apagar_atividade(id: string): void {

    const prompt = this.alertCtrl.create({
      title: 'Delete Activity',
      message: 'Are your sure you want to delete this activity?',

      buttons: [
        {
          text: 'Back',
        },

        {
          text: 'Proceed',
          handler: (() => {
            this.db.collection('atividades').doc(id).delete();
          })
        }
      ]
    })
    prompt.present();
  }

}
