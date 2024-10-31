import { FacturaArticulo } from "./factura-articulo";

export interface Factura {
    id: number,
    fecha: string,
    precioFinal: number,
    clienteId: number,
    vendedorId: number,
    articulos: FacturaArticulo[]
}
