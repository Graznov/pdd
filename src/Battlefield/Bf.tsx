import classNames from 'classnames/bind';
import styles from './bf.module.css';
import {NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {useEffect} from "react";
import {resetUserData, setUserName} from "../store/userDataSlice.ts";
import {setWind} from "../store/styleSlise.ts";

const cx = classNames.bind(styles);

function Bf(){

    // const pathname  = useLocation();


    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    // dispatch(setWind('exam'))
    const wind = useAppSelector(state => state.styleSlice.wind)
    const title = useAppSelector(state => state.styleSlice.title)
    const UserData = useAppSelector(state => state.userDataSlice)
    console.log("%c"
        + `Bf.tsx\nRENDER\nwind: ${wind}`,
        "color:tomato;font-size:17px;");
    const name = (UserData.entrance)?UserData.userName:'LogIn';
    document.title = title

    useEffect(() => {

        console.log("%c"
            + `Bf.tsx\nДо обновления UserData`,
            "color:tomato;font-size:17px;");

        if(UserData.entrance)return

        console.log("%c"
            + `Bf.tsx\nupdate UserData`,
            "color:tomato;font-size:17px;");
            const headersToken = localStorage.getItem('PDD_accessToken') || ''

            fetch(`http://localhost:3000/user/${localStorage.getItem('PDD_id')}`, {
                method: 'GET', // Указываем метод GET
                headers: {
                    'Content-Type': 'application/json', // Указываем тип содержимого
                    'Authorization': headersToken // Если требуется авторизация
                },
                credentials: "include",
            })
                .then((response) => {

                    if (!response.ok) {
                        // cleanData()
                        dispatch(resetUserData())
                        navigate('/login')
                        throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`)
                    }

                    return response.json()
                })
                .then(data=>{

                    if (data.accessToken) {
                        localStorage.setItem('PDD_accessToken', data.accessToken)
                        dispatch(setUserName(data))
                    }else {
                        console.log(`NO accessToken`)
                    }
                })
    }, []);


    return (
            <div className={cx('container')}>

                <header>
                    <div className={cx('content')}>

                        <div className={cx('header_btnArea')}>

                            <NavLink
                                to={'/examticket'}
                                onClick={()=>dispatch(setWind('exam'))
                            }>Экзамен</NavLink>
                            <NavLink
                                to={'/allquestions'}
                                onClick={()=>dispatch(setWind('marafon'))}
                                    >Марафон</NavLink>
                            <NavLink
                                to={'/search'}
                                onClick={()=>dispatch(setWind('search'))}
                            >Поиск</NavLink>

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