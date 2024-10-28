export interface Empleado {
    id: number;
    dni: string;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    estado: number;
}

export enum EstadoVendedor
{
    Activo,
    Inactivo,
    Suspendido
}