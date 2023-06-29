/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import React from "react";
import ErrorSVG from "../assets/400.svg";

const Error: React.FC = () => {
    return (
        <div css={style}>
            <img src={ErrorSVG} alt="" loading="lazy" />
        </div>
    );
};
const style: SerializedStyles = css`
    width: 100%;
    display: flex;
    height: auto;
    justify-content: center;
    img {
        width: 480px;
        height: auto;
    }
`;

export default Error;
