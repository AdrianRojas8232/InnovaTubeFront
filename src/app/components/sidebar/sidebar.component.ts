import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';
import { MessageService } from 'primeng/api'; 
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [MessageService]
})

export class SidebarComponent implements OnInit {
  public nombreUsuario: string = "";
  public nombreRol: string = "";
  public idRol: string = "";

  public sidebarVisible: boolean = false;

  constructor(
    public LoginService: LoginService,
    private messageService: MessageService,
    private router: Router
  ){
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

  }

  public mostrarMenu(): void{
    this.sidebarVisible = true;    
  }
  public ocultarMenu(): void{
    this.sidebarVisible = false;    
  }
  public irRuta(ruta:string){
    this.router.navigate([ruta]);
    this.ocultarMenu();
  }

  public cerrarSesion(){
    try {
      const usuarioGuardado = localStorage.getItem('usuario');
      if (usuarioGuardado) {
        this.LoginService.cerrarSesion({idUsuario:usuarioGuardado}).subscribe(
          (data: any) => {
              if(data.status === -1){
                this.messageService.add({ severity: 'error', summary: 'Error', detail: data.mensaje });
              }else{
                localStorage.removeItem('usuario');
                this.router.navigate(['']);
              }
          },
          (error: any) => {
            console.error('Error:', error);
          }
        );
      } else {
        console.log('No hay usuario almacenado en el localStorage');
      }
    } catch (error) {
      console.error('Error inesperado:', error);
    }
  }
  
}
