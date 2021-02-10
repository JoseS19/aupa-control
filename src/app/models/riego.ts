export interface Riego {
    id_riego?: number;
    cultivo: string;
    id_superficie: number;
    inicio: Date;
    ultima_mod: Date;
    total: number;
    restante: number;
}
