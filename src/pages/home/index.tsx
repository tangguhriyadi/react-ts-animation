/** @jsxImportSource @emotion/react */
import React, { useState, useMemo } from "react";
import useAnimeList from "./hooks/useAnimeList";
import Pagination from "./components/Pagination";
import { PageInfo } from "./types";
import { homePageStyle } from "./style";
import {useNavigate} from "react-router-dom"

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
    const navigate = useNavigate()

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
            <h1 css={homePageStyle.headerStyle}>Anime List</h1>
            <ul css={homePageStyle.gridStyle}>
                {data &&
                    data?.Page.media.map((anime: any) => (
                        <li key={anime.id} onClick={() => navigate(`/anime-detail/${anime.id}`)}>
                            <img src={anime.coverImage.large} alt="" />
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
