import { css, SerializedStyles } from "@emotion/react";

export const paginationWrapperStyles: SerializedStyles = css`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

export const paginationItemStyles: SerializedStyles = css`
    list-style: none;
    margin: 0 5px;
    display: inline-block;
`;

export const paginationLinkStyles: SerializedStyles = css`
    padding: 10px;
    background-color: #f1f1f1;
    border-radius: 5px;
    color: #333;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        background-color: #ccc;
    }
`;

export const activePageStyles: SerializedStyles = css`
    background-color: #555;
    color: #fff;
`;

export const nextPrevButtonStyles: SerializedStyles = css`
    flex: 1;
    padding: 10px;
    max-width: 100px;
    background-color: #f1f1f1;
    border-radius: 5px;
    border: none;
    margin-left: 10px;
    cursor: pointer;

    &:hover {
        background-color: #ccc;
    }

    &:disabled {
        background-color: #ddd;
        cursor: not-allowed;
    }
`;
