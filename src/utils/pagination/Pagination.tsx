import React, {useEffect, useState} from "react";
import './Pagination.styles.scss';

type PropsType = {
    currentPage: number
    totalItems: number
    itemsOnPage: number
    pagesInPortion: number
    currentPortion: number
    onPageChange: (page: number) => void
    onShowByChange: (showBy: number) => void
    onPortionChange: (flag: boolean) => void
    setPortionChange: (portion: number) => void
}

export const Pagination = (props: PropsType) => {

    const {currentPage, itemsOnPage, onPageChange, pagesInPortion, totalItems, onShowByChange, onPortionChange, currentPortion, setPortionChange} = props;

    const onPageChangeHandler = (page: number) => {
        onPageChange(page);
    }

    const totalPages = Math.ceil(totalItems / itemsOnPage);
    const totalPortions = Math.ceil(totalPages / pagesInPortion);

    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    const nextPortion = () => {
        onPortionChange(true)
    };
    const prevPortion = () => {
        onPortionChange(false)
    };

    const firstPageInPortion = (currentPortion - 1) * pagesInPortion + 1;
    const lastPageInPortion = currentPortion * pagesInPortion;

    const pagesMap = pages
        .filter(f => f >= firstPageInPortion && f <= lastPageInPortion)
        .map(m => {
            return (
                <button key={m} onClick={() => onPageChangeHandler(m)}
                        className={m === currentPage ? 'active pageBtn' : 'pageBtn'}>{m}</button>
            )
        })

    const portionWithLastPage = (page: number) => {
        onPageChange(page);
        setPortionChange(totalPortions);
    };

    const portionWithFirstPage = (page: number) => {
        onPageChange(page);
        setPortionChange(1);
    };

    const lastPage = pages.map(page => {
        if (page === pages.length) {
            return (
                <div key={page} className={'paginationBlock__pre-after'}>
                    <div className={'paginationDots'}>...</div>
                    <button onClick={() => portionWithLastPage(page)}
                            className={page === currentPage ? 'active pageBtn' : 'pageBtn'}>{page}</button>
                </div>
            )
        }
        return null;
    });

    const firstPage = pages.map(page => {
        if (page === 1) {
            return (
                <div key={page} className={'paginationBlock__pre-after'}>
                    <button onClick={() => portionWithFirstPage(page)}
                            className={page === currentPage ? 'active pageBtn' : 'pageBtn'}>{page}</button>
                    <div className={'paginationDots'}>...</div>
                </div>
            )
        }
        return null;
    });

    const [openSelect, setOpenSelect] = useState(false);
    const onSelectOpenClick = () => {
        setOpenSelect(!openSelect);
    }
    const showByChange = (showBy: number) => {
        onShowByChange(showBy);
    }

    useEffect(() => {

        const body = document.querySelector('body');

        const closeShowBy = (e: MouseEvent) => {

            const target = e.target as HTMLElement;

            if (e.target) {
                if (!target.classList.contains('paginationSelect') &&
                    !target.classList.contains('paginationSelect__option')) setOpenSelect(false)
            }
        }

        if (body) body.addEventListener('click', closeShowBy);

        return () => {
            if (body) body.removeEventListener('click', closeShowBy);
        }

    }, [])

    return (
        <div className={'pagination'}>
            <div className={'paginationBlock'}>
                {currentPortion > 1 && <button onClick={prevPortion}>prev</button>}
                {currentPortion > 1 && firstPage}
                {pagesMap}
                {currentPortion < totalPortions && lastPage}
                {currentPortion < totalPortions && <button onClick={nextPortion}>next</button>}
            </div>
            <div className={'paginationSelectBlock'}>
                <div className={'paginationSelectBlock__title'}>Show by:</div>
                <div className={openSelect ? 'paginationSelect open' : 'paginationSelect'}
                     onClick={onSelectOpenClick}>
                    <div className={'paginationSelect__current'}>{itemsOnPage}</div>
                    <div
                        className={openSelect ? 'paginationSelect__options open' : 'paginationSelect__options'}>
                        <div className={'paginationSelect__option'} onClick={() => showByChange(5)}>5</div>
                        <div className={'paginationSelect__option'} onClick={() => showByChange(10)}>10</div>
                        <div className={'paginationSelect__option'} onClick={() => showByChange(15)}>15</div>
                        <div className={'paginationSelect__option'} onClick={() => showByChange(20)}>20</div>
                    </div>
                </div>
            </div>
        </div>

    )
}