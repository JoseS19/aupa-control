export interface Poligono {
    id_superficie: number;
    lote: number;
    area: number;
    punto: Coordenadas[];
    seccion: number;
    id_usuario: string;
    riego_disp?: number;
    riego_rest?: number;
    riego_usado?: number;
}

export interface Coordenadas {
    lat: number;
    lng: number;
}

