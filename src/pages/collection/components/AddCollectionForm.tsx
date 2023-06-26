/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormValues {
    title: string;
    description: string;
}

interface Props {
    onClose: () => void;
}

const notDuplicatTitle = (value: string) => {
    const existingStorage: string | null = localStorage.getItem("collection");
    const parsedLocalStorage = existingStorage ? JSON.parse(existingStorage) : [];
    const isExist:boolean = parsedLocalStorage.some((data: FormValues) => data.title === value);
    if(isExist){
        return false
    }
    return true
};

const schema = yup
    .object({
        title: yup
            .string()
            .required()
            .test("is-valid", "Title already exist", notDuplicatTitle),
        description: yup.string().required(),
    })
    .required();

const AddCollectionForm: React.FC<Props> = (props) => {
    const { onClose } = props;
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        saveToLocalStorage(data);
        onClose();
    };
    const saveToLocalStorage = (data: FormValues): void => {
        let existingStorage: string | null = localStorage.getItem("collection");
        let parsedLocalStorage = existingStorage
            ? JSON.parse(existingStorage)
            : [];
        let array: FormValues[] = [];
        if (parsedLocalStorage.length === 0) {
            array.push(data);
            localStorage.setItem("collection", JSON.stringify(array));
        } else {
            array.push(...parsedLocalStorage);
            array.push(data);
            localStorage.setItem("collection", JSON.stringify(array));
        }
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
