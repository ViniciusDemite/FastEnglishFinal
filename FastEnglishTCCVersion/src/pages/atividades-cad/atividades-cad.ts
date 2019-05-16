import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { NgForm } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
// import { AudioProvider } from '../../providers/audio/audio';
import { MediaObject, Media } from "@ionic-native/media";
import { File } from "@ionic-native/file";

@Component({
  selector: "page-atividades-cad",
  templateUrl: "atividades-cad.html"
})
export class AtividadesCadPage {
  public recording: boolean = false;
  public recorded: boolean = false;
  // public filePath : string         ;
  // public fileName : string         ;
  // public audio    : MediaObject    ;
  // public audioList: any[] = []     ;
  // public duracao  : number         ;
  // public path: string;
  // public docRef: string;
  // public referencia = firebase.storage().ref();

  public audio: MediaObject;
  public firebase;
  public filePath: string;
  public playingAudio: boolean; // indica se o áudio está sendo reproduzido
  public audioURL: string;
  public audioURI;
  public fileName;

  constructor(
    public navCtrl: NavController,
    public db: AngularFirestore,
    public alertCtrl: AlertController,
    private media: Media,
    private file: File
  ) {
    this.file.createDir(this.file.externalDataDirectory, "Audios", true);
  }

  public cad_atividade(form: NgForm): void {
    let titulo: string = form.value.titulo;
    let dataPostada: Date = form.value.dataPostada;
    let dataEntrega: Date = form.value.dataEntrega;
    let descricao: string = form.value.descricao;
    let ativa: boolean = form.value.ativa;

    let atividade: any = {
      nome: titulo,
      dataPostada: dataPostada,
      dataEntrega: dataEntrega,
      descricao: descricao,
      ativo: ativa
    };

    // this.referencia.child(this.filePath + this.fileName); // referencia para o caminho do arquivo
    // this.referencia.put(this.audio); // enviar o arquivo

    this.db
      .collection("atividades")
      .add(atividade)
      .then(ref => {
        this.db
          .collection("atividades")
          .doc(ref.id)
          .update({ id: ref.id, audio: this.filePath });

        // this.audioService.uploadAudio();

        this.navCtrl.pop();
      })
      .catch(error => {
        alert(error);
      });
  }

  public gravar(): void {
    const fileName =
      "audio" +
      new Date().getDate.toString() +
      new Date().getHours.toString() +
      new Date().getMinutes.toString() +
      new Date().getSeconds.toString() +
      ".3gp";
    // fileName.toString();
    this.filePath =
      this.file.externalDataDirectory.replace(/file:\/\//g, "") + fileName;
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
