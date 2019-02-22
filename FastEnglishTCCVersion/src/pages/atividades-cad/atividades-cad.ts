import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'page-atividades-cad',
  templateUrl: 'atividades-cad.html',
})
export class AtividadesCadPage {

  constructor(public navCtrl: NavController, public db: AngularFirestore, public alertCtrl: AlertController) {
  }

  public cad_atividade(form: NgForm): void {

    let titulo: string = form.value.titulo;
    let dataPostada: Date = form.value.dataPostada;
    let dataEntrega: Date = form.value.dataEntrega;
    let descricao: string = form.value.descricao;
    let ativa: boolean = form.value.ativa;

    let atividade: any = {

      titulo:titulo,
      dataPostada:dataPostada,
      dataEntrega:dataEntrega,
      descricao:descricao,
      ativa:ativa

    }

    if (dataEntrega != dataPostada && dataEntrega < dataPostada) {

      this.db.collection('atividades').add(atividade)
        .then(() => {
          this.navCtrl.pop();
        })
        .catch((error) => {
          alert(error);
        });
      
    } else {
      
      const alert = this.alertCtrl.create({
        title: 'Check your dates',
        message: 'One of your dates is wrong, please check them.',
        buttons: ['Back']
      });
      alert.present();

    }
    
  }

}
