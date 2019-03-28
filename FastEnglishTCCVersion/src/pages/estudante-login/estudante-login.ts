import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { EstudanteHomePage } from '../estudante-home/estudante-home';

@Component({
  selector: 'page-estudante-login',
  templateUrl: 'estudante-login.html',
})
export class EstudanteLoginPage {

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private alertCtrl: AlertController) {
  }

  // método - caixa de mensagem
  public recuperar_senha(): void {

    const prompt = this.alertCtrl.create({

      message: "Informe seu e-mail e um código de verificação será enviado:",

      inputs: [{ name: 'email', placeholder: 'E-mail', type: "email" }],

      // botões
      buttons: [

        {
          text: 'Voltar',
          // handler: data => { console.log('Cancel clicked'); }
        },

        {
          text: 'Enviar',
          handler: data => {
            this.afAuth.auth.sendPasswordResetEmail(data.email);
            alert('E-mail enviado com sucesso');
            // console.log('Saved clicked');
          }
        }

      ] // fechamento - botões
    }); // fechamento - alert
    prompt.present();
  } // fechamento - prompt

  public login_estudante(form: NgForm): void {

    let email = form.value.email;
    let senha = form.value.senha;

    this.afAuth.auth.signInWithEmailAndPassword(email, senha)
      .then(() => {
        const alert = this.alertCtrl.create({
          message: 'Welcome Student',
          buttons: ['OK']
        });
        alert.present();

        this.navCtrl.setRoot(EstudanteHomePage);
      })
      .catch(() => {
        alert('User or Password not found');
      });
  }

}
