export interface Cliente{   
    id: number ;
    nombre: string;
    apellido: string;
    dni: string;
    tipo: TipoCliente;
    telefono: string;
    email: string;
    domicilio: string;
    estado: number
}

export enum TipoCliente {
    Regular = 0,
    Mayorista = 1,
}