export interface Estructura {
    id_estructura: number;
    nombre: string;
    marca: string;
    nombre_marca?: string;
    precio: number;
    garantia: string;
    origen: string;
    nombre_origen?: string;
    image: string | ArrayBuffer | null;
    ficha_tecnica_pdf: string;
    activo: boolean;
}
