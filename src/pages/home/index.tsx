import React, { useState, useMemo } from "react";
import useAnimeList from "./hooks/useAnimeList";
import { css } from "@emotion/react";
import Pagination from "./components/Pagination";

const Home: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const { error, loading, data } = useAnimeList({ page });

    const currentPage = useMemo(() => {
        if (!data) return 1;
        return data?.Page.pageInfo.currentPage;
    }, [data]);

    const totalPage = useMemo(() => {
        if (!data) return 1;
        return data?.Page.pageInfo.total;
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error </p>;

    const handlePageChange = (selected: number) => {
        setPage(selected);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPage) {
            setPage(currentPage + 1);
        }
    };

    return (
        <div>
            <h1>Anime List</h1>
            <ul>
                {data &&
                    data?.Page.media.map((anime) => (
                        <li key={anime.id}>
                            <img src={anime.coverImage.medium} alt="" />
                            <div>{anime.title.romaji}</div>
                        </li>
                    ))}
            </ul>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPage}
                handlePageChange={handlePageChange}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
            />
        </div>
    );
};

const styles = {
    container: css`
        display: flex;
        justify-content: center;

        .pagination-container {
            display: flex;
            justify-content: center;
            list-style: none;
            padding: 0;

            li {
                margin: 0 5px;
                display: inline-block;

                &.pagination-page {
                    a {
                        color: #333 !important;
                        text-decoration: none !important;
                        padding: 8px 16px !important;
                        border: 1px solid #ccc !important;
                        border-radius: 4px !important;

                        &:hover {
                            background-color: #f0f0f0 !important;
                        }
                    }
                }

                &.pagination-previous,
                &.pagination-next {
                    a {
                        color: #333 !important;
                        text-decoration: none !important;
                        padding: 8px 16px !important;
                        border: 1px solid #ccc !important;
                        border-radius: 4px !important;

                        &:hover {
                            background-color: #f0f0f0 !important;
                        }
                    }
                }

                &.pagination-active {
                    a {
                        background-color: #333 !important;
                        color: #fff !important;
                    }
                }

                &.pagination-link {
                    a {
                        color: #333 !important;
                        text-decoration: none !important;
                        padding: 8px 16px !important;
                        border: 1px solid #ccc !important;
                        border-radius: 4px !important;

                        &:hover {
                            background-color: #f0f0f0 !important;
                        }
                    }
                }
            }
        }
    `,
};

export default Home;
