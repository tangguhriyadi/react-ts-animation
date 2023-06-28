/** @jsxImportSource @emotion/react */
import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAnimeDetail from "./hooks/useAnimeDetail";
import { css, SerializedStyles } from "@emotion/react";
import {
    convertNumber,
    getCollectionByAnimeName,
    handleImageBannerError,
    title,
} from "../../utils/constant";
import Modal from "../../components/Modal";
import AddToCollectionForm from "../home/components/AddToCollectionForm";
import { Anime } from "../home/types";
import DefaultBanner from "../../assets/defaultBanner.png";

const AnimeDetail: React.FC<{}> = () => {
    const params = useParams<{ id: string }>();

    const { loading, error, data } = useAnimeDetail({ id: params.id });

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const handleOpenModal = (): void => {
        setIsOpenModal(true);
    };

    const handleCloseModal = (): void => {
        setIsOpenModal(false);
    };

    const param = useMemo(() => {
        if (!params.id) return 0;
        return parseInt(params.id);
    }, [params]);

    const addToCollection = useMemo<Anime[]>(() => {
        if (!data) return [];
        return [data.Media];
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error </p>;

    const collection = getCollectionByAnimeName(param);

    return (
        <div css={style}>
            <div className="img-container">
                <img
                    src={
                        data?.Media.bannerImage
                            ? data?.Media.bannerImage
                            : DefaultBanner
                    }
                    alt="../../assets/defaultBanner.png"
                    onError={handleImageBannerError}
                    loading="lazy"
                />
            </div>
            <div className="button-container-detail">
                <button onClick={handleOpenModal}>Add to Collection</button>
            </div>
            <div className="detail">
                <div>
                    Title: {title(data?.Media.title)}{" "}
                    {`(${data?.Media.title.native})`}
                </div>
                <div>Type: {data?.Media.type}</div>
                <div>Total Episode: {data?.Media.episodes}</div>
                <div>
                    Released: {data?.Media.startDate?.year}-
                    {convertNumber(data?.Media.startDate?.month)}-
                    {convertNumber(data?.Media.startDate?.day)}
                </div>
                <div>Synopsis: {data?.Media.description}</div>
            </div>
            <div className="collection-list">
                {title(data?.Media.title)} has been added to your collection
                below:
            </div>
            {collection.map((col) => (
                <Link key={col.title} to={`/collection/${col.title}`}>
                    {" "}
                    {col.title}{" "}
                </Link>
            ))}
            <Modal
                title="Select Collection"
                isOpen={isOpenModal}
                children={
                    <AddToCollectionForm
                        addToCollection={addToCollection}
                        onClose={handleCloseModal}
                    />
                }
            />
        </div>
    );
};

const style: SerializedStyles = css`
    .img-container {
        width: 100%;
        height: auto;
        img {
            width: 100%;
            height: auto;
            max-height: 450px;
            object-fit: fill;
            filter: brightness(0.5);
        }
    }
    .button-container-detail {
        display: flex;
        justify-content: center;
        button {
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
        }
    }
    .detail {
        h2 {
            text-align: center;
            margin: 5px;
        }
    }
    .collection-list {
        margin-top: 20px;
    }
`;

export default AnimeDetail;
