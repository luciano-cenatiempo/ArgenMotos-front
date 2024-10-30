import { Articulo } from "src/app/models/Articulo";


export const articulosLista: Articulo[] = [
    {   
        id: 1,
        descripcion: 'Yamaha YBR Z 125',
        precio: 3650000,
        marca: 'Yamaha',
        modelo: 'YBR Z',
        anno: "2024",
        stockActual: 1,
        stockMinimo: 1,
        stockMaximo: 3,
    },
    {   
        id: 2,
        descripcion: 'Yamaha XTZ 250',
        precio: 7650000,
        marca: 'Yamaha',
        modelo: 'XTZ',
        anno: "2024",
        stockActual: 0,
        stockMinimo: 1,
        stockMaximo: 2,
    },
    {   
        id: 3,
        descripcion: 'Zanella Ceccato 150',
        precio: 1650000,
        marca: 'Zanella',
        modelo: 'Ceccato',
        anno: "2018",
        stockActual: 1,
        stockMinimo: 1,
        stockMaximo: 1,
    },
    {   
        id: 4,
        descripcion: 'Zanella ZR 150',
        precio: 2650000,
        marca: 'Zanella',
        modelo: 'ZR',
        anno: "2024",
        stockActual: 1,
        stockMinimo: 0,
        stockMaximo: 1,
    }
    
]
