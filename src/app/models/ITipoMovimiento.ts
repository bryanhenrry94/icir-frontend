import { Caja } from './Caja';

export interface ITipoMovimiento {
  _id: string;
  signo: string;
  codigo: string;
  nombre: string;
  cajas: Caja[];
}
