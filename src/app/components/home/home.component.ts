import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoService } from '../../service/video/video.service';
import { MessageService } from 'primeng/api'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  public buscar: String;
  public arrayVideos: any = [];
  constructor(
    private router: Router,
    private videoService: VideoService,
    private messageService: MessageService,
  ){
    this.buscar = "";
  }

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado === null) {
      this.router.navigate(['']);
    }
    this.buscarVideo();
  }

  public buscarVideo():void {
    // this.buscar = "la pension";
    if(this.buscar === ""){
     this.messageService.add({key: 'bc', severity: 'info', summary: 'Info', detail: "Ingresa una busqueda" });
    }
    try{ 

      this.videoService.buscarVideo(this.buscar as string).subscribe(
        (data: any) => {
          this.arrayVideos = data.items;
            // console.log(this.arrayVideos);
            console.log(data.items[0].snippet);
            
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );

    } catch (error) {
      console.error('Error inesperado:', error);
      
    }  
  }

}
