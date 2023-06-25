import { useQuery } from "@apollo/client";
import { Response } from "../types";
import { GET_ANIME_LIST } from "../../../utils/queries";

interface Props {
    page: number;
};

const useAnimeList = (props: Props) => {
    const { page } = props;

    const { loading, error, data } = useQuery<Response>(GET_ANIME_LIST, {
        variables: {
            page,
        },
    });

    return { loading, error, data };
};

export default useAnimeList;
