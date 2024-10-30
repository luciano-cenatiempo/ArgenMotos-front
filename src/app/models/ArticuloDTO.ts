export interface ArticuloDTO {
    id: number,
    descripcion: string,
    precio: number,
    marca: string,
    modelo: string,
    anno: string
    stockActual: number,
    stockMinimo: number,
    stockMaximo: number,
}
