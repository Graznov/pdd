import classNames from "classnames/bind";
import styles from "./user.module.css";
import {useAppSelector} from "../../store/hooks.ts";

const cx = classNames.bind(styles);

function User(){

    const entrance = useAppSelector(state => state.userDataSlice.entrance)


    if(!entrance){

        return (
            <div>
                Login
            </div>
        )

    } else {

        return (
            <div>
                User
            </div>
        )

    }


}

export default User;