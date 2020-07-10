import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoMovimientoFilter'
})
export class TipoMovimientoFilterPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const result = [];

    for(const item of value){
      //console.log(item);

      if(item.indexOf(args) > -1){
        result.push(item);
      }
    }

    return result;
  }

}
