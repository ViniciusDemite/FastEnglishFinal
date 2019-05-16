import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AudioProvider } from '../../providers/audio/audio';

@Component({
  selector: 'page-estudante-atividades',
  templateUrl: 'estudante-atividades.html',
})
export class EstudanteAtividadesPage {

  public lista     : Observable<any> ;
  public atividade : any = {}        ;
  public recording : boolean = false ;
  public recorded  : boolean = false ;
  // public path      : string          ;
  public audioPath : string          ;
  // public filePath  : string                   ;
  // public fileName  : string                   ;
  // public audio     : MediaObject              ;
  
  // public audioList : any[] = []               ;
  // public referencia = firebase.storage().ref();

  public playingAudio: boolean; // indica se o áudio está sendo reproduzido
  public audioURL: string;
  public audioURI;
  public fileName;

  constructor(public navCtrl: NavController, public db: AngularFirestore, public afAuth: AngularFireAuth, public alertCtrl: AlertController, private media: Media, private file: File) {

    this.lista = db.collection('atividades').valueChanges();
    this.lista.subscribe((sub) => {
      sub.audio = this.audioPath;
      sub.unsubscribe();
    });
    // this.audioService.downloadAudio();

  }

  public responder(id: string): void {
    this.db.collection('Atividades').doc('id').update({audioAluno: this.filePath});

    // this.audioService.uploadAudio();

    /*this.referencia.child(this.filePath + this.fileName); // referencia para o caminho do arquivo
    this.referencia.put(this.audio); // enviar o arquivo

    this.navCtrl.pop();*/

  }

  public audioAtividade(): void {
    let downloadedAudio: MediaObject = this.media.create(this.audioPath);
    downloadedAudio.play();
  }

  // public responder_atividade(id: string): void {
  //   let sub = this.db.collection('atividades').doc(id).valueChanges()
  //   .subscribe((atv) => {
  //     this.atividade = atv;
  //     sub.unsubscribe();
  //   })
  // }

  public gravar(): void {
    const fileName = 'audio' + new Date().getDate + new Date().getHours + new Date().getMinutes + new Date().getSeconds + '.3gp';
    this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + fileName;
    this.audio = this.media.create(this.filePath);
    this.recording = true;
    this.audio.startRecord();
    // this.audioService.startRecording();

    /*this.fileName = 'record' + new Date().getTime + '.3gp';
    this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
    this.audio = this.media.create(this.filePath);
    this.audio.startRecord();
    this.recording = true;*/
  }

  public pararGravar() {
    this.recording = false;
    this.recorded = true;
    this.audio.stopRecord(); // para de gravar o áudio
    // this.path = this.audioService.stopRecording();

    // this.duracao = this.audioService.stopRecording();
    /*this.audio.stopRecord();
    this.recording = false;
    ths.recorded = true;*/
  }

  public reproduzir(): void {
    this.playingAudio = true;
    this.audio.play(); // inicia a reprodução do áudio
    /*this.audio.play();
    this.audio.setVolume(1.0);*/
  }
}
