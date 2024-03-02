import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../assets/enviroments';
import { loginModel, registerModel } from'../../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public inicioDeSesion(login: loginModel): Observable<any> {
    
    return this.http.post(`${this.apiUrl}/login`, login).pipe(
      catchError(error => {
        console.error('Error en el servicio:', error);
        return throwError(error);
      })
    );
  }

  public registrarUsuario(register: registerModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/registrar`, register).pipe(
      catchError(error => {
        console.error('Error en el servicio:', error);
        return throwError(error);
      })
    );
  }

}
