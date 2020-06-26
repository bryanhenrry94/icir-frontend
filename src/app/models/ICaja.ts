import { Usuario } from '../auth/models/Usuario';
import { Iglesia } from './Iglesia';

export interface ICaja {
  _id: string;
  iglesia: Iglesia;
  codigo: string;
  nombre: string;
  moneda: string;
  responsable: Usuario;
  estado: boolean;
}
