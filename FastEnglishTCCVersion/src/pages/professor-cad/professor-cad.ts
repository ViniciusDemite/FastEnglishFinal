import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { NgForm } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { ProfessorHomePage } from "../professor-home/professor-home";

// comentário
@Component({
  selector: "page-professor-cad",
  templateUrl: "professor-cad.html"
})
export class ProfessorCadPage {
  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public db: AngularFirestore
  ) {}

  public async cad_professor(form: NgForm) {
    let nome: string = form.value.nome;
    let email: string = form.value.email;
    let senha: string = form.value.senha;
    let identificador: string = form.value.profIdentificador;

    let professor: any = {
      nome: nome,
      email: email,
      identificador: identificador
    };

    if (identificador === "admProf2019") {
      let result = await this.afAuth.auth.createUserWithEmailAndPassword(
        email,
        senha
      );
      await result.user.updateProfile({ displayName: nome, photoURL: "" });
      await this.db
        .collection("usuarios")
        .doc(result.user.uid)
        .set(professor);

      const alert = this.alertCtrl.create({
        title: "Teacher registered",
        message: "You have been sucessufuly registerd.",
        buttons: ["Back"]
      });
      alert.present();
    } else {
      const alert = this.alertCtrl.create({
        title: "Invalid check",
        message: "Your check validator is not correct, please try again.",
        buttons: ["Back"]
      });
      alert.present();
    }
  }
}
