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
            {'backError_visible' : errorData.backErrorWindVisible})}

        >
            {/*<button onClick={dispatch(cleanError(null))}>*/}
            {/*    X*/}
            {/*</button>*/}
            <div className={cx('backError_title')}>
                {/*Не удалось сохранить данные*/}
                {errorData.title}
            </div>
            <div className={cx('backError_status')}>
                {/*400-BAD_REQUEST*/}
                {errorData.status}
            </div>
            <div className={cx('backError_text')}>
                {/*Попробуйте позже или напишите в поддержку: support@example.com*/}
                {errorData.text}
            </div>

        </div>
    )
}

export default BackError;
