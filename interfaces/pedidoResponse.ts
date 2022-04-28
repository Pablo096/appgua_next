export interface PedidoResponse {
    error:   boolean;
    codigo:  number;
    mensaje: string;
    objeto:  PedidoID;
}

export interface PedidoID {
    id: string;
}
