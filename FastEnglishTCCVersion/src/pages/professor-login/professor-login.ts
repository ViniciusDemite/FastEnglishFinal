import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProfessorCadPage } from '../professor-cad/professor-cad';
import { ProfessorHomePage } from '../professor-home/professor-home';

@Component({
  selector: 'page-professor-login',
  templateUrl: 'professor-login.html',
})
export class ProfessorLoginPage {

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private alertCtrl: AlertController, private db: AngularFirestore) {
    
  }

  public async recuperar_senha(form: NgForm) {

    let email: string = form.value.email;

    let sub = this.db.collection('usuarios').doc<any>(this.afAuth.auth.currentUser.uid).valueChanges().subscribe((dadosUser) => {

      let email_professor: string = dadosUser.email;
      sub.unsubscribe();

      if (email_professor === email) {

        this.afAuth.auth.sendPasswordResetEmail(email);

        const alert = this.alertCtrl.create({
          title: 'E-mail sent',
          message: 'An reset password e-mail have been sent to your e-mail adress.',
          buttons: ['OK']
        });
        alert.present();

      } else {
        const alert = this.alertCtrl.create({
          title: 'Invalid e-mail',
          message: 'Your e-mail is not valid, please check if you typed it correctly.',
          buttons: ['Back']
        });
        alert.present();
      }

    });
  }

  public login_professor(form: NgForm) {

    let email: string = form.value.email;
    let senha: string = form.value.senha;

    this.afAuth.auth.signInWithEmailAndPassword(email, senha)
      .then(() => { 
        this.navCtrl.setRoot(ProfessorHomePage);
      })
      .catch(() => { alert('User or Password not found') });
  }

  public goto_professor_cad(): void { this.navCtrl.push(ProfessorCadPage) }
}
