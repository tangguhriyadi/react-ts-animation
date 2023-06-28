import { GET_ANIME_DETAIL } from "../../../utils/queries";
import { useQuery } from "@apollo/client";
import { AnimeDetailResponse, DetailResponse } from "../types";

interface Props {
    id?: string;
}

const useAnimeDetail = (props: Props):AnimeDetailResponse => {
    const { id } = props;
    const { loading, error, data } = useQuery<DetailResponse>(GET_ANIME_DETAIL, {
        variables: {
            id,
        },
    });
    return { loading, error, data };
};

export default useAnimeDetail;
