/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import React from "react";
import Error404 from "../assets/404.svg";

const NotFound: React.FC = () => {
    return (
        <div css={style}>
            <img src={Error404} alt="" loading="lazy"/>
        </div>
    );
};

const style: SerializedStyles = css`
    width: 100%;
    display: flex;
    height: auto;
    justify-content: center;
    img{
        width:480px;
        height:auto;
    }
`;

export default NotFound;
