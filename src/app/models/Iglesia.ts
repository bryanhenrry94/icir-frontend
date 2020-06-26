import { IIGlesia } from './IIglesia';

export class Iglesia implements IIGlesia{
  _id: string;
  nombre: string;
  codigo: Number;
  direccion: string;
  codigo_postal: Number;
  fecha_creacion: Date;
  pastor: string;
  email: string;
  telefono: string;
  whatsapp: string;
  website: string;
  facebook: string;
}
