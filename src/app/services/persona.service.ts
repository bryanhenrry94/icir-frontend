import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPersona } from '../models/IPersona';
import { Observable, BehaviorSubject } from 'rxjs';
import { Tipo_Accion } from '../models/Tipo_Accion';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private URL = "http://localhost:3700/api";

  private tipo_accion = new BehaviorSubject<Tipo_Accion>(null);
  _accion$ = this.tipo_accion.asObservable();

  set_accion(tipo_accion: Tipo_Accion){
    this.tipo_accion.next(tipo_accion);
  }

  constructor(private http: HttpClient) { }

  addPersona(persona: IPersona){
    return this.http.post<IPersona>(this.URL + "/personas", persona);
  }

  updatePersona(persona: IPersona){
    return this.http.put<IPersona>(this.URL + "/personas/" + persona._id, persona);
  }

  getPersonas(){
    return this.http.get(this.URL + "/personas");
  }

  getPersona(_id: string): Observable<IPersona> {
    return this.http.get<IPersona>(this.URL + "/personas/" + _id);
  }

  delete(_id: string){
    return this.http.delete<any>(this.URL + "/personas/" + _id);
  }

  existeIdentificacion(identificacion: string): Observable<Boolean>{
    return this.http.get<Boolean>(this.URL + "/personas/existe_identificacion/" + identificacion);
  }
}
