import classNames from 'classnames/bind';
import styles from './bf.module.css';
import {NavLink, Outlet} from "react-router-dom";
import {useAppSelector} from "../store/hooks.ts";

const cx = classNames.bind(styles);

function Bf(){

    const UserData = useAppSelector(state => state.userDataSlice)

    const name = (UserData.entrance)?UserData.userName:'LogIn';

    return (
            <div className={cx('container')}>

                <header>
                    <div className={cx('content')}>

                        <div className={cx('header_btnArea')}>

                            <NavLink to={'/examticket'}>Экзамен</NavLink>
                            <NavLink to={'/allquestions'}>Марафон</NavLink>
                            <NavLink to={'/search'}>Поиск</NavLink>

                        </div>

                        <div className={cx('header_User', 'header_btnArea')}>
                            <NavLink
                                to={(UserData.entrance)?'/userdata':'/login'}
                                className={cx('header_User_Name')}>
                                {name}
                            </NavLink>
                            {/*<img width='41px' src="https://images.icon-icons.com/10/PNG/256/user_person_customer_man_1532.png" alt="Photo"/>*/}
                        </div>

                    </div>
                </header>

                <main>
                    <div className={cx('content')}>

                        <Outlet/>

                    </div>
                </main>

            </div>
    )
}

export default Bf