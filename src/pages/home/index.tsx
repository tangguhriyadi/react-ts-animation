/** @jsxImportSource @emotion/react */
import React, { useState, useMemo } from "react";
import useAnimeList from "./hooks/useAnimeList";
import Pagination from "./components/Pagination";
import { Anime, PageInfo } from "./types";
import { homePageStyle } from "./style";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import Checklist from "../../assets/checklist.svg";
import Modal from "../../components/Modal";
import AddToCollectionForm from "./components/AddToCollectionForm";

const Home: React.FC = () => {
    const [page, setPage] = useState<number>(1);

    const [isChecking, setIsChecking] = useState<boolean>(false);

    const [addToCollection, setAddToCollection] = useState<Anime[]>([]);

    const { error, loading, data } = useAnimeList({ page });

    const [isOpenModal, setIsOpenModal] = useState(false);

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error </p>;

    const { currentPage, total: totalPage } = pageInfo;

    const handlePageChange = (selected: number): void => {
        setPage(selected);
    };

    const handlePreviousPage = (): void => {
        if (currentPage > 1) {
            setPage(currentPage - 1);
        }
    };

    const handleNextPage = (): void => {
        if (currentPage < totalPage) {
            setPage(currentPage + 1);
        }
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
                {isChecked && <img src={Checklist} alt=""></img>}
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
                            onClick={() => setIsChecking(false)}
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
                            <img
                                css={isChecking && darkImage}
                                src={anime.coverImage.large}
                                alt=""
                            />
                            <div>{anime.title.romaji}</div>
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
