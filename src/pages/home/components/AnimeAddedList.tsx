/** @jsxImportSource @emotion/react */
import React from "react";
import { css, SerializedStyles } from "@emotion/react";
import { Anime } from "../types";
import { title } from "../../../utils/constant";

interface Props {
    data: Anime[];
}

const AnimeAddedList: React.FC<Props> = (props) => {
    const { data } = props;
    const splitIndex = Math.ceil(data.length / 2);
    const leftOptions = data.slice(0, splitIndex);
    const rightOptions = data.slice(splitIndex);
    return (
        <div css={style}>
            <div className="title">Anime Selected:</div>
            <div className="column-container">
                <div className="column">
                    {data && data.length > 0 ? (
                        leftOptions.map((data) => (
                            <div key={data.id}><span className="circle">&#x25CF;</span> {title(data.title)}</div>
                        ))
                    ) : (
                        <></>
                    )}
                </div>
                <div className="column">
                    {data && data.length > 0 ? (
                        rightOptions.map((data) => (
                            <div key={data.id}><span className="circle">&#x25CF;</span> {title(data.title)}</div>
                        ))
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    );
};

const style: SerializedStyles = css`
    margin-top: 10px;
    .title {
        margin-bottom: 5px;
        font-weight: bold;
    }
    .column-container {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        max-height:150px;
        overflow: auto;
        .column {
            width: 50%;
            .circle {
                color:#79c142;
            }
        }
    }
`;

export default AnimeAddedList;
