/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useCallback, MouseEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Anime } from "../home/types";
import { CollectionData } from "../collection/types";
import DeleteIcon from "../../assets/delete.png";
import Modal from "../../components/Modal";
import DefaultImage from "../../assets/default.png";

import {
    deleteMutationLocal,
    getCollectionByName,
    getDataLocalStorage,
} from "../../utils/constant";
import DeleteConfirmation from "../../components/DeleteConfitmation";
import AddCollectionForm from "../collection/components/AddCollectionForm";

const CollectionDetail: React.FC<{}> = () => {
    const params = useParams<{ title: string }>();

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);

    const [selected, setSelected] = useState<number>(0);

    const collection = getCollectionByName(params.title);

    const collectionData: CollectionData[] = getDataLocalStorage();

    const dataAnime: CollectionData = collectionData.filter(
        (data: any) => data.title === params.title
    )[0];

    const handleClick = (id: number): void => {
        navigate(`/anime-detail/${id}`);
    };

    const handleClickDelete = (e: MouseEvent<HTMLImageElement>): void => {
        e.stopPropagation();
        const id = parseInt(e.currentTarget.getAttribute("data-id") || "0", 10);
        setSelected(id);
        setIsOpenDelete(true);
    };

    const handleOpenEdit = (): void => {
        setIsOpen(true);
    };

    const handleClose = (): void => {
        setIsOpenDelete(false);
        setIsOpen(false);
    };

    const handleDelete = (): void => {
        deleteMutationLocal({
            data: collectionData,
            collectionId: params.title,
            animeId: selected,
        });
        setIsOpenDelete(!isOpenDelete);
    };

    const renderCollection = useCallback((): JSX.Element => {
        return (
            <div>
                <ul css={style.gridStyle}>
                    {dataAnime.data &&
                        dataAnime.data.map((anime: Anime) => (
                            <li key={anime.id}>
                                <img
                                    src={
                                        anime.coverImage
                                            ? anime.coverImage.large
                                            : DefaultImage
                                    }
                                    alt=""
                                    onClick={() => handleClick(anime.id)}
                                    loading="lazy"
                                />
                                <img
                                    className="delete"
                                    src={DeleteIcon}
                                    alt=""
                                    data-id={anime.id}
                                    onClick={handleClickDelete}
                                    loading="lazy"
                                />
                                <div className="title">
                                    {anime.title.english}
                                </div>
                            </li>
                        ))}
                </ul>
                <Modal
                    title="Are you sure?"
                    onClose={handleClose}
                    children={
                        <DeleteConfirmation
                            onClose={handleClose}
                            handleDelete={handleDelete}
                        />
                    }
                    isOpen={isOpenDelete}
                />
            </div>
        );
    }, [dataAnime]);

    return (
        <>
            <div css={style.title}>
                <h1>{params.title}</h1>
                <p>Description:</p>
                <p>{collection.description} </p>
            </div>
            <div css={style.buttonContainer}>
                <button onClick={handleOpenEdit} css={style.button}>
                    Edit Collection Info
                </button>
            </div>
            {dataAnime.data && dataAnime.data.length > 0 && renderCollection()}
            <Modal
                onClose={handleClose}
                title={"Edit Collection"}
                isOpen={isOpen}
                children={
                    <AddCollectionForm
                        onClose={handleClose}
                        id={params.title}
                    />
                }
            />
        </>
    );
};

const style = {
    title: css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        h1,
        p {
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

                height: 400px;
                object-fit: fill;
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
};

export default CollectionDetail;
