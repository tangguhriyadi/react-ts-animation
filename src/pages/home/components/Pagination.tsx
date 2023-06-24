/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
interface Props {
    totalPages: number;
    currentPage: number;
    handlePageChange: (i: number) => void;
    handlePreviousPage: () => void;
    handleNextPage: () => void;
}

const Pagination: React.FC<Props> = (props): JSX.Element => {
    const {
        totalPages,
        currentPage,
        handlePageChange,
        handleNextPage,
        handlePreviousPage,
    } = props;
    const paginationItems: JSX.Element[] = [];
    const maxPaginationItems = 10;
    const halfMaxPaginationItems = Math.floor(maxPaginationItems / 2);
    let startPage = currentPage - halfMaxPaginationItems;
    let endPage = currentPage + halfMaxPaginationItems;

    if (startPage < 1) {
        startPage = 1;
        endPage = Math.min(totalPages, maxPaginationItems);
    }

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, totalPages - maxPaginationItems + 1);
    }

    for (let i = startPage; i < endPage; i++) {
        const itemStyles: SerializedStyles = css`
            display: inline-block;
            margin-right: 5px;
            cursor: pointer;
            color: ${i === currentPage ? "blue" : "black"};
            font-weight: ${i === currentPage ? "bold" : "normal"};
        `;
        paginationItems.push(
            <li
                key={i}
                className={`pagination-item ${
                    i === currentPage ? "active" : ""
                }`}
                onClick={() => handlePageChange(i)}
                css={itemStyles}
            >
                {i}
            </li>
        );
    }
    return (
        <>
            <li>
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    css={css`
                        margin-right: 5px;
                    `}
                >
                    Previous
                </button>
            </li>
            {paginationItems}
            <li>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    css={css`
                        margin-left: 5px;
                    `}
                >
                    Next
                </button>
            </li>
        </>
    );
};

export default Pagination;
