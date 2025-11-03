export interface Panel {
    id_panel: number;
    nombre: string;
    marca: string;
    nombre_marca?: string;
    origen: string;
    nombre_origen?: string;
    potencia: number | string;
    precio: number | string;
    garantia: string;
    isc: string;
    voc: string;
    vmp: string;
    image?: string | ArrayBuffer | null;
    imagen_url?: string;
    ficha_tecnica_pdf: string;
    activo: boolean;
}
