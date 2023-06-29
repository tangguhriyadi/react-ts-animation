/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import React from "react";

const AdultOnly: React.FC = () => {
    return (
        <div css={style}>
            <div className="logo">18+</div>
            <div className="hide">Adult only</div>
        </div>
    );
};

const style: SerializedStyles = css`
margin-bottom:5px;
    .logo {
        background-color: #fa244d;
        color: #fff;
        border-radius: 4px;
        padding: 5px;
        cursor: pointer;
        &:hover + .hide{
          display:block;
          position:absolute;
        }
    }
    .hide {
      display:none;
      text-center;
      margin-top:-50px;
      background-color:#fff;
      padding:2px;
      width:80px;
      border-radius:2px;
      transform:translateX(-20%);
      transform:translateY(-50%);
      border: 1px solid black !important;
      @media (max-width: 480px) {
        transform:translateY(-20%);
    }
    
    transition: transform 0.3s ease-in-out;
    &:hover {
        transform: scale(1.1);
    }
`;

export default AdultOnly;
