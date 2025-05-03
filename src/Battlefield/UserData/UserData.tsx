import styles from "./userdata.module.css";
import classNames from "classnames/bind";
import {useAppSelector} from "../../store/hooks.ts";

const cx = classNames.bind(styles);


function UserData(){

    const UserData = useAppSelector(state => state.userDataSlice)

    console.log(UserData)

    return (
        <div className={cx("userData")}>
            <div className={cx('user-name')}>{UserData.userName} <span>{UserData.id}</span> </div>
        </div>
    )
}

export default UserData;