/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import React from "react";
import Badges from "../assets/badge.png";

const Badge: React.FC = () => {
    return (
        <div css={style}>
            <img src={Badges} alt="" />
            <div className="hide">Licensed</div>
        </div>
    );
};
const style: SerializedStyles = css`
    img {
        width: 35px;
        height: 28px;
        cursor: pointer;
        background-color: #fff !important;
        border-radius: 50% !important;
        &:hover + .hide {
            display: block;
            position: absolute;
        }
    }
    .hide {
        display: none;
        margin-top: -53px;
        background-color: #fff;
        padding: 2px;
        border-radius: 2px;
        transform: translateX(-20%);
        border: 1px solid black !important;
    }
    transition: transform 0.3s ease-in-out;
    &:hover {
        transform: scale(1.1);
    }
`;

export default Badge;
