/** @jsxImportSource @emotion/react */
import React, { useCallback, useState, MouseEvent, useMemo } from "react";
// import Sidenav from "./components/Sidenav";
import { css } from "@emotion/react";
import DefaultImage from "../../assets/default.png";
import Modal from "../../components/Modal";
import AddCollectionForm from "./components/AddCollectionForm";
import DeleteIcon from "../../assets/delete.png";
import EditIcon from "../../assets/pencil2.png";
import { useNavigate } from "react-router-dom";
import {
    deleteMutationCollectionLocal,
    handleImageError,
} from "../../utils/constant";
import { CollectionData } from "./types";
import DeleteConfirmation from "../../components/DeleteConfitmation";

const Collection: React.FC<{}> = () => {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const [isOpenDelete, setIsOpenDelete] = useState(false);

    const [isOpenEdit, setIsOpenEdit] = useState(false);

    const [selected, setSelected] = useState<number>(0);

    const formTitle = useMemo<string>(() => {
        if (isOpen && !isOpenEdit && !isOpenDelete) {
            return "Add New Collection";
        } else if (isOpenEdit && !isOpenDelete && !isOpen) {
            return `Edit Collection`;
        } else if (isOpenDelete && !isOpenEdit && !isOpen) {
            return `Are you sure want to delete ?`;
        }
        return "";
    }, [isOpen, isOpenEdit, isOpenDelete]);

    const handleOpenModal = (): void => {
        setIsOpen(true);
    };

    const handleCloseModal = (): void => {
        setIsOpen(false);
        setIsOpenEdit(false);
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
        setSelected(parseInt(id!));
        setIsOpenDelete(true);
    };

    const handleClickEdit = (e: MouseEvent<HTMLImageElement>): void => {
        e.stopPropagation();
        const id = e.currentTarget.getAttribute("data-id");
        setSelected(parseInt(id!));
        setIsOpenEdit(true);
    };

    const renderCollection = useCallback((): JSX.Element => {
        return (
            <div>
                <ul css={style.gridStyle}>
                    {dataCollection &&
                        dataCollection.map((collection: CollectionData) => (
                            <li
                                key={collection.id}
                                onClick={() =>
                                    navigate(`/collection/${collection.id}`)
                                }
                            >
                                <img
                                    src={
                                        collection.data && collection.data[0]
                                            ? collection.data[0].coverImage
                                                  .large
                                            : DefaultImage
                                    }
                                    alt="../../assets/default.png"
                                    onError={handleImageError}
                                    loading="lazy"
                                />
                                <div className="title">{collection.title}</div>
                                <img
                                    className="delete"
                                    src={DeleteIcon}
                                    alt=""
                                    data-id={collection.id}
                                    onClick={handleClickDelete}
                                    loading="lazy"
                                />
                                <img
                                    className="edit"
                                    src={EditIcon}
                                    alt=""
                                    data-id={collection.id}
                                    onClick={handleClickEdit}
                                    loading="lazy"
                                />
                            </li>
                        ))}
                </ul>
            </div>
        );
    }, [dataCollection]);

    const renderPopUpForm = useCallback((): JSX.Element => {
        if (isOpen && !isOpenDelete && !isOpenEdit) {
            return <AddCollectionForm onClose={handleCloseModal} />;
        } else if (isOpenDelete && !isOpenEdit && !isOpen) {
            return (
                <DeleteConfirmation
                    onClose={handleCloseModal}
                    handleDelete={handleDelete}
                />
            );
        } else if (isOpenEdit && !isOpenDelete && !isOpen) {
            return (
                <AddCollectionForm
                    onClose={handleCloseModal}
                    id={selected}
                />
            );
        }
        return <></>;
    }, [selected, isOpen, isOpenDelete, isOpenEdit]);

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
                onClose={handleCloseModal}
                title={formTitle}
                isOpen={isOpen || isOpenDelete || isOpenEdit}
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
            max-height: 400px;
            position: relative;
            cursor: pointer;

            img {
                width: 100%;
                height: 400px;
                max-width: 275px;
                object-fit: fill;
                border-radius: 8px;
                cursor: pointer;
                position: relative;
                @media (max-width: 480px) {
                    width: 275px;
                }
            }

            .delete {
                position: absolute;
                z-index: 1;
                margin: 40px 5px 5px 5px;
                width: 30px;
                height: 30px;
                background-color: red;
                border-radius: 50%;
                transition: transform 0.3s ease-in-out;
                &:hover {
                    transform: scale(1.1);
                }
            }
            .edit {
                position: absolute;
                z-index: 1;
                margin: 5px;
                width: 30px;
                height: 30px;
                background-color: #fff;
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
            @media (max-width: 768px) {
                grid-template-columns: repeat(3, 1fr);
                margin-bottom:20px;
            }
        }
        
        @media (max-width: 768px) {
            grid-template-columns: repeat(3, 1fr);
        }

        @media (max-width: 480px) {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    `,
};

export default Collection;
