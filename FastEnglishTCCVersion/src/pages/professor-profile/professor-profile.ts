import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'page-professor-profile',
  templateUrl: 'professor-profile.html',
})
export class ProfessorProfilePage {

  public usuario: any = {};

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public db: AngularFirestore, public alertCtrl: AlertController) {

    let sub = this.db.collection('usuarios').doc(this.afAuth.auth.currentUser.uid).valueChanges()
      .subscribe((user) => {
        this.usuario = user;
        sub.unsubscribe();
      });

  }

  public async editar_atividade(form: NgForm) {
    let nome = form.value.nome;
    let email = form.value.email;

    let user = this.afAuth.auth.currentUser;
    let credencial: any = null;

    await this.db.collection('usuarios').doc(user.uid).update({ nome: nome })
      .then(() => {

        if (email != user.email) {

          user.updateEmail(email).then(() => {

            user.sendEmailVerification(); //email de verificação

            const alert = this.alertCtrl.create({
              title: 'Personal Information',
              message: 'You have been sucessufuly updated your personal information and an e-mail has been sent to you.',
              buttons: ['Back']
            });

            alert.present();

            this.afAuth.auth.signOut();
          }) //alterar o e-mail do usuário
            .catch((error) => {
              alert(error);
            })

        } else {

          const alert = this.alertCtrl.create({
            title: 'Personal Information',
            message: 'You have been sucessufuly updated your personal information.',
            buttons: ['Back']
          });

          alert.present();

          this.navCtrl.pop();

        }

      })
      .catch(function (error) {
        alert(error);
      });
  }

}
