/** @jsxImportSource @emotion/react */
import { css, SerializedStyles, keyframes } from "@emotion/react";
import React from "react";
import Badge from "./Badge";
import { useNotification } from "../hooks/useNotification";

const ModalNotif: React.FC = () => {
    const { notification, setNotification } = useNotification();
    if (!notification?.message) return null;

    const forceClose = (): void => {
        setNotification({ message: "" });
    };

    return (
        <div css={style}>
            <div className="container">
                <div className="message">
                    <Badge hover={false} />
                    <h3>{notification?.message ?? ""}</h3>
                </div>

                <div onClick={() => forceClose()} className="cancel">
                    <p>&#10006;</p>
                </div>
            </div>
        </div>
    );
};
const droptop = keyframes`
    0%{
        transform:translateX(100%);
        opacity:0;
    }
    100% {
        transform:translateX(0%);
        opacity:1;
    }
`;
const style: SerializedStyles = css`
    position: fixed;
    top: 0;
    right: 0;
    z-index: 3;
    margin-top: 75px;
    .container {
        width:100%;
        background-color: #f5f4f1;
        display: flex;
        justify-content:space-between;
        align-items: center;
        padding: 10px;
        width: 300px;
        height: 50px;
        margin-right: 25px;
        margin-top: 10px;
        border-radius: 4px;
        box-shadow: -7px 7px 5px rgba(0, 0, 0, 0.1);
        animation: ${droptop} 0.3s linear;
        h3 {
            margin-left: 5px;
            transform: translateY(-10%);
        }
        .cancel {
            margin-right:10px;
            color:red;
            font-weight:bold;
            font-size:14px;
            cursor:pointer;
        }
        .message {
            display:flex;
            flex-direction:row;
            align-items:center;
        }
        @media (max-width: 480px) {
            margin-right:0;  
        }
    }
    @media (max-width: 480px) {
        display:flex;
        justify-content:center; 
        width:100%;  
    }
`;

export default ModalNotif;
