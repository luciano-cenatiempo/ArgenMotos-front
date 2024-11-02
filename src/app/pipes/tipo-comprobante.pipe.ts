import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoComprobante'
})
export class TipoComprobantePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if(value == 0){
      return 'Nota de débito'
    }else{
      return 'Nota de crédito'
    }
  }

}
