/** @jsxImportSource @emotion/react */
import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAnimeDetail from "./hooks/useAnimeDetail";
import { css, SerializedStyles } from "@emotion/react";
import {
    convertNumber,
    getCollectionByAnimeName,
    handleImageBannerError,
    stripTags,
    title,
} from "../../utils/constant";
import Modal from "../../components/Modal";
import AddToCollectionForm from "../home/components/AddToCollectionForm";
import { Anime } from "../home/types";
import DefaultBanner from "../../assets/defaultBanner.png";
import DefaultImage from "../../assets/default.png";
import AdultOnly from "../../components/AdultOnly";
import Badge from "../../components/Badge";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
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

    if (loading) return <Loading />;
    if (error) return <Error />;

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
            <div className="content-detail">
                <div className="img-content">
                    <img
                        src={
                            data?.Media.coverImage.large ??
                            data?.Media.coverImage.medium ??
                            DefaultImage
                        }
                    />
                    <div className="button-container-detail">
                        <button
                            className="button-add"
                            onClick={handleOpenModal}
                        >
                            Add to Collection
                        </button>
                    </div>
                </div>
                <div className="detail">
                    <div className="main-title">
                        <h1>{title(data?.Media.title)}</h1>
                    </div>
                    <div className="tag-status">
                        {data?.Media.isAdult && <AdultOnly />}
                        {data?.Media.isLicensed && <Badge hover/>}
                    </div>
                    <div className="detail-item">
                        <b>Title</b>: {title(data?.Media.title)}{" "}
                        {`(${data?.Media.title.native})`}
                    </div>
                    <div className="detail-item">
                        <b>Type</b>: {data?.Media.type}
                    </div>
                    <div className="detail-item">
                        <b>Total Episode</b>: {data?.Media.episodes}
                    </div>
                    <div className="detail-item">
                        <b>Released</b>: {data?.Media.startDate?.year}-
                        {convertNumber(data?.Media.startDate?.month)}-
                        {convertNumber(data?.Media.startDate?.day)}
                    </div>
                    <div className="detail-item">
                        <b>Synopsis</b>:<br />{" "}
                        <p>{stripTags(data?.Media.description ?? "")}</p>
                    </div>
                    {collection.length > 0 && (
                        <div className="collection-list">
                            {title(data?.Media.title)} has been added to your
                            collection below:
                        </div>
                    )}
                    {collection.length > 0 &&
                        collection.map((col) => (
                            <Link
                                className="collection-item"
                                key={col.title}
                                to={`/collection/${col.title}`}
                            >
                                &#8594;
                                <span>{col.title}</span>
                            </Link>
                        ))}
                </div>
            </div>
            <Modal
                title="Select Collection"
                isOpen={isOpenModal}
                onClose={handleCloseModal}
                children={
                    <AddToCollectionForm
                        addToCollection={addToCollection}
                        onClose={handleCloseModal}
                        added={collection}
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

    .content-detail {
        display: flex;
        justify-content: center;
        margin: 0 64px;
        padding: 0 50px;
        .img-content {
            display: flex;
            flex-direction: column;
            img {
                transform: translateY(-50%);
                @media (max-width: 768px) {
                    transform: translateY(-15%);
                }
                @media (max-width: 480px) {
                    transform: translateY(-15%);
                    padding: 0 20px;
                    margin: 0 20px;
                }
            }
            .button-container-detail {
                display: flex;
                justify-content: center;
                margin-top: -150px;
                .button-add {
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
                @media (max-width: 768px) {
                    margin-top: -40px;
                }
                @media (max-width: 480px) {
                    margin-top: -40px;
                }
            }
            @media (max-width: 768px) {
                display: flex !important;
                justify-content: center !important;
                align-items: center;
            }
        }
        .detail {
            margin-bottom:50px;
            .detail-item {
                margin-bottom: 5px;
            }
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            .main-title {
                margin-top: -45px;
                color: #fff;
                z-index: 1;
                @media (max-width: 768px) {
                    display: none;
                }
            }
            .tag-status {
                align-self: start;
                gap: 5px;
                display: flex;
                flex-direction: row;
                margin-top: 5px;
            }
            h2 {
                text-align: center;
                margin: 5px;
            }
            .collection-list {
                margin-top: 10px;
                align-self: start;
            }
            .collection-item {
                margin-left: 20px;
                text-decoration: none;
                color: #11101d;
                align-self: start;
                span {
                    margin-left: 10px;
                    font-weight: bold;
                }
            }
            p {
                text-align: justify;
            }
            @media (max-width: 768px) {
                display: block !important;
                margin-top: 10px;
            }
            @media (max-width: 480px) {
                display: block !important;
                margin-top: 10px;
            }
        }
        @media (max-width: 768px) {
            display: block !important;
            padding: 0 40px;
            margin: 0 40px;
        }

        @media (max-width: 480px) {
            display: block !important;
            padding: 0 20px;
            margin: 0 20px;
        }
    }
`;

export default AnimeDetail;
