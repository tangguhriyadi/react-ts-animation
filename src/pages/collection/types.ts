import { Anime } from "../home/types";

export interface FormValues {
    title: string;
    description: string;
}

export interface CollectionData extends FormValues {
    data?: Anime[] | [];
}