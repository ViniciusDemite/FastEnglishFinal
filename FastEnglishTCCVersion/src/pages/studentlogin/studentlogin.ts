import { Component } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';

//importar a página inicial do app (onde começam os conteusos do estudante)
import {HomeStudentPage} from  '../home-student/home-student';



/**
 * Generated class for the StudentloginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth'; //sao serviços
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'page-studentlogin',
  templateUrl: 'studentlogin.html',
})
export class StudentloginPage {

  constructor(public navCtrl: NavController, private  afAuth: AngularFireAuth , private alertCtrl: AlertController, private db: AngularFirestore) {
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

  // public recuperar_senha(form: NgForm): void{

  //   let email: string = form.value.email;

  //   let sub = this.db.collection('usuarios').doc<any>(this.afAuth.auth.currentUser.uid).valueChanges().subscribe((dadosUser) => {

  //     let email_estudante: string = dadosUser.email;

  //     if (email_estudante === email) {

  //       this.afAuth.auth.sendPasswordResetEmail(email);

  //       const alert = this.alertCtrl.create({
  //         title: 'E-mail sent',
  //         message: 'An reset password e-mail have been sent to your e-mail adress.',
  //         buttons: ['OK']
  //       });
  //       alert.present();

  //     } else {
  //       const alert = this.alertCtrl.create({
  //         title: 'Invalid e-mail',
  //         message: 'Your e-mail is not valid, please check if you typed it correctly.',
  //         buttons: ['Back']
  //       });
  //       alert.present();
  //     }
  //     sub.unsubscribe();
  //   });
  // }

  public login_estudante(form: NgForm): void{

    let email = form.value.email;
    let senha = form.value.senha;

    this.afAuth.auth.signInWithEmailAndPassword(email, senha)
      .then(() => {
          const alert = this.alertCtrl.create({
            message: 'Welcome Student',
            buttons: ['OK']
          });
          this.navCtrl.setRoot(HomeStudentPage);
          return alert.present();
        })
      .catch(() => {
          alert('User or Password not found');
        });

    this.navCtrl.push(HomeStudentPage);
  }
}
