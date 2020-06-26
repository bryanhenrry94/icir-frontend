import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Caja } from '../models/Caja';
import { ICaja } from '../models/ICaja';
import { Observable, BehaviorSubject } from 'rxjs';
import { Tipo_Accion } from '../models/Tipo_Accion';

@Injectable({
  providedIn: 'root'
})
export class CajaService {
  private URL = "http://localhost:3700/api";

  private tipo_accion = new BehaviorSubject<Tipo_Accion>(null);
  _accion$ = this.tipo_accion.asObservable();

  set_accion(tipo_accion: Tipo_Accion){
    this.tipo_accion.next(tipo_accion);
  }

  constructor(
    private http: HttpClient
  ) { }

  addCaja(caja: ICaja){
    return this.http.post<ICaja>(this.URL + "/cajas", caja);
  }

  updateCaja(caja: ICaja){
    return this.http.put<ICaja>(this.URL + "/cajas/" + caja._id, caja);
  }

  getCajas(){
    return this.http.get(this.URL + "/cajas");
  }

  getCajasByIglesia(_id: String){
    return this.http.get(this.URL + "/cajas/iglesia/" + _id);
  }

  getCaja(_id: string): Observable<ICaja> {
   return this.http.get<ICaja>(this.URL + "/cajas/" + _id);
  }

  delete(_id: string){
    return this.http.delete<any>(this.URL + "/cajas/" + _id);
  }
}
