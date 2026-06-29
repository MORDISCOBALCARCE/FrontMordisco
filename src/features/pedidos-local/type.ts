// export interface Pedidos {
//     id_pedido: number
//     estado: string
//     modalidad: string
//     fecha_pedido: string
//     total: string
//     metodo_pago: string
//     estado_pago: string
//     direccion_entrega: string
//     observaciones: string
//     deletedAt: string
//     detalles: [
//         {
//             id_detalle: number
//             cantidad: number
//             precio_unitario: string
//             observaciones_pedido: any
//             producto: {
//                 id_producto: number
//                 nombre: string
//                 descripcion: string
//                 precio: string
//                 activo: boolean
//                 imagen: string
//                 tiempo_preparacion: number
//                 deletedAt: any
//             }
//         }
//     ]
//     usuario: {
//         id_usuario: number
//         nombre: string
//         apellido: string
//         telefono: string
//         activo: boolean
//     }
// }

export enum Estado {
  PENDIENTE = "pendiente",
  ACEPTADO = "aceptado",
  PREPARACION = "preparacion",
  ENTREGADO = "entregado",
  CANCELADO = "cancelado"
}

export interface Pedidos {
  id_pedido: number
  estado: Estado
  modalidad: string
  fecha_pedido: string
  total: string
  metodo_pago: string
  estado_pago: string
  direccion_entrega: string
  observaciones: string
  deletedAt: string
  detalles: Detalle[]
  usuario: Usuario
}

export interface Detalle {
  id_detalle: number
  cantidad: number
  precio_unitario: string
  observaciones_pedido: string
  producto: Producto
}

export interface Producto {
  id_producto: number
  nombre: string
  descripcion: string
  precio: string
  activo: boolean
  imagen: string
  tiempo_preparacion: number
  deletedAt: string
}

export interface Usuario {
  id_usuario: number
  nombre: string
  apellido: string
  telefono: string
  activo: boolean
}
