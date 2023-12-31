/** @jsxImportSource @emotion/react */
import React from "react";
import { css, SerializedStyles } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC<{}> = () => {
    const navigate = useNavigate();
    return (
        <div css={style}>
            <h1 onClick={() => navigate("/")}>
                Anime <span className="field">Field</span>
            </h1>
            <div></div>
            <div className="collection-container">
                <Link to="/collection" className="collection">
                    My Collection
                </Link>
            </div>
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
    position: sticky;
    top: 0;
    z-index: 3;
    h1 {
        font-family: Inter;
        margin-top: 0;
        margin-bottom: 0;
        display: flex;
        align-items: center;
        cursor: pointer;
        .field {
            font-family: Inter;
            color: #79c142;
        }
    }
    .collection-container {
        display: flex;
        justify-content: center;
        align-items: center;
        .collection {
            display: flex;
            align-items: center;
            color: #fff !important;
            text-decoration: none;
            border: 1px solid #fff;
            padding: 5px;
            border-radius: 4px;
        }
    }
`;

export default Navbar;
