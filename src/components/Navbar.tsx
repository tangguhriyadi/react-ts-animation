/** @jsxImportSource @emotion/react */
import React from "react";
import { css, SerializedStyles } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC<{}> = () => {
    const navigate = useNavigate();
    return (
        <div css={style}>
            <h1 onClick={() => navigate("/")}>Anime Flix</h1>
            <div></div>
            <Link to="/collection" className="collection">
                My Collection
            </Link>
        </div>
    );
};

const style: SerializedStyles = css`
    width: 100%;
    background-color: #11101d;
    display: flex;
    justify-content: space-around;
    color: #fff;
    lign-item: center;
    height: 75px;
    h1 {
        margin-top: 0;
        margin-bottom: 0;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .collection {
        display: flex;
        align-items: center;
        color: #fff !important;
        text-decoration: none;
    }
`;

export default Navbar;
