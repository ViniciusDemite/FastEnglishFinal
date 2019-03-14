import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-estudante-profile',
  templateUrl: 'estudante-profile.html',
})
export class EstudanteProfilePage {

  public usuario: any = {};

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public db: AngularFirestore, public alertCtrl: AlertController) {

    // let user = this.afAuth.auth.currentUser;

    let sub = this.db.collection('usuarios').doc(this.afAuth.auth.currentUser.uid).valueChanges()
      .subscribe((user) => {
        this.usuario = user;
        sub.unsubscribe();
      });

  }

  public async editar_dados_estudante(form: NgForm) {
    let nome = form.value.nome;
    let email = form.value.email;

    let user = this.afAuth.auth.currentUser;
    let credencial: any = null;

    await this.db.collection('usuarios').doc(user.uid).update({nome: nome})
      .then(() => {

        if(email != user.email){

          // const prompt = this.alertCtrl.create({

          //   title: "Authenticate student",

          //   message: "Provide your e-mail and password again to change your e-mail.",

          //   inputs: [
          //     { name: 'email', placeholder: 'E-mail', type: 'email' },
          //     { name: 'password', placeholder: 'Password', type: 'password' }
          //   ],

          //   // botões
          //   buttons: [

          //     { text: 'Voltar' },

          //     {
          //       text: 'Enviar',

          //       handler: data => {

          //         let cEmail = data.email;
          //         let cPassword = data.password;

          //         credencial = {
          //           cEmail,
          //           cPassword
          //         };

          //         user.reauthenticateAndRetrieveDataWithCredential(credencial)
          //           .then(() => {
                      
          //           })

          //       }
          //     }
          //   ] // fechamento - botões
          // }); // fechamento - alert

          // prompt.present();

          user.updateEmail(email).then(() => {

            //user.sendEmailVerification(); //email de verificação

            const alert = this.alertCtrl.create({
              title: 'Personal Information',
              message: 'You have been sucessufuly updated your personal information and an e-mail has been sent to you.',
              buttons: ['Back']
            });

            alert.present();

            this.navCtrl.pop();
          }) //alterar o e-mail do usuário
          .catch((error) => {
            alert(error);
          })

        }else {

          const alert = this.alertCtrl.create({
            title: 'Personal Information',
            message: 'You have been sucessufuly updated your personal information.',
            buttons: ['Back']
          });

          alert.present();

          this.navCtrl.pop();

        }

      })
      .catch(function(error) {
        alert(error);
      });

  }

}
