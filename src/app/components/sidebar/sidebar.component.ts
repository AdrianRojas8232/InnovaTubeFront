import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';
import { MessageService } from 'primeng/api'; 

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [MessageService]
})

export class SidebarComponent implements OnInit {
  public sidebarVisible: boolean = false;
  public usuarioGuardado = {
    usuario:"",
    correo:""
  };

  constructor(
    public LoginService: LoginService,
    private messageService: MessageService,
    private router: Router
  ){
  }

  ngOnInit(): void {}

  public mostrarMenu(): void{

    this.sidebarVisible = true;    
    console.log(this.usuarioGuardado);
    
    if(this.usuarioGuardado.usuario === ""){  
      const usuarioJson = localStorage.getItem('usuario') as string;    
      console.log(usuarioJson);
      this.usuarioGuardado = JSON.parse(usuarioJson);
      console.log(this.usuarioGuardado);
    }
    
  }
  public cerrarSesion2(){
    localStorage.removeItem('usuario');
    this.router.navigate(['']);

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
