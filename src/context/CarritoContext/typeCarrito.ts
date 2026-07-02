import type { Productos } from "../../types/type";

export enum Estado {
  PENDIENTE = "pendiente",
  ACEPTADO = "aceptado",
  PREPARACION = "preparacion",
  ENTREGADO = "entregado",
  CANCELADO = "cancelado"
}

export enum ModoRetiro {
  RETIRO = "retiro",
  ENVIO = "envio", // Ojo, acá pusiste "envio" en el back y "delivery" en tu tipo viejo, usá el del back!
}

export enum MetodoPago {
  EFECTIVO = "efectivo",
  TARJETA = "tarjeta",
  MERCADOPAGO = "mercadopago",
  TRANSFERENCIA = "transferencia"
}

export enum EstadoDePago {
  PENDIENTE = "pendiente",
  ABONADO = "abonado",
  RECHAZADO = "rechazado"
}

export interface ItemCarrito {
  producto: Productos,
  cantidad: number,
  observaciones?: string
}

export interface DetallesPedido {
  cantidad: number;
  precio_unitario: number;
  observaciones_pedido?: string;
  producto_id: number 
}

export interface createPedido {
  estado: Estado;           
  modalidad: ModoRetiro;      
  total: number;
  metodo_pago: MetodoPago;
  estado_pago: EstadoDePago;  
  direccion_entrega: string;
  observaciones: string;
  usuario: number ;
  detalles: DetallesPedido[];
}

export interface CarritoContextType {
  carrito: ItemCarrito[];
  agregarAlCarrito: (producto: Productos, cantidad?: number, observaciones?: string) => void;
  eliminarDelCarrito: (id: number) => void;
  limpiarCarrito: () => void;
  totalPrecio: number;
}