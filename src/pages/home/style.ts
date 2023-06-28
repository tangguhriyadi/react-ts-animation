import { css } from "@emotion/react";

export const homePageStyle = {
    gridStyle: css`
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 20px;
        padding: 20px;

        li {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;

            .checkbox {
                position: absolute;
                z-index: 1;
                margin: 0;
            }

            img {
                width: 100%;
                max-width: 275px;
                height: 300px;
                object-fit: cover;
                border-radius: 8px;
                cursor: pointer;
                position: relative;
            }

            .title {
                margin-top: 10px;
                font-weight: bold;
            }
            .year {
                margin-top: 0;
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
    button: css`
        padding: 10px 20px;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        text-decoration: none;
        background-color: #79c142;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        &:hover {
            background-color: #5d9d34;
        }
    `,
    buttonCancel: css`
        padding: 10px 20px;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        text-decoration: none;
        background-color: #11101d;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin-left: 10px;
        &:hover {
            filter: brightness(0.5);
        }
    `,
    buttonContainer: css`
        display: flex;
        justify-content: center;
        margin-top: 10px;
        position: sticky;
        top: 0;
        z-index: 1;
        padding-top: 10px;
    `,
    direction: css`
        text-align: center;
        margin-top: 10px;
    `,
};
