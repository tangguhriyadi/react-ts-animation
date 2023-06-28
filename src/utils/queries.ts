import { gql } from "@apollo/client";

export const GET_ANIME_LIST = gql`
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
                format
                type
                isLicensed
                isAdult
                startDate {
                    year
                    month
                    day
                }
                endDate {
                    year
                    month
                    day
                }
            }
        }
    }
`;

export const GET_ANIME_DETAIL = gql`
    query GetAnime($id: Int!) {
        Media(id: $id, type: ANIME) {
            id
            title {
                romaji
                english
                native
                userPreferred
            }
            coverImage {
                medium
                large
            }
            format
            episodes
            description
            bannerImage
            isLicensed
            meanScore
            popularity
            trending
            favourites
            type
            isAdult
            siteUrl
            startDate {
                year
                month
                day
            }
            endDate {
                year
                month
                day
            }
        }
    }
`;
