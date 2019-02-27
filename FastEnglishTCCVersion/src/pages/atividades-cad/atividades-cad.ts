import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-atividades-cad',
  templateUrl: 'atividades-cad.html',
})
export class AtividadesCadPage {

  public recording: boolean = false;
  public recorded: boolean = false;
  public filePath: string;
  public fileName: string;
  public audio: MediaObject;
  public audioList: any[] = [];

  constructor(public navCtrl: NavController, public db: AngularFirestore,
    public alertCtrl: AlertController) {
  }

  public cad_atividade(form: NgForm): void {

    let titulo: string = form.value.titulo;
    let dataPostada: Date = form.value.dataPostada;
    let dataEntrega: Date = form.value.dataEntrega;
    let descricao: string = form.value.descricao;
    let ativa: boolean = form.value.ativa;

    let atividade: any = {

      titulo:titulo,
      dataPostada:dataPostada,
      dataEntrega:dataEntrega,
      descricao:descricao,
      ativa:ativa

    }

    if (dataEntrega != dataPostada && dataEntrega < dataPostada) {

      this.db.collection('atividades').add(atividade)
        .then(() => {
          this.navCtrl.pop();
        })
        .catch((error) => {
          alert(error);
        });
      
    } else {
      
      const alert = this.alertCtrl.create({
        title: 'Check your dates',
        message: 'One of your dates is wrong, please check them.',
        buttons: ['Back']
      });
      alert.present();

    }
    
  }

  // private media: Media
  // private file: File
  // public start_audio(): void {
  //   this.fileName = 'record' + new Date().getTime() + '.3gp';
  //   this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
  //   this.audio = this.media.create(this.filePath);
  //   this.audio.startRecord();
  //   this.recording = true;
  // }

  // public stop_audio(): void {
  //   this.audio.stopRecord();
  //   // let data = { filename: this.fileName };
  //   // this.audioList.push(data);
  //   // localStorage.setItem("audiolist", JSON.stringify(this.audioList));
  //   this.recording = false;
  //   this.recorded = true;
  // }

  // public play_audio(): void {
  //   this.audio.play();
  //   this.audio.setVolume(1.0);
  // }

  /************** Exemplo funcional sauvar audio *********************/
  // Uri uriAudio = Uri.fromFile(new File(audioFilePath).getAbsoluteFile());
  // final StorageReference filePath = ref.child("Education/image").child(uriImage.getLastPathSegment());
  // final StorageReference audioRef = ref.child("Education/audio").child(uriAudio.getLastPathSegment());


  // // on success upload audio
  // audioRef.putFile(uriAudio).addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot> () {
  // @Override
  // public void onSuccess(final UploadTask.TaskSnapshot audioSnapshot) {

  //   //upload image
  //   filePath.putFile(uriImage).addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
  //                           @Override
  //   public void onSuccess(final UploadTask.TaskSnapshot imageSnapshot) {

  //     mProgress.dismiss();

  //     @SuppressWarnings("VisibleForTests") Uri audioUrl = audioSnapshot.getDownloadUrl();
  //     @SuppressWarnings("VisibleForTests") Uri imageUrl = imageSnapshot.getDownloadUrl();

}
