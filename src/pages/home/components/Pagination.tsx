/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from "@emotion/react";
import {
    activePageStyles,
    nextPrevButtonStyles,
    paginationItemStyles,
    paginationLinkStyles,
} from "./style";
import useResponsive from "../hooks/useResponsive";
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

    const { isMobile, isTablet } = useResponsive();

    const paginationItems: JSX.Element[] = [];

    const maxPaginationItems = isMobile ? 5 : isTablet ? 8 : 10;

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
            ${paginationItemStyles}
            ${paginationLinkStyles}
        ${i === currentPage && activePageStyles}
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
        <div
            css={css`
                display: flex;
                justify-content: center;
                margin-top: 20px;
            `}
        >
            <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                css={nextPrevButtonStyles}
            >
                Previous
            </button>

            {paginationItems}

            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                css={nextPrevButtonStyles}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
