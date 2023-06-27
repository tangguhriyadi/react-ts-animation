/** @jsxImportSource @emotion/react */
import React from "react";
import { css, SerializedStyles } from "@emotion/react";

interface Props {
    onClose: () => void;
    handleDelete: () => void
}

const DeleteConfirmation: React.FC<Props> = (props) => {
    const { onClose, handleDelete } = props;
    const handleSubmit = (): void => {
        handleDelete()
    };
    return (
        <form css={style} onSubmit={handleSubmit}>
            <button className="button-submit" type="submit">
                Submit
            </button>
            <button className="button-cancel" onClick={onClose}>
                Cancel
            </button>
        </form>
    );
};
const style: SerializedStyles = css`
    display: flex;
    justify-content: center;
    .button-submit {
        background-color: #79c142 !important;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    .button-cancel {
        background-color: #11101d !important;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-left: 5px;
    }
`;

export default DeleteConfirmation;
