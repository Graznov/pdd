import styles from "./userdata.module.css";
import classNames from "classnames/bind";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Exit from '/src/assets/exit.svg?react'
import DeleteAcc from '/src/assets/delete-profile.svg?react'
import Close from '/src/assets/close.svg?react'
import Star from '/src/assets/star.svg?react'
import ErrorSVG from '/src/assets/error.svg?react'
import {resetUserData} from "../../store/userDataSlice.ts";
import ErrorPage from "../../Errorpage/ErrorPage.tsx";
import {setTitle, setWind} from "../../store/styleSlise.ts";


const cx = classNames.bind(styles);


function UserData(){

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    // dispatch(setWind('user'))
    const UserData = useAppSelector(state => state.userDataSlice)

    console.log(UserData)
    useEffect(() => {
        if(!UserData.entrance) navigate('/login')
    }, [UserData.entrance]);


    console.log(UserData)



    const logOut = () => {
        console.log('Exit Account');

        localStorage.removeItem('PDD_accessToken');
        localStorage.removeItem('PDD_id');
        dispatch(resetUserData())
        fetch('http://localhost:3000/del-cookie', {
            method: 'POST', // Метод запроса
            credentials: 'include' // Важно для отправки/получения cookie
        })
            .then(response => response.text()) // Читаем ответ как текст
            .then(data => {
                console.log(data); // Выводим ответ сервера ("Cookie has been set!")
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });

    }

    const deleteAccount = () => {
        console.log('delete Account');

        fetch(`http://localhost:3000/user/delete/${UserData.id}`, {
            method: 'DELETE', // Метод запроса
            credentials: 'include', // Важно для отправки/получения cookie
            headers: {
                'Content-Type': 'application/json', // Устанавливаем заголовок Content-Type для указания типа данных
                'Authorization': localStorage.getItem('PDD_accessToken')!, // Токен передаётся в заголовке
            },
        })
            .then(response => {
                response.text()
                console.log(response)
                if(response.status === 200){
                    dispatch(resetUserData())
                    localStorage.removeItem('PDD_accessToken');
                    localStorage.removeItem('PDD_id');
                    navigate('/login')
                } else if (response.status === 401){
                    dispatch(resetUserData())
                    localStorage.removeItem('PDD_accessToken');
                    localStorage.removeItem('PDD_id');
                    navigate('/login')
                    alert('Авторизуйтесь и повторите попытку')
                }
            }) // Читаем ответ как текст
            .then(data => {
                console.log(data); // Выводим ответ сервера ("Cookie has been set!")
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
    }

    const [deleteWindow, setDeleteWindow] = useState<boolean>(false)

    const [inputValue, setInputValue] = useState('');


    const [activeBtn, setActiveBtn] = useState<string>('none')

    // const [activeUserWind, setActiveUserWind] = useState ()
    //
    // useEffect(() => {
    //     if(activeBtn==='error'){
    //         setActiveUserWind(
    //             // <ErrorPage/>
    //             <div>
    //                 ERRORS
    //             </div>
    //         )
    //     }else if (activeBtn==='star'){
    //         setActiveUserWind(
    //             <div>
    //                 Stars
    //             </div>
    //         )
    //     }
    // }, [activeBtn]);

    return (

        <div className={cx('container')}>
            <div className={cx("userData")}>
                <div className={cx('wind-delete-akk', {
                    'wind-delete-akk_Visible':deleteWindow
                })}>
                    <button
                        onClick={()=> {
                            setDeleteWindow(false)
                            setInputValue('')
                        }}
                        className={cx('wind-delete-akk-Btn-Close')}>
                        <Close/>
                    </button>

                    <div className={cx('wind-delete-akk-text')}>
                        для удаления аккаунта введите свой ник:
                    </div>
                    <div className={cx('wind-delete-akk-UserName')}>
                        {UserData.userName}
                    </div>

                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        type="text"/>

                    <div className={cx('wind-delete-akk_BTN-area', {
                        'wind-delete-akk_BTN-area-VISIBLE':inputValue===UserData.userName,
                    })}>
                        <button onClick={deleteAccount}>Удалить</button>
                        <button onClick={()=> {
                            setDeleteWindow(false)
                            setInputValue('')
                        }}>Отмена</button>
                    </div>
                </div>
                <div className={cx("userData-top_content")}>
                    <div className={cx('user-name')}>{UserData.userName} <span>user_id: {UserData.id}</span></div>
                    <div className={cx('btn-area')}>
                        <button onClick={logOut}><Exit/></button>
                        <button onClick={()=>setDeleteWindow(true)}><DeleteAcc/></button>
                    </div>
                </div>

                <div className={cx("userData_main")}>
                    <div className={cx("userData_main_btn-area")}>
                        <NavLink
                            onClick={()=>setActiveBtn('star')}
                            to={'/userdata/stars'}
                            className={cx("userData_main_btn-area_Rtn",
                            "userData_main_stars",{
                            'activeBtn':activeBtn==='star'
                        })}>
                            <Star/>
                            {UserData.starQuestions.length}
                        </NavLink>

                        <NavLink
                            onClick={()=> {
                                setActiveBtn('error')

                            }}
                            to={'/userdata/errors'}
                            className={cx("userData_main_btn-area_Rtn",
                            "userData_main_errors",{
                                'activeBtn':activeBtn==='error'
                            })}>
                            {UserData.errorQuestions.length}
                            <ErrorSVG/>
                        </NavLink>
                    </div>

                    {/*{activeUserWind}*/}

                    <Outlet/>


                </div>


            </div>
        </div>
    )
}

export default UserData;