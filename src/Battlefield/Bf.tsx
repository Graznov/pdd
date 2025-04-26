import classNames from 'classnames/bind';
import styles from './bf.module.css';
import {NavLink, Outlet} from "react-router-dom";
// import DefaultComponent from "./DefaultComponent/DefaultComponent.tsx";

const cx = classNames.bind(styles);

function Bf(){

    return (
            <div className={cx('container')}>

                <header>
                    <div className={cx('content')}>

                        <div className={cx('header_btnArea')}>

                            <NavLink to={'/examticket'}>Экзамен</NavLink>
                            <NavLink to={'/allquestions'}>Марафон</NavLink>
                            <NavLink to={'/search'}>Поиск</NavLink>

                        </div>

                        <div className={cx('header_User')}>
                            <NavLink
                                to={'/user'}
                                className={cx('header_User_Name')}>
                                User13
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