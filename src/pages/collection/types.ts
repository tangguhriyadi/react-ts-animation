import { Anime } from "../home/types";

export interface FormValues {
    title: string;
    description: string;
    id?:number;
}

export interface CollectionData extends FormValues {
    data?: Anime[] | [];
    id?: number
}