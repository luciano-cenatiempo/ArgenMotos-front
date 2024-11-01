import { Articulo } from "./Articulo";

export interface OrdenCompraArticulo {
    articuloId: number,
    articulo: Articulo,
    cantidad: number,
    precioUnitario:number,
}
