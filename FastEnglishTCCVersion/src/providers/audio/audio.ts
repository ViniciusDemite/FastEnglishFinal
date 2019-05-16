import { Injectable         }               from '@angular/core'                   ;
import { Media              , MediaObject } from '@ionic-native/media'             ;
import { File               }               from '@ionic-native/file'              ;
import { FileTransfer } from "@ionic-native/file-transfer/ngx" ;
import { NavController      }               from 'ionic-angular'                   ;

@Injectable()
export class AudioProvider {

  public audio        : MediaObject;
  public firebase                  ;
  public filePath     : string     ;
  public playingAudio : boolean     ; // indica se o áudio está sendo reproduzido
  public audioURL     : string     ;
  public audioURI                  ;
  public fileName                  ;
  // private arquivo      : File;
  //private recording    : boolean; // inidica se o áudio está sendo gravado
  //private audioReady   : boolean; // inidica que o áudio está pronto
  // private duration     : number;
  // private audioURLReady: boolean
  // private audioURIReady: boolean;
  

  constructor(private media: Media, private file: File, public navCtrl: NavController) {
    // this.fileName = 'audio' + new Date().getDate + new Date().getHours + new Date().getMinutes + new Date().getSeconds + '.3gp';
  }

  // public get AudioReady() : boolean {
    //   return this.audioReady;
    // }
    
  // public set AudioReady(v : boolean) {
  //   this.audioReady = v;
  // }
  
  public startRecording(): void {
    // this.recording = true;
    const fileName = 'audio' + new Date().getDate + new Date().getHours + new Date().getMinutes + new Date().getSeconds + '.3gp';
    this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + fileName;
    // this.file.createDir(this.file.dataDirectory, 'Audios', true);
    this.audio = this.media.create(this.filePath);
    this.audio.startRecord();
    // return this.filePath;
    // this.file.createFile(this.file.tempDirectory, 'my_file.m4a', true).then(() => {
    //   const audio: MediaObject = this.media.create(this.file.getDirectory().replace(/^file:\/\//, '') + 'my_file.m4a');
    //   this.audio = audio; // a variável global audio recebe a constante local audio
    //   this.audio.startRecord(); // inicia a gravação do áudio
      // this.listenToAudioEvents(); // chama o método para ouvir o áudio
      // window.setTimeout(() => {
      //   if (this.recording) this.stopRecording(); // para a gravação do áudio se a váriavel ainda indicar que está dentro desse método
      // }, 10000);
    // });
  }

  /*public listenToAudioEvents(): void {
    this.audio.onStatusUpdate.subscribe(status => {
      if (status == 4 && this.playingAudio) {
        this.stopPlayback(); // chama o método para parar de reproduzir o áudio
      }
    });
  }*/

  public stopRecording(): string {
    this.audio.stopRecord(); // para de gravar o áudio
    return this.filePath;
    // this.recording = false;
    // this.audioReady = true;
    // this.audio.getDuration(); // pega a duração do áudio
  }

  public playAudio(): void {
    this.playingAudio = true;
    this.audio.play(); // inicia a reprodução do áudio
  }

  public stopPlayback(): void {
    this.playingAudio = false;
    this.audio.stop(); // para de reprozuir o áudio
  }

  /*public uploadAudio(): void {
    this.storeRecord().subscribe((downloadURL) => {
      this.audioURL = downloadURL; // atribui o link para o download do áudio para a váriavel global audioURL 
      // this.audioURLReady = true;
      this.navCtrl.pop();
    });
  }*/

  /*public storeRecord(): Observable<any> {
    return Observable.create((observer) => {
      const filePath = `${this.file.tempDirectory}my_file.m4a`;
      const readFile: any = window['resolveLocalFileSystemURL'];
      return readFile(filePath, (fileEntry) => {
        return fileEntry.file((file) => {
          const fileReader = new FileReader();
          fileReader.onloadend = (result: any) => {
            let arrayBuffer = result.target.result;
            let blob = new Blob([new Uint8Array(arrayBuffer)], { type: 'audio/m4a' });
            var storageRef = firebase.storage().ref('content/' + this.firebase.user.uid + '/my-file.m4a');
            console.log("Storage reference is " + storageRef);
            var uploadTask = storageRef.put(blob); // envia o arquivo em formato de bits para o storage
            console.log('Upload started:');
            uploadTask.on('state_changed', (snapshot) => {
              // recebe um porcentagem do progresso do upload
              let percent = uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes * 100;
              console.log(percent + "% done");
            }, (e) => {
              // console.error(e);
              observer.error(e);
            }, () => {
              var downloadURL = uploadTask.snapshot.downloadURL; // a variável recebe a url de download para passa-lá no método uploadRecord()
              observer.next(downloadURL);
            });
          };
          fileReader.onerror = (e: any) => {
            // console.error(e);
            observer.error(e);
          };
          fileReader.readAsArrayBuffer(file);
        }, (e) => {
          // console.error(e);
          observer.error(e);
        });
      }, (e) => {
        // console.error(e);
        observer.error(e);
      });
    });
  }*/

  public downloadAudio(): void {
    // const fileTransfer: FileTransferObject = this.fileTransfer.create();
    // // var destPath = (cordova.file.externalDataDirectory || cordova.file.dataDirectory) + "my_file.m4a"
    // var destPath = (this.file.externalDataDirectory || this.file.dataDirectory) + "my_file.m4a"
    // fileTransfer.download(this.audioURL, destPath).then((entry) => {
    //   let rawAudioURI = entry.toURL();
    //   this.audioURI = rawAudioURI.replace(/^file:\/\//, '/private');
    //   // this.audioURIReady = true;
    // }, (error) => {
    //   alert(error);
    // });
  }

  public playAudioURI(audioPath: string): void {
    let downloadedAudio: MediaObject = this.media.create(audioPath);
    downloadedAudio.play();
  }

}
