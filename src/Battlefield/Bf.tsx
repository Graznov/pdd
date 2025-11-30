import classNames from 'classnames/bind';
import styles from './bf.module.css';
import {NavLink, Outlet} from "react-router-dom";
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
import {STORAGE_KEYS} from "../store/constants.ts";

const cx = classNames.bind(styles);

// function cleanLS(){
//     localStorage.removeItem('PDD_accessToken')
//     localStorage.removeItem('PDD_examTicket')
//     localStorage.removeItem('PDD_id')
//     localStorage.removeItem('PDD_marafon')
// }


function Bf(){

    // const pathname  = useLocation();


    // const navigate = useNavigate()

    const dispatch = useAppDispatch()
    // dispatch(setWind('exam'))
    const wind = useAppSelector(state => state.styleSlice.wind)
    const title = useAppSelector(state => state.styleSlice.title)
    const UserData = useAppSelector(state => state.userDataSlice)
    console.log("%c"
        + `Bf.tsx\nRENDER\nwind: ${wind}\nUserData.entrance: ${UserData.entrance}`,
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
            // const headersToken = localStorage.getItem('PDD_accessToken') || ''
            const headersToken = localStorage.getItem(STORAGE_KEYS.PDD_ACCESSTOKEN) || ''


        // if(UserData.entrance){

            console.log('FETCH')
        if(localStorage.getItem(STORAGE_KEYS.PDD_ACCESSTOKEN)){
            fetch(`http://localhost:3000/user/${localStorage.getItem(STORAGE_KEYS.PDD_ID)}`, {
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

                    console.log(data)

                    if (data.accessToken) {
                        localStorage.setItem(STORAGE_KEYS.PDD_ACCESSTOKEN, data.accessToken)
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
                    // localStorage.removeItem('PDD_accessToken')
                    // localStorage.removeItem('PDD_examTicket')
                    // localStorage.removeItem('PDD_id')
                    // localStorage.removeItem('PDD_marafon')
                    // cleanLS()
                    STORAGE_KEYS.PDD_REMOVE_LS()

                    console.error('Fetch error:', error);
                    dispatch(setErrorTitle('Fetch error:'));
                    dispatch(setErrorStatus(error.status || 500));
                    dispatch(setErrorText(error.statusText));
                    dispatch(setErrortWindWisible());
                });
        }

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

                                onClick={()=>{
                                    if(!UserData.entrance) dispatch(setWind('user'))
                                }}
                                className={cx('header_User_Name')}>
                                {name}

                            </NavLink>
                            {/*<img width='41px' src="https://images.icon-icons.com/10/PNG/256/user_person_customer_man_1532.png" alt="Photo"/>*/}
                        </div>

                    </div>
                </header>

                <main>
                    <div className={cx('content')}>

                        {
                            // (wind===null)?<div className={cx('bikeGirl')}><img  src="https://github.com/Graznov/pdd/raw/master/public/1744092027827.jpg" alt="bike"/></div>:<Outlet/>
                            (wind===null)?<div className={cx('bikeGirl')}>
                                <img  src="https://xix-nv.gosuslugi.ru/netcat_files/48/190/1968592_0M6JH6CDJE924SR1E6FQ5XWE6X.png" alt="bike"/>
                            </div>:<Outlet/>
                        }


                        {/*<Outlet/>*/}

                    </div>
                </main>

            </div>
    )
}

export default Bf