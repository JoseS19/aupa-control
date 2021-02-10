export interface Superficie {
    id_superficie: number;
    lote: number;
    area: number;
    coords: string;
    seccion: number;
    id_usuario?: number;
    id_riego?: number;
    total?: number;
    restante?: number;
    riego_usado?: number;
    poligono?: Coordenadas[];
    centro?: Coordenadas;
    cultivo?: string;
    ultima_mod?: Date;

}

export interface Coordenadas {
    lat: number;
    lng: number;
}
