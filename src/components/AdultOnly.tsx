/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

const AdultOnly: React.FC = () => {
    return (
        <div css={style}>
            <div className="logo">18+</div>
            <div className="hide">Adult only</div>
        </div>
    );
};

const style = css`
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
      border-radius:2px;
      transform:translateX(-20%);
      border: 1px solid black !important;
    }
    
`;

export default AdultOnly;
