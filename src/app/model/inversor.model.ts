export interface Inversor {
    id_inversor: number;
    nombre: string;
    marca: string;
    nombre_marca?: string;
    origen: string;
    nombre_origen?: string;
    potencia: number;
    precio: number;
    garantia: string;
    pmin: string;
    pmax: string;
    vmin: string;
    vmax: string;
    isc: string;
    image?: string | ArrayBuffer | null;
    imagen_url?: string;
    ficha_tecnica_pdf: string;
    activo: boolean;
}
