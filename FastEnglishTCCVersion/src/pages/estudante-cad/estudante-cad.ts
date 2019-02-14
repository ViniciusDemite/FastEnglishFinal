import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'page-estudante-cad',
  templateUrl: 'estudante-cad.html',
})
export class EstudanteCadPage {

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private db: AngularFirestore) {
  }

  public async cad_estudante(form: NgForm) {

    let nome: string = form.value.nome;
    let email: string = form.value.email;
    let senha: string = form.value.senha;
    let faculdade: string = form.value.faculdade;
    let materia: string = form.value.materia;
    let semestre: string = form.value.materia;
    let curso: string = form.value.curso;
    let periodo: string = form.value.perido;
    let nome_professor: string = form.value.perido;
    let permissao: boolean = true;

    let estudante: any = {
      nome: nome,
      email: email,
      faculdade: faculdade,
      materia: materia,
      semestre: semestre,
      curso: curso,
      periodo: periodo,
      nome_professor: nome_professor,
      permissao: permissao
    }

    let result = await this.afAuth.auth.createUserWithEmailAndPassword(email, senha);
    await result.user.updateProfile({ displayName: nome, photoURL: '' });
    this.db.collection('usuarios').doc(result.user.uid).set(estudante);

  }

}
