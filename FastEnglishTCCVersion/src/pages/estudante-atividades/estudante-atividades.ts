import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'page-estudante-atividades',
  templateUrl: 'estudante-atividades.html',
})
export class EstudanteAtividadesPage {

  public lista: Observable<any>;
  // public exiteDocumentos;
  public atividade: any = {};

  constructor(public navCtrl: NavController, public db: AngularFirestore, public afAuth: AngularFireAuth) {

    this.lista = db.collection('atividades').valueChanges();

  }

  public responder_atividade(id: string): void {
    let sub = this.db.collection('atividades').doc(id).valueChanges()
    .subscribe((atv) => {
      this.atividade = atv;
      sub.unsubscribe();
    })
  }

}
