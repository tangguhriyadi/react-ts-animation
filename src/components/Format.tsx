/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import React from "react";

interface Props {
    format: string;
}

const Format: React.FC<Props> = ({ format }) => {
    return <div css={style}>{format}</div>;
};

const style: SerializedStyles = css`
    font-weight: bold;
    background-color: #fff;
    padding: 5px;
    border-radius: 4px;
    transition: transform 0.3s ease-in-out;
    border:1px solid black;
    &:hover {
        transform: scale(1.1);
    }
`;

export default Format;
