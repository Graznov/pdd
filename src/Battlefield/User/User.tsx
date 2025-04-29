import classNames from "classnames/bind";
import styles from "./user.module.css";
import {useAppSelector} from "../../store/hooks.ts";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";

const cx = classNames.bind(styles);


function User(){

    const navigate = useNavigate()

    const entrance = useAppSelector(state => state.userDataSlice.entrance)


    console.log(`entrance: ${entrance}`)

    useEffect(() => {
        (entrance) ? navigate('/user/userdata') : navigate('/user/login')
    }, [entrance]);


        return (
            <Outlet/>
        )




}

export default User;