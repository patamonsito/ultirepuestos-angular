export interface Product {
    id: string,
    Nombre: string,
    Apellido: string,
    Rut: string,
    Telefono: string,
    Correo: string,
    Avatar: string,
    Autos: object[],
    Favoritos: object[],
    CuponesDisponibles: object[],
    CuponesUsados: object[],
    Compras: object[],
    Direcciones: object[],
    CodeRef: string
}
