import classNames from 'classnames/bind';
import styles from './starTest.module.css';
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import {setWind} from "../../../store/styleSlise.ts";

const cx = classNames.bind(styles);

function StarTest(){
    const dispatch = useAppDispatch()

    // dispatch(setWind('star'))
    const UserData = useAppSelector(state => state.userDataSlice)
    console.log('StarTest.tsx', '\n', UserData)

    return(
        <div>
            {UserData.starQuestions.length}
        </div>
    )
}

export default StarTest;
