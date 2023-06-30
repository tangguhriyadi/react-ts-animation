/** @jsxImportSource @emotion/react */
import { SerializedStyles, css } from "@emotion/react";
import React from "react";
import { FormValues } from "../../collection/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../../utils/validation";
import { saveToLocalStorage } from "../../../utils/constant";

interface Props {
    onClose: () => void;
}

const AddNewCollection: React.FC<Props> = (props) => {
    const { onClose } = props;

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        saveToLocalStorage(data);
        onClose();
    };
    
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });
    return (
        <div css={style}>
            <form onSubmit={handleSubmit(onSubmit)} css={style}>
                <div className="button-container">
                    <button className="button-cancel" onClick={onClose}>
                        Close
                    </button>
                    <button className="button-add" type="submit">
                        Add
                    </button>
                </div>
                <div className="container-input">
                    <input
                        type="text"
                        {...register("title")}
                        id="title"
                        placeholder="Title"
                    />
                </div>
                <span className="error">{errors.title?.message}</span>
                <div className="container-input">
                    <textarea
                        {...register("description")}
                        id="description"
                        placeholder="Description"
                    />
                </div>
                <span className="error">{errors.description?.message}</span>
            </form>
        </div>
    );
};

const style: SerializedStyles = css`
    margin-top: 10px;
    .container-input {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        label {
            font-weight: bold;
            margin-bottom: 5px;
        }
        input {
            width: 100%;
            padding: 5px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
            outline: none;
            margin-bottom: 10px;
        }
        textarea {
            width: 100%;
            padding: 5px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
            outline: none;
            margin-bottom: 10px;
        }
    }
    .error {
        color: red;
        font-size: 14px;
        display: flex;
        flex-direction: row-reverse;
        margin-bottom: 2px;
    }
    .button-container {
        display: flex;
        flex-direction: row-reverse;
        .button-add {
            margin-top: 0 !important;
            padding: 7px 12px 7px 12px !important;
            border-radius: 5px;
            margin-left: 5px !important;
            margin-bottom: 10px;
            background-color: #79c142 !important;
            &:hover {
                background-color: #5d9d34 !important;
            }
        }
        .button-cancel {
            margin-top: 0 !important;
            padding: 7px 12px 7px 12px !important;
            border-radius: 5px;
            margin-left: 5px !important;
            margin-bottom: 10px;
            &:hover {
                filter: brightness(0.5);
            }
        }
    }
`;

export default AddNewCollection;
