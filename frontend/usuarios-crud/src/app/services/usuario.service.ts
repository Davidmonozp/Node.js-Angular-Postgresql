import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';  

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api/data/';

  constructor(private http: HttpClient) { }


  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }


  agregarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  eliminarUsuario(id: string): Observable<any> {
    return this.http.delete(this.apiUrl + id)
  }

  obtenerUsuario(id: string): Observable<any> {
    return this.http.get(this.apiUrl + id);
  }

  editarUsuario(id: string, usuario: Usuario): Observable<any> {
    return this.http.put(this.apiUrl + id, usuario);
  }

}
