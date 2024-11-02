import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metodoPago'
})
export class MetodoPagoPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    switch(value){
      case 0: return "QR"; break;
      case 1: return "Tarjeta Debito";
      case 2: return "Tarjeta Credito"; break;
      case 3: return  "Mercado Pago"; break;
      case 4: return "Efectivo"; break;
      default: return "No definido"; break
    }
  }

}
