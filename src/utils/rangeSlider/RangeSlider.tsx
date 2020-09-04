import React, {useState} from "react";
import s from './RangeSlider.module.scss';
import {getTrackBackground, Range} from "react-range";

type PropsType = {
    min: number
    max: number
    step: number
    fromVal: number
    toVal: number
    searchByMinMax: (valArr: Array<number>) => void
}

export const RangeSlider = (props: PropsType) => {

    const {fromVal, max, min, step, toVal, searchByMinMax} = props;

    const MIN = min;
    const MAX = max;
    const STEP = step;
    const [range, setRange] = useState([fromVal, toVal]);

    const searchHandler = () => {
        searchByMinMax(range);
    }

    return (
        <div className={s.rangeSlider}>
            <Range values={range} step={STEP} min={MIN} max={MAX} onChange={values => setRange(values)}
                   renderTrack={({ props, children }) => (
                       <div className={s.rangeSlider__track} onMouseDown={props.onMouseDown} onTouchStart={props.onTouchStart}
                            style={{...props.style,}}>
                           <div className={s.rangeSlider__progress} ref={props.ref}
                                style={{
                                    background: getTrackBackground({
                                        values: range,
                                        colors: ['#fff', '#5d626f', '#fff'],
                                        min: MIN,
                                        max: MAX
                                    }),
                                }}
                           >
                               {children}
                           </div>
                       </div>
                   )}
                   renderThumb={({ index, props, isDragged }) => (
                       <div className={s.rangeSlider__thumb} {...props} style={{ ...props.style, }} >
                           <div className={s.rangeSlider__thumbInner} style={{backgroundColor: isDragged ? '#fa9716' : '#fff'}}>
                               <div className={s.rangeSlider__thumbInnerIndex}>
                                   {range[index]}
                               </div>
                           </div>
                       </div>
                   )}
            />
            <button onClick={searchHandler}>Search</button>
        </div>
    )
}