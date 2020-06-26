import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITipoMovimiento } from '../models/ITipoMovimiento';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tipo_Accion } from '../models/Tipo_Accion';

@Injectable({
  providedIn: 'root'
})
export class TipoMovimientoService {
  private URL = environment.baseURL;

  private tipo_accion = new BehaviorSubject<Tipo_Accion>(null);
  _accion$ = this.tipo_accion.asObservable();

  set_accion(tipo_accion: Tipo_Accion){
    this.tipo_accion.next(tipo_accion);
  }

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
