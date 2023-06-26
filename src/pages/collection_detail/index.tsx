/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { Anime } from "../home/types";

const CollectionDetail: React.FC<{}> = () => {
    const params = useParams<{ title: string }>();

    const existingStorage: string | null = localStorage.getItem("collection");

    const parsedLocalStorage = existingStorage
        ? JSON.parse(existingStorage)
        : [];

    const dataAnime:Anime[] = parsedLocalStorage.data

    const renderCollection = useCallback((): JSX.Element => {
        return (
            <div>
                <ul css={style.gridStyle}>
                    {dataAnime &&
                        dataAnime.map((anime: any) => (
                            <li key={anime.title}>
                                <img src={anime.coverImage.large} alt="" />
                                <div>{anime.title}</div>
                            </li>
                        ))}
                </ul>
            </div>
        );
    }, [dataAnime]);

    return (
        <>
            <div css={style.title}>
                <h1>{params.title}</h1> 
            </div>
            {dataAnime && dataAnime.length > 0 && renderCollection()}
        </>
    );
};

const style = {
    title: css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        h1 {
            text-align: center;
        }
    `,
    gridStyle: css`
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 20px;
        padding: 20px;

        li {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;

            img {
                width: 100%;
                max-width: 275px;
                height: 300px;
                object-fit: cover;
                border-radius: 8px;
                cursor: pointer;
            }

            div {
                margin-top: 10px;
                font-weight: bold;
            }
        }

        @media (max-width: 768px) {
            grid-template-columns: repeat(3, 1fr);
        }

        @media (max-width: 480px) {
            grid-template-columns: repeat(1, 1fr);
        }
    `,
};

export default CollectionDetail;
