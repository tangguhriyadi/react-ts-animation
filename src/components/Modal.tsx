/** @jsxImportSource @emotion/react */
import React from "react";
import { css, keyframes, SerializedStyles } from "@emotion/react";

interface ModalProps {
    isOpen: boolean;
    title: string;
    children: JSX.Element;
    onClose?: () => void;
}

const Modal: React.FC<ModalProps> = (props) => {
    const { isOpen, children, title, onClose } = props;
    if (!isOpen) return null;

    return (
        <div css={style}>
            <div className="container">
                <div onClick={onClose} className="cancel">
                    <p>&#10006;</p>
                </div>
                <h2>{title}</h2>
                <div className="content">{children}</div>
            </div>
        </div>
    );
};
const droptop = keyframes`
    0%{
        transform:translateY(-100%) scale(0);
        opacity:0;
    }
    100% {
        transform:translateY(0%) scale(1);
        opacity:1;
    }
`;

const style: SerializedStyles = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
    .container {
        background-color: #fff;
        width: 400px;
        padding: 10px 20px 20px 20px;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        animation: ${droptop} 0.3s linear;
        h2 {
            text-align: center;
            margin-top: 0;
            margin-bottom: 20px;
        }
        .content {
            background-color: #fff;
            padding: 5px 20px 20px 20px;
            button {
                margin-top: 20px;
                padding: 10px 20px;
                background-color: #333;
                color: #fff;
                border: none;
                cursor: pointer;
            }
        }
        .cancel {
            display: flex;
            justify-content: end;
            p {
                color: red;
                font-weight: bold;
            }
            cursor: pointer;
        }
    }
`;

export default Modal;
