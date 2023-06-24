import React, { useState, useMemo } from "react";
import useAnimeList from "./hooks/useAnimeList";
import Pagination from "./components/Pagination";
import { PageInfo } from "./types";

const Home: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const { error, loading, data } = useAnimeList({ page });
    const pageInfo = useMemo<PageInfo>(() => {
        return {
            currentPage: data?.Page.pageInfo.currentPage || 1,
            total: data?.Page.pageInfo.total || 1,
            hasNextPage: data?.Page.pageInfo.hasNextPage || false,
            lastPage: data?.Page.pageInfo.lastPage || 1,
            perPage: data?.Page.pageInfo.perPage || 1,
        };
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error </p>;

    const { currentPage, total: totalPage } = pageInfo;

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

export default Home;
