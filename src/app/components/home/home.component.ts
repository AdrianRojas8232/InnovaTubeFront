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
  public listaUsuarios: any[] = [];
  public nombreUsuario: string = "";
  public nombreRol: string = "";
  public idRol: string = "";

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

    const nombreUsuarioLocal = localStorage.getItem('nombreUsuario');
    const nombreRolLocal = localStorage.getItem('nombreRol');
    const idRolLocal = localStorage.getItem('rolUsuario');
    if (nombreUsuarioLocal !== null && nombreRolLocal !== null && idRolLocal!==null) {
      this.nombreUsuario = nombreUsuarioLocal.toString();
      this.nombreRol = nombreRolLocal.toString();
      this.idRol = idRolLocal.toString();
    }

    if (usuarioGuardado === null) {
      this.router.navigate(['']);
    }
    this.buscarVideo();
    this.obtenerListaUsuarios();
  }


  public obtenerListaUsuarios() {
    try {
      this.videoService.obtenerListaUsuarios().subscribe(
        (data: any) => {
          this.listaUsuarios = data.usuarios;
        },
        (error: any) => {
          console.error('Error al obtener la lista de usuarios:', error);
        }
      );
    } catch (error) {
      console.error('Error inesperado:', error);      
    }  
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
