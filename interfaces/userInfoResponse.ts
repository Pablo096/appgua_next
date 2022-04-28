export interface UserInfoResponse {
    error:   boolean;
    codigo:  number;
    mensaje: string;
    objeto:  Usuario;
}

export interface Usuario {
    idUsuario:            string;
    nombre:               string;
    descuento:            number;
    descuentoRef:         number;
    promocionesAplicadas: any[];
    porcentaje:           boolean;
    direcciones:          Direccion[];
    productos:            Producto[];
}

export interface Direccion {
    lng:                  number;
    predeterminado:       boolean;
    fechaDeModificacion?: Fecha;
    fechaCreacion:        Fecha;
    referencia:           string;
    id:                   string;
    alias:                string;
    direccion:            string;
    lat:                  number;
}

export interface Fecha {
    _seconds:     number;
    _nanoseconds: number;
}

export interface Producto {
    price:      number;
    id:         number;
    activo:     boolean;
    idEmpresa:  string;
    name:       string;
    promocion?: boolean;
    list_price: number;
    fechaFin:   Fecha;
    points:     number;
}
