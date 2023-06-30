import { css } from "@emotion/react";

export const homePageStyle = {
    gridStyle: css`
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 40px;
        padding: 20px;

        li {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            max-height: 400px;
            position: relative;
            cursor: pointer;

            .checkbox {
                position: absolute;
                z-index: 1;
                margin-top: 100px;
                img {
                    width:150px;
                }
            }

            .image-anime {
                width: 100%;
                height: 400px;
                object-fit: cover;
                border-radius: 8px;
                cursor: pointer;
                position: relative;
                box-shadow:-7px 7px 5px #888888;
                @media (max-width: 480px) {
                    width: 275px;
                }
            }

            .title-container {
                position: absolute;
                height: 400px;
                display: flex;
                flex-direction: column-reverse;
                width: 100%;
                .title {
                    color: #fff;
                    margin-top: 10px;
                    font-weight: bold;
                    position: relative;
                    background-color: rgba(0, 0, 0, 0.5);
                }
                .year {
                    margin-top: 0;
                    padding-bottom:5px;
                    font-weight: bold;
                    color: #fff;
                    position: relative;
                    background-color: rgba(0, 0, 0, 0.5);
                    border-bottom-left-radius: 4px;
                    border-bottom-right-radius: 4px;
                }
                @media (max-width: 480px) {
                    max-width: 275px;
                }
            }

            .header-status {
                display:flex;
                width:100%;
                justify-content:space-between;
                position: absolute;
                z-index: 1;    
                .tag-status {
                    margin: 5px;
                }
                .tag-format{
                    margin: 5px;
                    max-height:40px;
                }
            }
        }

        @media (max-width: 768px) {
            grid-template-columns: repeat(3, 1fr);
        }

        @media (max-width: 480px) {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
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
        top: 75px;
        z-index: 2;
        padding-top: 10px;
    `,
    direction: css`
        text-align: center;
        margin-top: 10px;
    `,
};
