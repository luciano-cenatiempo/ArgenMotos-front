import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado'
})
export class EstadoPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if(value == 0){
      return 'Activo'
    }else{
      return 'Inactivo'
    }
  }

}
