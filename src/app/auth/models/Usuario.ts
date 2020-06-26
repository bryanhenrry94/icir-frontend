import { IUsuario } from './IUsuario';

export class Usuario implements IUsuario{
  _id: string;
  usuario: string;
  contrasena: string;
  nombre: string;
  email: string;
  perfil: string;
  token: string;

  constructor(){ }
}
