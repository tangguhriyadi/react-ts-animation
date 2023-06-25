import { css } from "@emotion/react";

export const homePageStyle = {
    gridStyle: css`
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 20px;

        li {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;

            img {
                width: 100%;
                max-width: 275px;
                height: 300px;
                object-fit: cover;
                border-radius: 8px;
                cursor: pointer;
            }

            div {
                margin-top: 10px;
                font-weight: bold;
            }
        }

        @media (max-width: 768px) {
            grid-template-columns: repeat(3, 1fr);
        }

        @media (max-width: 480px) {
            grid-template-columns: repeat(1, 1fr);
        }
    `,
    headerStyle: css`
        display: flex;
        justify-content: center;
    `,
};
