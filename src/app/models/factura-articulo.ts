import { Articulo } from "./Articulo";

export interface FacturaArticulo {
    articuloId: number,
    articulo: Articulo,
    cantidad: number,
    precioUnitario:number,
}
