/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import GithubLImg from "../assets/github.png";
import LinkedinImg from "../assets/linkedin.png";
import WaImg from "../assets/whatsapp.png";
import ShowwcaseImg from "../assets/showwcase.png";

interface FooterProps {
    author: string;
    year: number;
}

const Footer: React.FC<FooterProps> = ({ author, year }) => {
    return (
        <div css={style}>
            <div className="hr">
                <div></div>
            </div>
            <footer>
                <div>
                    <strong>
                        <span className="year">&copy; {year}</span> {author}
                    </strong>
                </div>
                <div className="contact">
                    <LinkContact
                        href="https://github.com/tangguhriyadi"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={GithubLImg} alt="GitHub Logo" />
                    </LinkContact>
                    <LinkContact
                        href="https://www.linkedin.com/in/muhammad-tangguh-riyadi-b0a36a194/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={LinkedinImg} alt="Linkedin Logo" />
                    </LinkContact>
                    <LinkContact
                        href="https://wa.me/+6282116780425"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={WaImg} alt="WA Logo" />
                    </LinkContact>
                    <LinkContact
                        href="https://showwcase.com/tangguhriyadi"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={ShowwcaseImg} alt="WA Logo" />
                    </LinkContact>
                </div>
            </footer>
        </div>
    );
};
const style: SerializedStyles = css`
    margin-top: 20px;
    .hr {
        padding-right: 20px;
        padding-left:20px;
        min-height: 5px;
        div {
            min-height: 5px;
            background-color: black;
            border-radius:10px;
        }
    }
    footer {
        min-height:80px;
        position: relative;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        z-index: 2;
        margin-bottom: 10px;
        .year {
            color: #79c142;
        }
        .contact {
            display: flex;
            justify-content: center;
            gap: 20px;
        }
    }
`;

const LinkContact = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-left: 10px;
    margin-top: 5px;
    img {
        height: 25px;
        margin-right: 10px;
    }
`;
export default Footer;
