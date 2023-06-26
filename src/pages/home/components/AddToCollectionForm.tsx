/** @jsxImportSource @emotion/react */
import React, { useState, ChangeEvent, FormEvent } from "react";
import { css, SerializedStyles } from "@emotion/react";
import { Anime } from "../types";

interface Props {
    onClose: () => void;
    addToCollection: Anime[];
    handleSetDefaultState: () => void;
}

const AddToCollectionForm: React.FC<Props> = (props) => {
    const { onClose, addToCollection, handleSetDefaultState } = props;
    const existingStorage: string | null = localStorage.getItem("collection");
    const parsedLocalStorage = existingStorage
        ? JSON.parse(existingStorage)
        : [];

    const [selectedItem, setSelectedItem] = useState<string>(
        parsedLocalStorage[0].title
    );
    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedItem(event.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // take the collections
        let currentCollection = parsedLocalStorage.filter(
            (item: any) => item.title === selectedItem
        )[0];

        // push the selected anime
        currentCollection.data.push(...addToCollection);

        //prevent duplication
        const uniqueData= currentCollection.data.filter(
            (data:Anime, index:number, array:Anime[]) =>
              array.map((p) => p.id).indexOf(data.id) === index
          );
        currentCollection.data = uniqueData

        // remove the old item
        let currentLocalStorage = parsedLocalStorage.filter(
            (item: any) => item.title !== selectedItem
        );

        // update with new item
        currentLocalStorage.push(currentCollection);
        
        localStorage.setItem("collection", JSON.stringify(currentLocalStorage));
        console.log(currentLocalStorage)

        handleSetDefaultState();
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} css={style}>
            <div className="radio-container">
                {parsedLocalStorage.length > 0 ? (
                    parsedLocalStorage.map((data: any) => (
                        <div className="radio-item" key={data.title}>
                            <label className="radio-label">
                                <input
                                    type="radio"
                                    name="radioButton"
                                    value={data.title}
                                    checked={selectedItem === data.title}
                                    onChange={handleRadioChange}
                                />
                                {data.title}
                            </label>
                        </div>
                    ))
                ) : (
                    <></>
                )}
            </div>
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
    .radio-container {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
    }
    .radio-item {
        margin-bottom: 5px;
    }
    .radio-label {
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        position: relative;
        cursor: pointer;
        input {
            margin-right: 10px;
            cursor: pointer;
        }
        input[type="radio"] {
            position: relative;
            -webkit-appearance: none;
            width: 16px;
            height: 16px;
            background-color: #fff;
            border-radius: 50%;
            outline: none;
            border: none;
            cursor: pointer;
        }

        input[type="radio"]:checked::before {
            position: absolute;
            border-radius: 50%;
            content: "";
            width: 8px;
            height: 8px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #79c142;
        }
    }
    .button-submit {
        background-color: #79c142 !important;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        &:hover {
            background-color: #5d9d34 !important;
        }
    }
    .button-cancel {
        background-color: #11101d !important;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-left: 5px;
        &:hover {
            filter: brightness(0.5);
        }
    }
    .collection-item {
        margin-bottom: 5px;
        padding: 2px;
        cursor: pointer;
        border-radius: 5px;
        &:hover {
            background-color: #e9ecef;
        }
    }
`;

const radioContainerStyles = css`
    display: flex;
    flex-direction: column;
`;

const radioItemStyles = css`
    margin-bottom: 5px;
`;

export default AddToCollectionForm;
