/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
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
const style = css`
    img {
        width: 35px;
        height: 28px;
        cursor: pointer;
        &:hover + .hide{
            display:block;
            position:absolute;
          }
    }
    .hide {
        display:none;
        margin-top:-53px;
        background-color:#fff;
        padding:2px;
        border-radius:2px;
        transform:translateX(-20%);
        border: 1px solid black !important;
      }
`;

export default Badge;
