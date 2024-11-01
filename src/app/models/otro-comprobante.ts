export interface OtroComprobante {
    id: number,
    fecha: Date,
    facturaId:number,
    clienteId: number,
    vendedorId:number,
    descripcion:string
    tipo: number,
}
