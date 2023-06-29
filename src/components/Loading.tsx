/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import React from "react";
import LoadingSVG from "../assets/loading.svg";

const Loading: React.FC = () => {
    return (
        <div css={style}>
            <img src={LoadingSVG} alt="" loading="lazy" />
        </div>
    );
};
const style: SerializedStyles = css`
    width: 100%;
    display: flex;
    height: auto;
    justify-content: center;
`;
export default Loading;
