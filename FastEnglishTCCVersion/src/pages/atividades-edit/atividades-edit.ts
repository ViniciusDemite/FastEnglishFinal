import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-atividades-edit',
  templateUrl: 'atividades-edit.html',
})
export class AtividadesEditPage {

  public id: string;
  public atividades: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFirestore, public afAuth: AngularFireAuth) {

    this.id = navParams.get('id');

    let sub = this.db.collection('atividades').doc(this.id).valueChanges()
      .subscribe((atv) => {
        this.atividades = atv;
        sub.unsubscribe();
      });

  }

  public editar_atividade(form: NgForm): void {
    let nome: string = form.value.nome;
    let dataPostada: Date = form.value.dataPostada;
    let dataEntrega: Date = form.value.dataEntrega;
    let descricao: string = form.value.descricao;
    let ativo: boolean    = form.value.ativa;

    let atividade = {
      nome: nome,
      dataPostada: dataPostada,
      dataEntrega: dataEntrega,
      descricao: descricao,
      ativo: ativo
    }

    this.db.collection('atividades').doc(this.id).update(atividade)
      .catch((error) => {
        alert(error);
      })

    this.navCtrl.pop();
  }
}