/** @jsxImportSource @emotion/react */
import React, { useState, FormEvent, useMemo } from "react";
import { css, SerializedStyles } from "@emotion/react";
import { Anime } from "../types";
import AddNewCollection from "./AddNewCollection";
import { CollectionData } from "../../collection/types";

interface Props {
    onClose: () => void;
    addToCollection: Anime[];
    handleSetDefaultState?: () => void;
    added?: CollectionData[];
}

const AddToCollectionForm: React.FC<Props> = (props) => {
    const { onClose, addToCollection, handleSetDefaultState, added } = props;

    const [isOpenAddCollection, setIsOpenAddCollection] =
        useState<boolean>(false);

    const [isError, setIsError] = useState<boolean>(false);

    const [selectedItem, setSelectedItem] = useState<string[]>([]);

    const existingStorage: string | null = localStorage.getItem("collection");
    const parsedLocalStorage = existingStorage
        ? JSON.parse(existingStorage)
        : [];

        console.log(added)
        console.log(parsedLocalStorage)

    const availableCollection = useMemo(() => {
        if (added && added.length > 0) {
            return parsedLocalStorage.filter((collection: CollectionData) => {
                return !added.some((col) => collection.title == col.title);
            });
        }
        return parsedLocalStorage;
    }, [added]);

    console.log(availableCollection)

    const handleRadioChange = (value: string) => {
        if (selectedItem.includes(value)) {
            setSelectedItem(selectedItem.filter((option) => option !== value));
        } else {
            setSelectedItem([...selectedItem, value]);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (selectedItem.length === 0) {
            setIsError(true);
            return;
        }
        selectedItem.forEach((selected) => {
            // take the collections
            let currentCollection = parsedLocalStorage.filter(
                (item: any) => item.title === selected
            )[0];

            // push the selected anime
            currentCollection.data.push(...addToCollection);

            //prevent duplication
            const uniqueData = currentCollection.data.filter(
                (data: Anime, index: number, array: Anime[]) =>
                    array.map((p) => p.id).indexOf(data.id) === index
            );
            currentCollection.data = uniqueData;

            // remove the old item
            let currentLocalStorage = parsedLocalStorage.filter(
                (item: any) => item.title !== selected
            );

            // update with new item
            currentLocalStorage.push(currentCollection);

            localStorage.setItem(
                "collection",
                JSON.stringify(currentLocalStorage)
            );
        });

        if (handleSetDefaultState) {
            handleSetDefaultState();
        }
        onClose();
    };

    const handleCloseAddNewCollection = (): void => {
        setIsOpenAddCollection(false);
    };

    const renderCollectionList = (): JSX.Element => {
        const splitIndex = Math.ceil(availableCollection.length / 2);
        const leftOptions = availableCollection.slice(0, splitIndex);
        const rightOptions = availableCollection.slice(splitIndex);
        return (
            <form onSubmit={handleSubmit} css={style}>
                <h2>Available Collections</h2>
                <div className="checkbox-container">
                    <div className="column">
                        {leftOptions.length > 0 ? (
                            leftOptions.map((data: any) => (
                                <div key={data.title}>
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="radioButton"
                                            value={data.title}
                                            checked={selectedItem.includes(
                                                data.title
                                            )}
                                            onChange={() =>
                                                handleRadioChange(data.title)
                                            }
                                        />
                                        <span className="checkbox-custom"></span>
                                        {data.title}
                                    </label>
                                </div>
                            ))
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="column">
                        {rightOptions.length > 0 ? (
                            rightOptions.map((data: any) => (
                                <div key={data.title}>
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="radioButton"
                                            value={data.title}
                                            checked={selectedItem.includes(
                                                data.title
                                            )}
                                            onChange={() =>
                                                handleRadioChange(data.title)
                                            }
                                        />
                                        <span className="checkbox-custom"></span>
                                        {data.title}
                                    </label>
                                </div>
                            ))
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <button className="button-submit" type="submit">
                    Submit
                </button>
                <button className="button-cancel" onClick={onClose}>
                    Cancel
                </button>
                {isError && (
                    <p className="error">Select at least one collection</p>
                )}
            </form>
        );
    };
    return (
        <>
            {isOpenAddCollection ? (
                <AddNewCollection onClose={handleCloseAddNewCollection} />
            ) : (
                <div css={styleButton}>
                    <button
                        onClick={() =>
                            setIsOpenAddCollection(!isOpenAddCollection)
                        }
                    >
                        Add New Collection
                    </button>
                </div>
            )}
            <hr />
            {parsedLocalStorage.length > 0 ? (
                renderCollectionList()
            ) : (
                <h3>You have no collection yet</h3>
            )}
        </>
    );
};

const style: SerializedStyles = css`
    margin-top: 10px;
    h2 {
        margin-bottom: 10px !important;
    }
    .checkbox-container {
        display: flex;
        justify-content: space-between;
        .column {
            width: 50%;
            .checkbox-label {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                cursor: pointer;
            }

            .checkbox-label input[type="checkbox"] {
                display: none;
            }

            .checkbox-custom {
                display: inline-block;
                width: 16px;
                height: 16px;
                border: 2px solid #ccc;
                border-radius: 3px;
                background-color: white;
                margin-right: 10px;
                cursor: pointer;
            }

            .checkbox-custom::after {
                content: "";
                display: inline-block;
                width: 10px;
                height: 10px;
                background-color: #ccc;
                border-radius: 2px;
                transition: background-color 0.2s;
            }

            .checkbox-label
                input[type="checkbox"]:checked
                ~ .checkbox-custom::after {
                background-color: #79c142;
            }
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
    .error {
        color: red;
        font-size: 14px;
        display: flex;
        flex-direction: row;
        margin-bottom: 2px;
    }
`;

const styleButton = css`
    display: flex;
    flex-direction: row-reverse;
    button {
        margin-top: 0 !important;
        margin-bottom: 10px;
        border-radius: 5px;
        padding: 7px 12px 7px 12px !important;
    }
`;

export default AddToCollectionForm;
