import { Injectable } from '@angular/core';
import { IMovimientoCaja } from '../models/IMovimientoCaja';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimientoCajaService {
  private URL = "http://localhost:3700/api";

  constructor(
    private http: HttpClient
  ) { }

  addMovimientoCaja(iglesia: IMovimientoCaja){
    return this.http.post<IMovimientoCaja>(this.URL + "/movimiento_caja", iglesia);
  }

  updateMovimientoCaja(iglesia: IMovimientoCaja){
    return this.http.put<IMovimientoCaja>(this.URL + "/movimiento_caja/" + iglesia._id, iglesia);
  }

  getMovimientoCajas(){
    return this.http.get(this.URL + "/movimiento_caja");
  }

  getMovimientoCaja(_id: string): Observable<IMovimientoCaja> {
    return this.http.get<IMovimientoCaja>(this.URL + "/movimiento_caja/" + _id);
  }

  delete(_id: string){
    return this.http.delete<any>(this.URL + "/movimiento_caja/" + _id);
  }
}
