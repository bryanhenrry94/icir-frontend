import { ITipoMovimiento } from './ITipoMovimiento';
import { Caja } from './Caja';

export class TipoMovimiento implements ITipoMovimiento{
  _id: string;
  signo: string;
  codigo: string;
  nombre: string;
  cajas: Caja[];
}
