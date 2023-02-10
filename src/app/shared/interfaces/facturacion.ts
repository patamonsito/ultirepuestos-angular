export interface Facturacion {
    _id?: string;
    id?: string;
    TipoDocumento?: boolean;
    RutEmpresa?: string;
    RazonSocial?: string;
    Correo?: string;
    Entrega: string;
    Nombre: string;
    Apellido: string;
    FormaEntrega: string;
    Agencia?: string;
    esOficina?: boolean;
    MetodoPago: string;
    Observaciones: string;
}
