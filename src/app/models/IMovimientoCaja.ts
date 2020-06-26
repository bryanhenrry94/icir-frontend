import { Iglesia } from './Iglesia';
import { Caja } from './Caja';
import { TipoMovimiento } from './TipoMovimiento';
import { Persona } from './Persona';

export interface IMovimientoCaja {
  _id: string;
  fecha: Date;
  iglesia: Iglesia;
  caja: Caja;
  signo: string;
  tipo_movimiento: TipoMovimiento;
  referencia: string;
  persona: Persona;
  valor: number;
}
