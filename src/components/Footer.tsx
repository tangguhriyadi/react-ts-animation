/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import React from "react";

interface FooterProps {
    author: string;
    year: number;
}

const Footer: React.FC<FooterProps> = ({ author, year }) => {
    const style: SerializedStyles = css`
        position: relative  ;
        margin-top:20px;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        background-color: #11101d;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;    
        z-index: 2;
        .year {
            color: #79c142;
        }
    `;
    return (
        <footer css={style}>
            <p>
                <span className="year">&copy; {year}</span> {author}
            </p>
        </footer>
    );
};

export default Footer;
