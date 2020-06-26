import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITipoMovimiento } from '../models/ITipoMovimiento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoMovimientoService {
  private URL = "http://localhost:3700/api";

  constructor(
    private http: HttpClient
  ) { }

  addTipoMovimiento(tipoMovimiento: ITipoMovimiento){
    return this.http.post<ITipoMovimiento>(this.URL + "/tipo_movimiento", tipoMovimiento);
  }

  updateTipoMovimiento(tipoMovimiento: ITipoMovimiento){
    return this.http.put<ITipoMovimiento>(this.URL + "/tipo_movimiento/" + tipoMovimiento._id, tipoMovimiento);
  }

  getTipoMovimientos(){
    return this.http.get(this.URL + "/tipo_movimiento");
  }

  getTipoMovimientosBySigno(signo: string){
    return this.http.get(this.URL + "/tipo_movimiento/signo/" + signo);
  }

  getTipoMovimiento(_id: string): Observable<ITipoMovimiento> {
    return this.http.get<ITipoMovimiento>(this.URL + "/tipo_movimiento/" + _id);
  }

  delete(_id: string){
    return this.http.delete<any>(this.URL + "/tipo_movimiento/" + _id);
  }
}
