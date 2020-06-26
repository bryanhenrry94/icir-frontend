import { IMovimientoCaja } from './IMovimientoCaja';
import { Iglesia } from './Iglesia';
import { Caja } from './Caja';
import { TipoMovimiento } from './TipoMovimiento';
import { Persona } from './Persona';

export class MovimientoCaja implements IMovimientoCaja{
  _id: string;
  fecha: Date;
  iglesia: Iglesia;
  caja: Caja;
  signo: string;
  tipo_movimiento: TipoMovimiento;
  referencia: string;
  persona: Persona;
  valor: number;

  constructor(){
    this.iglesia = new Iglesia();
    this.caja = new Caja();
    this.persona = new Persona();
    this.tipo_movimiento = new TipoMovimiento();
  }
}
