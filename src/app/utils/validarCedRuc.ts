export class ValidarCedRuc {

  Verifica_Ruc(cedula: String, mensaje: string): boolean {
    cedula = cedula.trim();

    let resul: boolean;
    let documento: String;
    let tercer_digito: Number;
    let provincia: Number;
    let sucursal: Number;

    for(var i = 0; i < cedula.length; i++){
      if(!Number.isInteger(Number(cedula.charAt(i)))){
        mensaje = documento + " incorrecto";
        console.log(mensaje);
        return false;
      }
    }

    //Valido que tenga 10 o 13 digitos
    if (cedula.length != 10 && cedula.length != 13)
    {
        mensaje = documento + " incorrecto";
        console.log(mensaje);
        return false;
    }

    //Valido que los 2 primeros digitos deben ser un número deprovincia: provincia;
    if (provincia < 1 || provincia > 24)
    {
        mensaje = documento + " incorrecto";
        console.log(mensaje);
        return false;
    }

    //Valido que el tercer digito debe ser 6,9 o menor a 6
    tercer_digito = Number(cedula.substring(2, 1));

    if (tercer_digito > 6 && tercer_digito < 9)
    {
        mensaje = documento + " incorrecto";
        console.log(mensaje);
        return false;
    }

    //Valido que el numero de sucursal sea mayor a 0
    if (cedula.length == 13)
    {
        sucursal = Number(cedula.substring(cedula.length - 3, 3));

        if (sucursal <= 0)
        {
            mensaje = "Ruc incorrecto";
            console.log(mensaje);
            return false;
        }
    }

    switch (cedula.length)
    {
      case 10:
        documento = "Cédula";
        resul = this.Validar_modulo10(cedula);
        break;
      case 13:
        documento = "Ruc";
        switch (tercer_digito)
        {
          case 6:
          case 9:
              resul = this.Validar_modulo11(cedula, tercer_digito);
              break;
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
              resul = this.Validar_modulo10(cedula);
              break;
          default:
              resul = false;
              break;
        }
        break;
      default:
          resul = false;
          break;
    }
    if (!resul){
      mensaje = documento + documento.substring(documento.length - 1, 1) == "a" ? " incorrecta" : " incorrecto";
      return resul;
    }
  }

  private Validar_modulo10(Cedula: String): boolean{
    try
    {
        let coeficiente: Number[] = [2, 1, 2, 1, 2, 1, 2, 1, 2];
        let digito_verificador: Number = Number(Cedula.substring(9, 10));
        let digitos: String[] = [...Cedula.substring(0, 9)]; //Cedula.ToCharArray(0, 9);
        let resultado_verificador = 0;
        let suma = 0;
        let residuo = 0;
        let resultado = 0;
        let numero = 0;
        let contador = digitos.length;

        for (var _i = 0; _i < contador; _i++) {
          numero = Number(digitos[_i]);

          resultado = numero * Number(coeficiente[_i]);

          while (resultado > 9)
          {
              resultado = Number(resultado.toString().substring(0, 1)) + Number(resultado.toString().substring(1, 2));
          }

          suma = suma + resultado;
        }

        residuo = suma % 10;

        if (residuo == 0)
            resultado_verificador = residuo;
        else
            resultado_verificador = 10 - residuo;
        if (resultado_verificador == digito_verificador){
          return true;
        }
        else
          return false;
    }
    catch (err)
    {
      console.log(err);
    }
  }

  private Validar_modulo11(Ruc: String, tercer_digito: Number): boolean{
    try
    {
        let coeficiente6: Number[] = [3, 2, 7, 6, 5, 4, 3, 2];
        let coeficiente9: Number[] = [4, 3, 2, 7, 6, 5, 4, 3, 2];
        let coeficiente: Number[];
        let digitos: String[];
        let digito_verificador = 0;
        let resultado_verificador = 0;
        let suma = 0;
        let residuo = 0;
        let resultado = 0;
        let numero = 0;

        if (tercer_digito == 6)
        {
            digitos = [...Ruc.substring(0, 8)]; // Ruc.ToCharArray(0, 8);
            digito_verificador = Number(Ruc.substring(8, 9));
            coeficiente = coeficiente6;
        }
        else
        {
            digitos = [...Ruc.substring(0, 9)]; // Ruc.ToCharArray(0, 9);
            digito_verificador = Number(Ruc.substring(9, 10));
            coeficiente = coeficiente9;
        }

        for (var i = 0; i < digitos.length; i++)
        {
            numero = Number(digitos[i].toString());
            resultado = numero * Number(coeficiente[i]);
            suma = suma + resultado;
        }

        residuo = suma % 11;
        if (residuo == 0)
            resultado_verificador = residuo;
        else
            resultado_verificador = 11 - residuo;
        if (resultado_verificador == digito_verificador)
            return true;
        else{
          return false;
        }
    }
    catch (err)
    {
      console.log(err);
    }
  }
}

