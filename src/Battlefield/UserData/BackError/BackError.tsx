import classNames from 'classnames/bind';
import styles from "./backError.module.css";
import { useAppSelector} from "../../../store/hooks.ts";
// import {cleanError} from "../../../store/backErrorSlise.ts";


const cx = classNames.bind(styles);

function BackError(){

    // const dispatch = useAppDispatch()
    // const entrance = useAppSelector(state => state.userDataSlice.entrance)
    // const wind = useAppSelector(state => state.styleSlice.wind)
    const errorData = useAppSelector(state => state.backErrorSlice);

    console.log(errorData)

    return(
        <div className={cx('backError',

            {'backError_visible' : errorData.backErrorWindVisible})}>
            <div className={cx('string', 'backError_title')}>
                <div>title:</div>
                <div className={cx('span')}>{errorData.title}</div>
            </div>
            <div className={cx('string', 'backError_status')}>
                <div>status:</div>
                <div className={cx('span')}>{errorData.status}</div>
            </div>
            <div className={cx('string', 'backError_text')}>
                <div>text:</div>
                <div className={cx('span')}>{errorData.text}</div>
            </div>

        </div>
    )
}

export default BackError;
