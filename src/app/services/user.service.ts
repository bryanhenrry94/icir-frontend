import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IUsuario } from '../auth/models/IUsuario';
import { Observable, BehaviorSubject } from 'rxjs';
import { Tipo_Accion } from '../models/Tipo_Accion';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = "http://localhost:3700/api";

  private tipo_accion = new BehaviorSubject<Tipo_Accion>(null);
  _accion$ = this.tipo_accion.asObservable();

  set_accion(tipo_accion: Tipo_Accion){
    this.tipo_accion.next(tipo_accion);
  }

  constructor(private http: HttpClient) { }

  addUser(user: IUsuario){
    return this.http.post<IUsuario>(this.URL + "/usuarios", user);
  }

  updateUser(user: IUsuario){
    return this.http.put<IUsuario>(this.URL + "/usuarios/" + user._id, user);
  }

  getUsers(){
    return this.http.get(this.URL + "/usuarios");
  }

  getUser(_id: string): Observable<IUsuario> {
    // Initialize Params Object
    let params = new HttpParams();

    // Begin assigning parameters
    params = params.set('_id', _id);

    console.log(_id);

    return this.http.get<IUsuario>(this.URL + "/usuarios/" + _id);
  }

  delete(_id: string){
    return this.http.delete<any>(this.URL + "/usuarios/" + _id);
  }
}
