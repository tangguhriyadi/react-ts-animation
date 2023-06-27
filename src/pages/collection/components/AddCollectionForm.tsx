/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormValues } from "../types";
import { schema } from "../../../utils/validation";
import { saveToLocalStorage } from "../../../utils/constant";

interface Props {
    onClose: () => void;
}

const AddCollectionForm: React.FC<Props> = (props) => {
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
        <div>
            <form onSubmit={handleSubmit(onSubmit)} css={style}>
                <div
                    className="container-input"
                    css={css`
                        margin-bottom: 20px;
                    `}
                >
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        {...register("title")}
                        id="title"
                        placeholder="Title"
                    />

                    <span className="error">{errors.title?.message}</span>
                </div>
                <div
                    className="container-input"
                    css={css`
                        margin-bottom: 20px;
                    `}
                >
                    <label htmlFor="description">Description</label>
                    <input
                        {...register("description")}
                        id="description"
                        placeholder="Description"
                    />
                    <span className="error">{errors.description?.message}</span>
                </div>
                <button className="button-submit" type="submit">
                    Submit
                </button>
                <button className="button-cancel" onClick={onClose}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

const style: SerializedStyles = css`
    .container-input {
        margin-bottom: 20px;
        label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
        }
        input {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
            outline: none;
        }
        .error {
            color: red;
            font-size: 14px;
            margin-top: 5px;
        }
    }
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

export default AddCollectionForm;
