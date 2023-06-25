/** @jsxImportSource @emotion/react */
import React from "react";
import { useParams } from "react-router-dom";
import useAnimeDetail from "./hooks/useAnimeDetail";
import { css } from "@emotion/react";

const AnimeDetail: React.FC<{}> = () => {
    const params = useParams<{ id: string }>();
    const { loading, error, data } = useAnimeDetail({ id: params.id });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error </p>;

    const convertNumber = (month: number | undefined): string => {
        if (!month) return "0";
        if (month >= 10) return month.toString();
        return `0${month}`;
    };

    return (
        <div css={style}>
            <div className="img-container">
                <img src={data?.Media.bannerImage} alt="" />
            </div>
            <div className="detail">
                <div>
                    Title: {data?.Media.title.english}{" "}
                    {`(${data?.Media.title.native})`}
                </div>
                <div>Type: {data?.Media.type}</div>
                <div>Total Episode: {data?.Media.episodes}</div>
                <div>
                    Released: {data?.Media.startDate?.year}-
                    {convertNumber(data?.Media.startDate?.month)}-
                    {convertNumber(data?.Media.startDate?.day)}
                </div>
                <div>Synopsis: {data?.Media.description}</div>
            </div>
        </div>
    );
};

const style = css`
    .img-container {
        max-width: 100%;
        height: auto;
        img {
            max-width: 100%;
            height: auto;
        }
    }
    .detail {
        h2 {
            text-align: center;
            margin: 5px;
        }
    }
`;

export default AnimeDetail;
