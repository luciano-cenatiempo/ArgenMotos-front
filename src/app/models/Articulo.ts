export interface Articulo {
    id: number,
    descripcion: string,
    precio: number,
    marca: string,
    modelo: string,
    anno: number
    stockActual: number,
    stockMinimo: number,
    stockMaximo: number,
}
