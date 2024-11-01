import { OrdenCompraArticulo } from "./orden-compra-articulo";

export interface OrdenCompra {
    id: number,
    fecha: string,
    precioTotal: number,
    estado: number,
    proveedorId: number,
    articulos: OrdenCompraArticulo[]
}

