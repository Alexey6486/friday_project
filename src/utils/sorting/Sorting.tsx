import React from "react";
import s from './Sorting.module.scss';

type PropsType = {
    sortDirection: string
    onlyMyPacks?: boolean
    sortRegular: (sortDirection: string) => void
    sortCheck?: () => void
}

export const Sorting = (props: PropsType) => {

    const {sortDirection, onlyMyPacks, sortRegular, sortCheck} = props;

    const radioSort = <div>
        <input type={'checkbox'} id={'radioMyPacks'} checked={onlyMyPacks} onChange={sortCheck}/>
        <label htmlFor="radioMyPacks">only my packs</label>
    </div>
    const regularSort = <button className={s.sortBtn} onClick={() => sortRegular(sortDirection)}>{sortDirection}</button>
    const sortTypeCheck = sortDirection === 'user_id' ? radioSort : regularSort;

    return (
        <>
            {sortTypeCheck}
        </>
    )
}