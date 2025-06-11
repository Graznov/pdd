import classNames from 'classnames/bind';
import styles from './starTest.module.css';
import {useAppSelector} from "../../../store/hooks.ts";

const cx = classNames.bind(styles);

function StarTest(){
    const UserData = useAppSelector(state => state.userDataSlice)
    console.log('StarTest.tsx', '\n', UserData)

    return(
        <div>
            {UserData.starQuestions.length}
        </div>
    )
}

export default StarTest;
