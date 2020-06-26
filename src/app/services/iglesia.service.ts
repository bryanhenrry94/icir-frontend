import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IIGlesia } from '../models/IIglesia';
import { Tipo_Accion } from '../models/Tipo_Accion';

@Injectable({
  providedIn: 'root'
})
export class IglesiaService {
  private URL = "http://localhost:3700/api";

  private tipo_accion = new BehaviorSubject<Tipo_Accion>(null);
  _accion$ = this.tipo_accion.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  set_accion(tipo_accion: Tipo_Accion){
    this.tipo_accion.next(tipo_accion);
  }

  addIglesia(iglesia: IIGlesia){
    return this.http.post<IIGlesia>(this.URL + "/iglesias", iglesia);
  }

  updateIglesia(iglesia: IIGlesia){
    return this.http.put<IIGlesia>(this.URL + "/iglesias/" + iglesia._id, iglesia);
  }

  getIglesias(){
    return this.http.get(this.URL + "/iglesias");
  }

  getIglesia(_id: string): Observable<IIGlesia> {
    return this.http.get<IIGlesia>(this.URL + "/iglesias/" + _id);
  }

  delete(_id: string){
    return this.http.delete<any>(this.URL + "/iglesias/" + _id);
  }
}
