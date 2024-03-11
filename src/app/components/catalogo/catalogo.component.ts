import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoService } from '../../service/video/video.service';
import { MessageService } from 'primeng/api'; 

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
  providers: [MessageService]
})
export class CatalogoComponent implements OnInit {
  public listaUsuarios: any[] = [];
  public nombreUsuario: string = "";
  public nombreRol: string = "";
  public idRol: string = "";

  public buscar: String;
  constructor(
    private router: Router,
    private videoService: VideoService,
    private messageService: MessageService
  ){
    this.buscar ="";
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

    if (usuarioGuardado === null || this.idRol !== '1') {
      this.router.navigate(['']);
    }
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

  
}
