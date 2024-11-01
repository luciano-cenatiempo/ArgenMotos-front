import { OrdenCompraArticulo } from "./orden-compra-articulo";

export interface OrdenCompraDTO {
    fecha: Date | string,
    proveedorId: number,
    estado: number,
    articulos: OrdenCompraArticulo[]
}
