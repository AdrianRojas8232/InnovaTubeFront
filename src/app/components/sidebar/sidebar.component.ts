import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  public sidebarVisible: boolean = false;
  public usuarioGuardado = {
    usuario:"",
    correo:""
  };

  constructor(
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

  public cerrarSesion(){
    localStorage.removeItem('usuario');
    this.router.navigate(['']);
  }
}
