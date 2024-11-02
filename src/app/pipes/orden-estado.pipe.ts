import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenEstado'
})
export class OrdenEstadoPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    switch(value){
      case 0: return "Pendiente"; break;
      case 1: return "Aprobada"; break;
      case 2: return "Rechazada"; break;
      case 3: return  "Cancelada"; break;
      case 4: return "Completa"; break;
      default: return "No definido"; break
    }
  }

}
