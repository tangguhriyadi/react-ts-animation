/** @jsxImportSource @emotion/react */
import React, { useState, useMemo, useRef, useEffect } from "react";
import useAnimeList from "./hooks/useAnimeList";
import Pagination from "./components/Pagination";
import { Anime, PageInfo } from "./types";
import { homePageStyle } from "./style";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import Checklist from "../../assets/checklist.svg";
import Modal from "../../components/Modal";
import AddToCollectionForm from "./components/AddToCollectionForm";
import DefaultImage from "../../assets/default.png";
import { handleImageError, title } from "../../utils/constant";
import AdultOnly from "../../components/AdultOnly";
import Badge from "../../components/Badge";
import Format from "../../components/Format";

const Home: React.FC = () => {
    const [page, setPage] = useState<number>(1);

    const [isChecking, setIsChecking] = useState<boolean>(false);

    const [addToCollection, setAddToCollection] = useState<Anime[]>([]);

    const { error, loading, data } = useAnimeList({ page });

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const div1Ref = useRef<HTMLImageElement>(null);

    const div2Ref = useRef<HTMLDivElement>(null);

    const handleSetDefaultState = (): void => {
        setIsChecking(false);
        setAddToCollection([]);
    };

    const handleOpenModal = (): void => {
        setIsOpenModal(true);
    };

    const handleCloseModal = (): void => {
        setIsOpenModal(false);
    };

    const pageInfo = useMemo<PageInfo>(() => {
        return {
            currentPage: data?.Page.pageInfo.currentPage || 1,
            total: data?.Page.pageInfo.total || 1,
            hasNextPage: data?.Page.pageInfo.hasNextPage || false,
            lastPage: data?.Page.pageInfo.lastPage || 1,
            perPage: data?.Page.pageInfo.perPage || 1,
        };
    }, [data]);

    const navigate = useNavigate();

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                if (entry.target === div1Ref.current) {
                    // Mengupdate lebar div2 saat div1 berubah lebar
                    div2Ref.current!.style.width = `${entry.contentRect.width}px`;
                }
            }
        });

        if (div1Ref.current) {
            resizeObserver.observe(div1Ref.current);
        }

        return () => {
            if (div1Ref.current) {
                resizeObserver.unobserve(div1Ref.current);
            }
        };
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error </p>;

    const { currentPage, total: totalPage } = pageInfo;

    const handlePageChange = (selected: number): void => {
        setPage(selected);
        handleSetDefaultState();
    };

    const handlePreviousPage = (): void => {
        if (currentPage > 1) {
            setPage(currentPage - 1);
        }
        handleSetDefaultState();
    };

    const handleNextPage = (): void => {
        if (currentPage < totalPage) {
            setPage(currentPage + 1);
        }
        handleSetDefaultState();
    };

    const collectionMutation = (anime: Anime) => {
        let arr: Anime[] = [];
        if (addToCollection.length > 0) arr.push(...addToCollection);
        const isExist = arr.some((ar) => ar.id === anime.id);
        if (isExist) {
            arr = arr.filter((ar) => ar.id !== anime.id);
        } else {
            arr.push(anime);
        }
        setAddToCollection(arr);
    };

    const handleImageClick = (anime: Anime): void => {
        if (!isChecking) {
            navigate(`/anime-detail/${anime.id}`);
            return;
        }
        collectionMutation(anime);
    };

    const renderCheckBox = (id: number): JSX.Element => {
        const isChecked = addToCollection.some(
            (collection) => collection.id === id
        );
        return (
            <div className="checkbox">
                {isChecked && <img src={Checklist} alt="" loading="lazy"></img>}
            </div>
        );
    };

    const renderCollectionButtons = (): JSX.Element => {
        return (
            <>
                {isChecking ? (
                    <>
                        {addToCollection.length > 0 && (
                            <button
                                onClick={() => confirmMutation()}
                                css={homePageStyle.button}
                            >
                                Confirm
                            </button>
                        )}

                        <button
                            onClick={() => handleSetDefaultState()}
                            css={homePageStyle.buttonCancel}
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setIsChecking(!isChecking)}
                        css={homePageStyle.button}
                    >
                        Add to Collection
                    </button>
                )}
            </>
        );
    };

    const confirmMutation = () => {
        if (addToCollection.length > 0) {
            handleOpenModal();
        }
    };

    return (
        <div>
            <div css={homePageStyle.buttonContainer}>
                {renderCollectionButtons()}
            </div>
            {isChecking && (
                <div css={homePageStyle.direction}>Select Your Anime</div>
            )}
            <ul css={homePageStyle.gridStyle}>
                {data &&
                    data?.Page.media.map((anime: Anime) => (
                        <li
                            key={anime.id}
                            onClick={() => handleImageClick(anime)}
                        >
                            {isChecking && renderCheckBox(anime.id)}
                            <div className="header-status">
                                <div className="tag-status">
                                    {anime.isAdult && <AdultOnly />}
                                    {anime.isLicensed && <Badge />}
                                </div>
                                <div className="tag-format">
                                    <Format format={anime.format} />
                                </div>
                            </div>
                            <img
                                className="image-anime"
                                css={isChecking && darkImage}
                                src={
                                    anime.coverImage.large ??
                                    anime.coverImage.medium ??
                                    DefaultImage
                                }
                                alt="../../assets/default.png"
                                onError={handleImageError}
                                loading="lazy"
                                ref={div1Ref}
                            />
                            <div className="title-container" ref={div2Ref}>
                                <div className="year">
                                    {`(${
                                        anime.startDate?.year
                                            ? anime.startDate?.year
                                            : anime.endDate?.year
                                    })`}
                                </div>
                                <div className="title">
                                    {title(anime.title)}
                                </div>
                                <div className="overlay"></div>
                            </div>
                        </li>
                    ))}
            </ul>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPage}
                handlePageChange={handlePageChange}
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage}
            />
            <Modal
                title="Select Collection"
                isOpen={isOpenModal}
                children={
                    <AddToCollectionForm
                        addToCollection={addToCollection}
                        onClose={handleCloseModal}
                        handleSetDefaultState={handleSetDefaultState}
                    />
                }
            />
        </div>
    );
};

const darkImage = css`
    filter: brightness(0.5);
    &:hover {
        filter: contrast(0.5);
    }
`;

export default Home;
