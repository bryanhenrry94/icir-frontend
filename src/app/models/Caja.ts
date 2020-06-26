import { ICaja } from './ICaja';
import { Iglesia } from './Iglesia';
import { Usuario } from '../auth/models/Usuario';

export class Caja implements ICaja {
  _id: string;
  iglesia: Iglesia;
  codigo: string;
  nombre: string;
  moneda: string;
  responsable: Usuario;
  estado: boolean;

  constructor(){
    this.iglesia = new Iglesia();
    this.responsable = new Usuario();
  }
}
