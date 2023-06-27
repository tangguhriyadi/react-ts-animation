/** @jsxImportSource @emotion/react */
import React, { useCallback, useState, MouseEvent, useMemo } from "react";
// import Sidenav from "./components/Sidenav";
import { css } from "@emotion/react";
import Book from "../../assets/book.png";
import Modal from "../../components/Modal";
import AddCollectionForm from "./components/AddCollectionForm";
import DeleteIcon from "../../assets/delete.png";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../collection_detail/components/DeleteConfirmation";
import { deleteMutationCollectionLocal } from "../../utils/constant";
import { CollectionData } from "./types";

const Collection: React.FC<{}> = () => {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const [isOpenDelete, setIsOpenDelete] = useState(false);

    const [selected, setSelected] = useState<string | null>("");

    const handleOpenModal = (): void => {
        setIsOpen(true);
    };

    const handleCloseModal = (): void => {
        setIsOpen(false);
    };

    const handleCloseDeleteModal = (): void => {
        setIsOpenDelete(false);
    };
    const existingStorage: string | null = localStorage.getItem("collection");

    const dataCollection: CollectionData[] = existingStorage
        ? JSON.parse(existingStorage)
        : [];

    const handleDelete = (): void => {
        deleteMutationCollectionLocal({
            data: dataCollection,
            collectionId: selected,
        });
        setIsOpenDelete(!isOpenDelete);
    };

    const handleClickDelete = (e: MouseEvent<HTMLImageElement>): void => {
        e.stopPropagation();
        const id = e.currentTarget.getAttribute("data-id");
        setSelected(id);
        setIsOpenDelete(true);
    };

    const renderCollection = useCallback((): JSX.Element => {
        return (
            <div>
                <ul css={style.gridStyle}>
                    {dataCollection &&
                        dataCollection.map((collection: CollectionData) => (
                            <li
                                key={collection.title}
                                onClick={() =>
                                    navigate(`/collection/${collection.title}`)
                                }
                            >
                                <img
                                    src={
                                        collection.data && collection.data[0]
                                            ? collection.data[0].coverImage
                                                  .large
                                            : Book
                                    }
                                    alt=""
                                />
                                <div className="title">{collection.title}</div>
                                <img
                                    className="delete"
                                    src={DeleteIcon}
                                    alt=""
                                    data-id={collection.title}
                                    onClick={handleClickDelete}
                                />
                            </li>
                        ))}
                </ul>
            </div>
        );
    }, [dataCollection]);

    const renderPopUpForm = (): JSX.Element => {
        if (isOpen) {
            return <AddCollectionForm onClose={handleCloseModal} />;
        } else if (isOpenDelete) {
            return (
                <DeleteConfirmation
                    onClose={handleCloseDeleteModal}
                    handleDelete={handleDelete}
                />
            );
        }
        return <></>;
    };

    return (
        <>
            <div css={style.title}>
                <h1>Collections</h1>
                <div css={style.buttonContainer}>
                    <button onClick={handleOpenModal} css={style.button}>
                        Add New Collection
                    </button>
                </div>
            </div>
            {dataCollection.length > 0 && renderCollection()}
            <Modal
                title={isOpen ? "Add New Collection" : "Are you sure ?"}
                isOpen={isOpen || isOpenDelete}
                children={renderPopUpForm()}
            />
        </>
    );
};

const style = {
    title: css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        h1 {
            text-align: center;
        }
    `,
    buttonContainer: css`
        display: flex;
        justify-content: center;
        margin-top: 10px;
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
    gridStyle: css`
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 20px;
        padding: 20px;

        li {
            display: flex;
            flex-direction: column;
            align-items: end;
            text-align: center;

            img {
                width: 100%;
                max-width: 275px;
                height: 300px;
                object-fit: cover;
                border-radius: 8px;
                cursor: pointer;
                position: relative;
            }

            .delete {
                position: absolute;
                z-index: 1;
                margin: 5px;
                width: 30px;
                height: 30px;
                background-color: red;
                border-radius: 50%;
                transition: transform 0.3s ease-in-out;
                &:hover {
                    transform: scale(1.1);
                }
            }

            div {
                margin-top: 10px;
                font-weight: bold;
            }
            .title {
                align-self: center;
            }
        }

        @media (max-width: 768px) {
            grid-template-columns: repeat(3, 1fr);
        }

        @media (max-width: 480px) {
            grid-template-columns: repeat(1, 1fr);
        }
    `,
    addCollection: css`
        .add-item {
            width: 275px;
            border-style: dotted;
            height: 300px;
            margin: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            border-radius: 7px;
        }

        @media (max-width: 768px) {
            display: flex;
            justify-content: center;
        }

        @media (max-width: 480px) {
            display: flex;
            justify-content: center;
        }
    `,
};

export default Collection;
