import styles from "./userdata.module.css";
import classNames from "classnames/bind";
import {useAppSelector} from "../../store/hooks.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const cx = classNames.bind(styles);


function UserData(){

    const navigate = useNavigate()
    const UserData = useAppSelector(state => state.userDataSlice)

    console.log(UserData)
    useEffect(() => {
        if(!UserData.entrance) navigate('/login')
    }, [UserData.entrance]);


    console.log(UserData)

    return (
        <div className={cx("userData")}>
            <div className={cx('user-name')}>{UserData.userName} <span>user_id: {UserData.id}</span> </div>
        </div>
    )
}

export default UserData;