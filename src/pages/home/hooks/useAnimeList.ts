import { gql, useQuery } from "@apollo/client";
import { Response } from "../types";

type Props = {
    page: number;
};

const useAnimeList = (props: Props) => {
    const { page } = props;

    const { loading, error, data } = useQuery<Response>(
        gql`
            query ($page: Int) {
                Page(page: $page, perPage: 10) {
                    pageInfo {
                        total
                        perPage
                        currentPage
                        lastPage
                        hasNextPage
                    }
                    media(type: ANIME) {
                        id
                        title {
                            romaji
                            english
                            native
                        }
                        coverImage {
                            medium
                            large
                        }
                    }
                }
            }
        `,
        {
            variables: {
                page,
            },
        }
    );

    return { loading, error, data };
};

export default useAnimeList;
