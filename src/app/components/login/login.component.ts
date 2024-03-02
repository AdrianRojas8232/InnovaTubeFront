import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login/login.service';
import { loginModel, registerModel } from'../../models/login';
import { MessageService } from 'primeng/api'; 
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// declare function iniciarSesion(): void;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]

})

export class LoginComponent implements OnInit {
  protected aFormGroup!: FormGroup;

  @ViewChild('sidebar') sidebar: any;
  public robot!: boolean;
  public presionado!: boolean;
  public login: loginModel = { usuario: '', contrasenia: '' };
  public register: registerModel = {
    nombre: '',
    ap_paterno: '',
    ap_materno: '',
    correo: '',
    contrasenia: '',
    confirmarContrasenia: ''
  };
  siteKey:string = '6LeaJmApAAAAAFok9WN2UVowSW46JREq3vYCO-Y3';

  // NUEVAS VARIABLES
  public loginVisible!: boolean;
  public registerVisible!: boolean;
  public botonRegistro!: string;
  

  constructor(
    public LoginService: LoginService,
    private messageService: MessageService,
    private router: Router,
    private formBuilder: FormBuilder
    ){
    this.loginVisible = true;
    this.botonRegistro = "Registrar";

  }

  ngOnInit(): void {
    this.robot = true;
    this.presionado = false;
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.router.navigate(['/home']);
    }
  }

  // public iniciarSesion(){
  //   try {
  //     this.LoginService.inicioDeSesion(this.login).subscribe(
  //       (data: any) => {
  //         if(data.status != 1){
  //           this.messageService.add({ severity: 'error', summary: 'Error', detail: data.mensaje });
  //         }
  //         if(data.status === 1){
  //           console.log(data);
  //           this.messageService.add({ severity: 'success', summary: 'Success', detail: data.mensaje });
  //           localStorage.setItem('usuario', JSON.stringify(data.data));
  //           this.router.navigate(['/home']);
  //         }
  //       },
  //       (error: any) => {
  //         console.error('Error:', error);
  //       }
  //     );
  //   } catch (error) {
  //     console.error('Error inesperado:', error);
      
  //   }  
  // }

  public registrarUsuario() {
    try {
      this.LoginService.registrarUsuario(this.register).subscribe(
        (data: any) => {
          if (data.status != 1) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.mensaje });
          }
          if (data.status === 1) {
            console.log(data);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: data.mensaje });
            this.registerVisible = false;
            this.loginVisible = true;
          }
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
    } catch (error) {
      console.error('Error inesperado:', error);
    }
  }

  public limpiarFormularios(): void {
    this.register = {
      nombre: '',
      ap_paterno: '',
      ap_materno: '',
      correo: '',
      contrasenia: '',
      confirmarContrasenia: ''
    };

    this.login= {
      usuario: '', 
      contrasenia: '' 
    };

  }

  public toggleSidebar(): void {
    this.limpiarFormularios();
    this.loginVisible = !this.loginVisible;
    this.registerVisible = !this.registerVisible;
    this.botonRegistro = this.loginVisible? 'Registrar': 'Iniciar session';

  }
  

  public get validarFormularioLogin(): boolean{
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(
      this.login.usuario &&
      emailPattern.test(this.login.usuario) &&
      this.login.contrasenia
    ) return false;
    return true;
  }

  public get validarFormularioRegister(): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (
      this.aFormGroup.controls['recaptcha'].getRawValue()&&
      this.register.nombre &&
      this.register.ap_paterno &&
      this.register.ap_materno &&
      this.register.correo &&
      emailPattern.test(this.register.correo) &&
      this.register.contrasenia &&
      passwordPattern.test(this.register.contrasenia) &&
      this.register.contrasenia === this.register.confirmarContrasenia
    ) {
      return false;
    }

    return true;
  }

}
