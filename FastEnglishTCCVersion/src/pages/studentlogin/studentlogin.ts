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

  public recuperar_senha(form: NgForm): void{

    let email: string = form.value.email;

    let sub = this.db.collection('usuarios').doc<any>(this.afAuth.auth.currentUser.uid).valueChanges().subscribe((dadosUser) => {

      let email_estudante: string = dadosUser.email;
      sub.unsubscribe();

      if (email_estudante === email) {

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

  public login_estudante(form: NgForm){

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

  }

}
