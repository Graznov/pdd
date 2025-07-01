import classNames from 'classnames/bind';
import styles from './bf.module.css';
import {NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {useEffect} from "react";
import {resetUserData, setUserName} from "../store/userDataSlice.ts";
import {setWind} from "../store/styleSlise.ts";
import BackError from "./UserData/BackError/BackError.tsx";
import {
    cleanError,
    setErrorStatus,
    setErrorText,
    setErrorTitle,
    setErrortWindWisible
} from "../store/backErrorSlise.ts";

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

    let errorTimer:number|undefined

    useEffect(() => {

        console.log("%c"
            + `Bf.tsx\nДо обновления UserData`,
            "color:tomato;font-size:17px;");

        // if(!UserData.entrance)return
        clearTimeout(errorTimer)

        console.log("%c"
            + `Bf.tsx\nupdate UserData`,
            "color:tomato;font-size:17px;");
            const headersToken = localStorage.getItem('PDD_accessToken') || ''

        // if(UserData.entrance){

            console.log('FETCH')
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
                        // console.log(response)
                        //
                        // dispatch(setErrorTitle('Ошибка'));
                        // dispatch(setErrorStatus(response.status || 500));
                        // dispatch(setErrorText(response.statusText));
                        // dispatch(setErrortWindWisible());
                        // navigate('/login')

                        throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`)
                    }

                    dispatch(setErrorTitle('данные получены'));
                    dispatch(setErrorStatus(response.status || 500));
                    dispatch(setErrorText(response.statusText));
                    dispatch(setErrortWindWisible());

                    return response.json()
                })
                .then(data=>{

                    if (data.accessToken) {
                        localStorage.setItem('PDD_accessToken', data.accessToken)
                        dispatch(setUserName(data))

                        // dispatch(setErrorTitle('данные обновлены'));
                        // dispatch(setErrorText(err));
                        // dispatch(setErrorStatus(err.status || 500));
                        // dispatch(setErrortWindWisible());
                    }else {
                        console.log(`NO accessToken`)
                        // dispatch(setErrorTitle('Ошибка'));
                        // dispatch(setErrorText(err));
                        // dispatch(setErrorStatus(err.status || 500));
                        // dispatch(setErrortWindWisible());
                    }
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                    dispatch(setErrorTitle('Fetch error:'));
                    dispatch(setErrorStatus(error.status || 500));
                    dispatch(setErrorText(error.statusText));
                    dispatch(setErrortWindWisible());
                });
        // }



        errorTimer = setTimeout(()=>{
            dispatch(cleanError(null))
        },5000)
    }, []);


    return (
            <div className={cx('container')}>

                <BackError/>

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