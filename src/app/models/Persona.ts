import { IPersona } from './IPersona';

export class Persona implements IPersona{
  _id: string;
  tipo_identificacion: string;
  identificacion: string;
  nombres: string;
  apellidos: string;
  direccion: string;
  email: string;
  telefono: string;
}
