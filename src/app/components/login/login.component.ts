import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/service/login/login.service';
import { loginModel, registerModel, registroModelo } from'../../models/login';
import { MessageService } from 'primeng/api'; 
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl,AbstractControl, FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { CambiarContraseniaComponent } from './cambiar-contrasenia/cambiar-contrasenia.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]

})

export class LoginComponent implements OnInit {
  @ViewChild(CambiarContraseniaComponent) cambiarContrasenia!: CambiarContraseniaComponent;

  protected aFormGroup!: FormGroup;
  // Almacena las contraseñas comunes
  contraseniasComunes: Set<string> = new Set();



  @ViewChild('sidebar') sidebar: any;
  public robot!: boolean;
  public presionado!: boolean;
  public login: loginModel = { correo: '', contrasenia: '' };
  
  //Mandar al serivdor
  public registroService: registroModelo ={
    nombre_completo: '',
    contrasenia: '',
    correo_electronico: '',
    fecha_nacimiento: ''
  };

  public register: registerModel = {
    nombre: '',
    ap_paterno: '',
    ap_materno: '',
    correo_electronico: '',
    fecha_nacimiento: new Date() ,
    contrasenia: '',
    confirmarContrasenia: '',
    fecha_mod: new Date(),
    estatus:''
  };
  siteKey:string = '6LeaJmApAAAAAFok9WN2UVowSW46JREq3vYCO-Y3';

  // NUEVAS VARIABLES
  public loginVisible!: boolean;
  public registerVisible!: boolean;
  public botonRegistro!: string;

  constructor(
    private http: HttpClient,
    public LoginService: LoginService,
    private messageService: MessageService,
    private router: Router,
    private formBuilder: FormBuilder
    ){
    this.loginVisible = true;
    this.botonRegistro = "Registrar";

  }

  ngOnInit(): void {
    this.cargarContraseñasComunes();
    this.robot = true;
    this.presionado = false;
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required],
      nombre: ['', [Validators.required]],
      ap_paterno: ['', [Validators.required]],
      ap_materno: ['', [Validators.required]],
      correo_electronico: ['', [Validators.required, Validators.email]], // Validators.email para validar el formato de correo electrónico
      fecha_nacimiento: ['', Validators.required],
      contrasenia: ['', [Validators.required]],
      confirmarContrasenia: ['', [Validators.required]],
    });
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.router.navigate(['/home']);
    }
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

  public iniciarSesion(){
    try {
      this.LoginService.inicioDeSesion(this.login).subscribe(
        (data: any) => {
          console.log(data.status);
          console.log(data.mensaje);
          if(data.status === 2){
            this.cambiarContrasenia.abrirModal(data.mensaje, this.login);
          }else if(data.status === -1){
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.mensaje });
          }else {
                       
            this.messageService.add({ severity: 'success', summary: 'Success', detail: data.mensaje });
            localStorage.setItem('usuario', data.idUsuario);
            localStorage.setItem('rolUsuario', data.rolUsuario);
            localStorage.setItem('nombreRol', data.nombreRol);
            localStorage.setItem('nombreUsuario', data.nombreUsuario);

            this.router.navigate(['/home']);
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

  public registrarUsuario() {
    try {
      const resultadoValidacion = this.validarFormualrioRegistro();
      if (resultadoValidacion.valido){
        this.registroService.nombre_completo = `${this.register.nombre} ${this.register.ap_paterno} ${this.register.ap_materno}`;
        this.registroService.contrasenia = this.register.contrasenia;
        this.registroService.correo_electronico = this.register.correo_electronico;
        // Obtener fecha
        const year = this.register.fecha_nacimiento.getFullYear();
        const month = ('0' + (this.register.fecha_nacimiento.getMonth() + 1)).slice(-2); // Agrega un cero al mes si es necesario
        const day = ('0' + this.register.fecha_nacimiento.getDate()).slice(-2); // Agrega un cero al día si es necesario
        // Formatear la fecha como "YYYY-MM-DD"
        this.registroService.fecha_nacimiento = `${year}-${month}-${day}`;

        this.LoginService.registrarUsuario(this.registroService).subscribe(
          (data: any) => {
            if (data.estatus === -1) {
              console.log("entra aqui :(");
              this.messageService.add({ severity: 'error', summary: 'Error', detail: data.mensaje });
            }else {
              console.log("entra aqui :)");
              console.log(data);
              this.messageService.add({ severity: 'success', summary: 'Success', detail: data.mensaje });
              this.registerVisible = false;
              this.loginVisible = true;
            }
            console.log("entra aqui :D");
          },
          (error: any) => {
            console.error('Error:', error);
          }
        );
      }else{
        // Mostrar alerta con el mensaje de error
        this.messageService.add({ severity: 'error', summary: 'Error', detail: resultadoValidacion.mensaje });

      }
      
    } catch (error) {
      console.error('Error inesperado:', error);
    }
  }

  public limpiarFormularios(): void {
    this.register = {
      nombre: '',
      ap_paterno: '',
      ap_materno: '',
      correo_electronico: '',
      fecha_nacimiento: new Date() ,
      contrasenia: '',
      confirmarContrasenia: '',
      fecha_mod: new Date(),
      estatus:''
    };

    this.login= {
      correo: '', 
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
      this.login.correo &&
      emailPattern.test(this.login.correo) &&
      this.login.contrasenia
    ) return false;
    return true;
  }

  public get validarFormularioRegister(): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const correoPartes = this.register.correo_electronico.split('@');
    const correoUsuario = correoPartes[0]; 

    if (
      (
      this.aFormGroup.controls['recaptcha'].getRawValue()&&
      this.register.nombre &&
      this.register.ap_paterno &&
      this.register.ap_materno &&
      this.register.fecha_nacimiento &&
      this.register.correo_electronico &&
      emailPattern.test(this.register.correo_electronico) &&
      this.register.contrasenia )
    ) {
      return false;
    }

    return true;
  }


  validarFormualrioRegistro(): { valido: boolean, mensaje: string } {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const correoPartes = this.register.correo_electronico.split('@');
    const correoUsuario = correoPartes[0]; 
    let errorMessage = '';
    let estatus: boolean = true;

    if (!emailPattern.test(this.register.correo_electronico)) {
      errorMessage = 'Ingrese un correo electrónico válido.';
      estatus = false;
    } else if (!this.register.contrasenia) {
      errorMessage = 'Ingrese una contraseña.';
      estatus = false;
    } else if (!passwordPattern.test(this.register.contrasenia)) {
      errorMessage = 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y tener más de 7 caracteres.';
      estatus = false;
    } else if (this.register.contrasenia !== this.register.confirmarContrasenia) {
      errorMessage = 'Las contraseñas no coinciden.';
      estatus = false;
    }else if (this.contraseniasComunes.has(this.register.contrasenia)) {
      errorMessage = 'La contraseña no puede ser una contraseña común.';
      estatus = false;
    } else if (this.register.contrasenia.toLowerCase().includes(this.register.nombre.toLowerCase()) ||
               this.register.contrasenia.toLowerCase().includes(this.register.ap_paterno.toLowerCase()) ||
               this.register.contrasenia.toLowerCase().includes(this.register.ap_materno.toLowerCase()) ||
               this.register.contrasenia.toLowerCase().includes(correoUsuario.toLowerCase())) {
      errorMessage = 'La contraseña no puede contener su nombre, apellido, correo electrónico ni fecha de nacimiento.';
      estatus = false;
    } 
    return { valido: estatus, mensaje: errorMessage };
  }

  public emmiter(mensaje: string){
    
    this.limpiarFormularios();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: mensaje });

  }

}
