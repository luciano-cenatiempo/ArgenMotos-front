import { Empleado } from "src/app/models/Empleado";

export const empleadosLista: Empleado[] = [
    {   id: 1, nombre: 'Mabel', apellido: 'García', dni: '39555443', telefono: '1144223344', email: 'mabel@gmail.com', estado:0 },
    {   id: 2, nombre: 'Pedro', apellido: 'Sanchez', dni: '44455567', telefono: '1122223344', email: 'pedro@gmail.com', estado:0},
    {   id: 3, nombre: 'Juan', apellido: 'Perez', dni: '22334455', telefono: '1144332234', email: 'juan@gmail.com', estado:0},
    
]

// export interface Empleado{   
//     id: number | string;
//     nombre: string;
//     apellido: string;
//     dni: string;
//     telefono: string;
//     email: string;
//     estadoVendedor: string;
// }