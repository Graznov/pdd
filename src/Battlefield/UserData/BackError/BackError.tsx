import classNames from 'classnames/bind';
import styles from "./backError.module.css";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {cleanError} from "../../../store/backErrorSlise.ts";


const cx = classNames.bind(styles);

function BackError(){

    const dispatch = useAppDispatch()

    const errorData = useAppSelector(state => state.backErrorSlice);

    console.log(errorData)

    return(
        <div className={cx('backError',
            {'backError_visible' : errorData.backErrorWindVisible})}>
            <div className={cx('string', 'backError_title')}>
                <div>title:</div>
                <span>{errorData.title}</span>
            </div>
            <div className={cx('string', 'backError_status')}>
                <div>status:</div>
                <span>{errorData.status}</span>
            </div>
            <div className={cx('string', 'backError_text')}>
                <div>text:</div>
                <span>{errorData.text}</span>
            </div>

        </div>
    )
}

export default BackError;
