import { ITipoMovimiento } from './ITipoMovimiento';

export class TipoMovimiento implements ITipoMovimiento{
  _id: string;
  signo: string;
  codigo: string;
  nombre: string;
}
