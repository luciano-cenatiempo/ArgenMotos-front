import { FacturaArticulo } from "./factura-articulo";

export interface FacturaDto {
    fecha: Date | string,
    clienteId: number,
    vendedorId: number,
    articulos: FacturaArticulo[]
}
