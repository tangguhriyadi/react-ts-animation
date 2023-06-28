import { ApolloError } from "@apollo/client";
import { Anime } from "../home/types";

export interface DetailResponse {
    Media: Anime;
}

export interface AnimeDetailResponse {
    loading: boolean;
    error?: ApolloError;
    data?: DetailResponse;
}
