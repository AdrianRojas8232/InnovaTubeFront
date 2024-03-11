import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../assets/enviroments';
import { loginModel, registerModel, registroModelo } from'../../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public inicioDeSesion(login: loginModel): Observable<any> {
    
    return this.http.post(`${this.apiUrl}/login/iniciarSesion`, login).pipe(
      catchError(error => {
        console.error('Error en el servicio:', error);
        return throwError(error);
      })
    );
  }

  public cambiarContrasenia(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/cambiarContrasenia`, data).pipe(
      catchError(error => {
        console.error('Error en el servicio:', error);
        return throwError(error);
      })
    );
  }

  public registrarUsuario(register: registroModelo): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/registrar`, register).pipe(
      catchError(error => {
        console.error('Error en el servicio:', error);
        return throwError(error);
      })
    );
  }

  public cerrarSesion(idUsuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/cerrarSesion`, idUsuario).pipe(
      catchError(error => {
        console.error('Error en el servicio:', error);
        return throwError(error);
      })
    );
  }

}
