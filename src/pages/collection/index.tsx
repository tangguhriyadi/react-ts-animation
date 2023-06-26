/** @jsxImportSource @emotion/react */
import React, { useCallback, useState } from "react";
// import Sidenav from "./components/Sidenav";
import { css } from "@emotion/react";
import Book from "../../assets/book.png";
import Modal from "../../components/Modal";
import AddCollectionForm from "./components/AddCollectionForm";

const Collection: React.FC<{}> = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = (): void => {
        setIsOpen(true);
    };

    const handleCloseModal = (): void => {
        setIsOpen(false);
    };
    const dataCollection: any[] = [
        // {
        //     id: 1,
        //     title: "collection1",
        // },
    ];
    const renderCollection = useCallback((): JSX.Element => {
        return (
            <div css={style.gridStyle}>
                <ul>
                    {dataCollection &&
                        dataCollection.map((collection: any) => (
                            <li key={collection.id}>
                                <img src={Book} alt="" />
                                <div>{collection.title}</div>
                            </li>
                        ))}
                </ul>
            </div>
        );
    }, [dataCollection]);

    return (
        <>
            <div css={style.title}>
                <h1>Collections</h1>
                <div css={style.buttonContainer}>
                    <button onClick={handleOpenModal} css={style.button}>
                        Add New
                    </button>
                </div>
            </div>
            {dataCollection.length > 0 && renderCollection()}
            <Modal
                title="Add New Collection"
                isOpen={isOpen}
                children={<AddCollectionForm onClose={handleCloseModal} />}
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
            align-items: center;
            text-align: center;

            img {
                width: 100%;
                max-width: 275px;
                height: 300px;
                object-fit: cover;
                border-radius: 8px;
                cursor: pointer;
            }

            div {
                margin-top: 10px;
                font-weight: bold;
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
