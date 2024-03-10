import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api'; 
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-cambiar-contrasenia',
  templateUrl: './cambiar-contrasenia.component.html',
  styleUrls: ['./cambiar-contrasenia.component.css'],
  providers: [MessageService]
})
export class CambiarContraseniaComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  public visible!: boolean;
  public contrasenia!: string;
  public confirmarContrasenia!: string;
  private correo!: string;
  contraseniasComunes: Set<string> = new Set();

  constructor(private messageService: MessageService, private http: HttpClient, private LoginService: LoginService){
    this.visible = false;
    this.contrasenia = "";
    this.confirmarContrasenia = "";
    this.correo = "";
  }
   
  ngOnInit(): void {
    this.cargarContraseñasComunes();
  }

  cargarContraseñasComunes() {
    this.http.get('assets/contras.txt', { responseType: 'text' }).subscribe(
      data => {
      
        const contraseñas = data.split('\n');
        contraseñas.forEach(contraseña => {
          // console.log(contraseña.trim());
          this.contraseniasComunes.add(contraseña.trim());
        });
      },
      error => {
        console.log('Error al cargar las contraseñas comunes:', error);
      }
    );
  }

  public abrirModal(mensaje: string, login: any){
    this.correo = login.correo;
    this.messageService.add({ severity: 'error', summary: 'Error', detail: mensaje });
    this.visible = true;
  }

  public cambiarContrasenia() {
    try {
      const resultadoValidacion = this.validarFormualrioRegistro();
      if (resultadoValidacion.valido){
        this.LoginService.cambiarContrasenia({contrasenia: this.contrasenia, correo: this.correo}).subscribe(
          (data: any) => {
            console.log(data);            
            if (data.estatus === -1) {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: data.mensaje });
            }else {
              this.visible = false;
              this.newItemEvent.emit(data.mensaje);
              
            }
            console.log("entra aqui :D");
          },
          (error: any) => {
            console.error('Error:', error);
          }
        );
      }else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: resultadoValidacion.mensaje });

      }
      
    } catch (error) {
      console.error('Error inesperado:', error);
    }
  }

  validarFormualrioRegistro(): { valido: boolean, mensaje: string } {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const correoPartes = this.correo.split('@');
    const correoUsuario = correoPartes[0]; 
    let errorMessage = '';
    let estatus: boolean = true;

    if (!passwordPattern.test(this.contrasenia)) {
      errorMessage = 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y tener más de 7 caracteres.';
      estatus = false;
    } else if (this.contrasenia !== this.confirmarContrasenia) {
      errorMessage = 'Las contraseñas no coinciden.';
      estatus = false;
    }else if (this.contraseniasComunes.has(this.contrasenia)) {
      errorMessage = 'La contraseña no puede ser una contraseña común.';
      estatus = false;
    } else if (this.contrasenia.toLowerCase().includes(correoUsuario.toLowerCase())) {
      errorMessage = 'La contraseña no puede contener el correo electrónico.';
      estatus = false;
    }
    return { valido: estatus, mensaje: errorMessage };
  }

  limpiarFormulario() {
    this.contrasenia = "";
    this.confirmarContrasenia = "";
  }
  
}
