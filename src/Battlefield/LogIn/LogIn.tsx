import styles from "./login.module.css";
import classNames from "classnames/bind";
import React, {useEffect, useState} from "react";
import Eye from '/src/assets/eye.svg?react'
import Close from '/src/assets/close.svg?react'
import EyeHidden from '/src/assets/eye-hidden.svg?react'
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {setUserName} from "../../store/userDataSlice.ts";
import {
    cleanError,
    setErrorStatus,
    setErrorText,
    setErrorTitle,
    setErrortWindWisible
} from "../../store/backErrorSlise.ts";

const cx = classNames.bind(styles);

const FORM_LOGIN = {
    name:'',
    password:''
}

const FORM_REGISTRATION = {
    userName:'',
    // userEmail:'',
    password_1:'',
    password_2:'',
}

const ERROR = {
    name:false,
    // email:false,
    password:false,
}

function LogIn() {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const UserData = useAppSelector(state => state.userDataSlice)



    const [isLoginVisible, setIsLoginVisible] = useState(true);
    const [passVisible, setPassVisible] = useState(false);

    const [formLogIn, setFormLogIn] = useState(FORM_LOGIN);

    const [formRegistration, setFormRegistration] = useState(FORM_REGISTRATION);

    // const [error, setError] = useState(ERROR);
    const error = ERROR;

    useEffect(() => {
        if(UserData.entrance) navigate('/userdata')
    }, [UserData.entrance]);

    useEffect(()=>{
        console.log("%c" + `LogIn.tsx\nformRegistration: ${JSON.stringify(formRegistration)}`, "color:#559D4CFF;font-size:17px;");
    },[formRegistration])

    const [nameError, setNameError] = useState(false);

    let errorTimer:number|undefined
    const handleSubmit = (e:React.MouseEvent) => {
        e.preventDefault();
        console.log(isLoginVisible ? "Login form submitted" : "Register form submitted");


        clearTimeout(errorTimer)

        // Здесь можно добавить логику отправки данных на сервер
        if(!isLoginVisible){

            if(formRegistration.userName.length>5
                && formRegistration.password_1.length>7
                && formRegistration.password_1===formRegistration.password_2){
                
                console.log(`formRegistration: ${JSON.stringify({
                    name:formRegistration.userName,
                    password:formRegistration.password_1,
                })}`);

                //отправка на сервер

                fetch(`http://localhost:3000/user/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: formRegistration.userName,
                        password: formRegistration.password_1,
                    })
                })
                    .then((response) => {
                        if (!response.ok) {
                            // Обработка конфликта имени пользователя
                            if (response.status === 409) {
                                setNameError(true);
                                setTimeout(() => setNameError(false), 1000);
                                throw new Error('Это имя пользователя уже занято');
                            }

                            // Обработка других ошибок
                            return response.text().then(text => {
                                throw new Error(text || `Ошибка HTTP: ${response.status}`);
                            });
                        }
                        return response.json();
                    })
                    .then((data) => {

                        // Обновление состояния приложения
                        setFormLogIn(prev => ({
                            ...prev,
                            name: formRegistration.userName
                        }));

                        console.log(data)
                        setIsLoginVisible(!isLoginVisible);
                        setFormRegistration(FORM_REGISTRATION);

                        dispatch(setErrorTitle(data.message));
                        dispatch(setErrorStatus(data.status));

                        dispatch(setErrortWindWisible());

                    })
                    .catch((err) => {
                        console.error('Ошибка регистрации:', err);

                        dispatch(setErrorTitle('Ошибка регистрации'));
                        dispatch(setErrorText(err.message));
                        dispatch(setErrorStatus(err.status || 500));
                        dispatch(setErrortWindWisible());
                    });



                // setFormRegistration(FORM_REGISTRATION);

            } else if(formRegistration.userName.length<=5){
                // alert('Имя должно содержать более 5 символов')
                dispatch(setErrortWindWisible());
                dispatch(setErrorTitle(''));
                dispatch(setErrorText('Имя должно содержать более 5 символов'));



            } else if(formRegistration.password_1.length<=7){
                // alert('Пароль должен содержать ,больше 7 символов')
                dispatch(setErrortWindWisible());
                dispatch(setErrorTitle(''));
                dispatch(setErrorText('Пароль должен содержать ,больше 7 символов'));
            }else if (formRegistration.password_1!==formRegistration.password_2){
                // alert('Пароли не совпадают')
                dispatch(setErrortWindWisible());
                dispatch(setErrorTitle(''));
                dispatch(setErrorText('Пароли не совпадают'));

            } else {
                // alert('Не все поля заполнены')

                dispatch(setErrortWindWisible());
                dispatch(setErrorTitle(''));
                dispatch(setErrorText('Не все поля заполнены'));
            }


            // setTimeout(()=>{
            //     setError(ERROR)
            // },1000)

        } else{
            if(formLogIn.name.length && formLogIn.password.length){
                console.log(`formLogIn: ${JSON.stringify(formLogIn)}`);

                //отправка на сервер

                fetch(`http://localhost:3000/user/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: "include",
                    body: JSON.stringify(formLogIn)
                })
                    .then(async (response) => {
                        if (!response.ok) {
                            const errorData = await response.json().catch(() => ({}));
                            const message = errorData.message || response.statusText || 'Ошибка авторизации';

                            dispatch(setErrortWindWisible());
                            dispatch(setErrorTitle(
                                response.status === 401 || response.status === 400
                                    ? 'Неверный логин или пароль'
                                    : `Ошибка сервера (${response.status})`
                            ));
                            dispatch(setErrorStatus(response.status));
                            dispatch(setErrorText(message));

                            throw new Error(message);
                        }
                        return response.json();
                    })
                    .then((data) => {
                        if (!data.accessToken || !data.id) {
                            throw new Error('Неполные данные от сервера');
                        }

                        localStorage.setItem('PDD_accessToken', data.accessToken);
                        localStorage.setItem('PDD_id', data.id);
                        // dispatch(setListQuest(data.marafon))
                        dispatch(setUserName(data));
                        // console.log(data.marafon)
                        if(JSON.stringify(data.marafon)){
                            localStorage.setItem('PDD_marafon', JSON.stringify(data.marafon))
                        } else {
                            // localStorage.setItem('PDD_marafon', undefined)
                            // localStorage.setItem('PDD_marafon', '')
                        }



                        navigate('/userdata');
                    })
                    .catch((err) => {
                        console.error('Auth error:', err);
                        dispatch(setErrortWindWisible());
                        dispatch(setErrorTitle(
                            err.message.includes('Failed to fetch')
                                ? 'Сервер недоступен'
                                : 'Ошибка авторизации'
                        ));
                        dispatch(setErrorText(err.message));
                    });

            } else{
                // alert('Не все поля заполнены')
                dispatch(setErrortWindWisible());
                dispatch(setErrorTitle(''));
                dispatch(setErrorText('Не все поля заполнены'));

            }

        }


        errorTimer = setTimeout(()=>{
            dispatch(cleanError(null))
        },5000)
        // clearTimeout(errorTimer)
    };

    // console.log(`isLoginVisible: ${isLoginVisible}`);

    const [zachemVisible, setZachemVisible] = useState(false);
    return (
        <div className={cx("login-page")}>
            <div className={cx("form")}>
                <div className={cx("register-form", {
                    'register-form_show': !isLoginVisible
                })}>

                    <input
                        className={cx('input', {'error-name': nameError})}
                        onChange={(event) => {
                            setFormRegistration({
                                ...formRegistration,
                                userName: event.target.value
                            })
                        }}
                        value={formRegistration.userName}
                        type="text"
                        placeholder="Имя"/>

                    {/*<input*/}
                    {/*    className={cx('input', {'error-email':error.email})}*/}
                    {/*    onChange={(event)=>{*/}
                    {/*        setFormRegistration({*/}
                    {/*            ...formRegistration,*/}
                    {/*            userEmail: event.target.value*/}
                    {/*        })*/}
                    {/*    }}*/}
                    {/*    value={formRegistration.userEmail}*/}
                    {/*    type="text"*/}
                    {/*    placeholder="email address"/>*/}

                    <div className={cx('login-form_passContainer')}>

                        <input
                            onChange={(event) => {
                                setFormRegistration({
                                    ...formRegistration,
                                    password_1: event.target.value
                                })
                            }}
                            value={formRegistration.password_1}
                            type={(passVisible) ? "text" : "password"}
                            placeholder="Пароль"/>

                        <button className={cx('pass-visible-switch')} onClick={() => setPassVisible(!passVisible)}>
                            {(passVisible) ? <Eye/> : <EyeHidden/>}
                        </button>

                    </div>
                    <div className={cx('login-form_passContainer')}>
                        <input
                            className={cx({
                                'passTwo-red': formRegistration.password_1 !== formRegistration.password_2
                            })}
                            onChange={(event) => {
                                setFormRegistration({
                                    ...formRegistration,
                                    password_2: event.target.value
                                })
                            }}
                            value={formRegistration.password_2}
                            type={(passVisible) ? "text" : "password"}
                            placeholder="Подтверждение пароля"/>
                    </div>


                    <button
                        onClick={handleSubmit}
                        className={cx('form-button')}>
                        создать
                    </button>
                    <p className={cx("message")}>
                        Уже зарегестрирован?
                        <button onClick={() => {
                            setFormLogIn(FORM_LOGIN)
                            setFormRegistration(FORM_REGISTRATION)
                            setIsLoginVisible(!isLoginVisible)

                        }}>Войти</button>
                    </p>
                </div>
                <div className={cx("login-form", {
                    'login-form_none': !isLoginVisible
                })}>

                    <input
                        className={cx({'error': error.name})}
                        value={formLogIn.name}
                        onChange={(event) => {
                            setFormLogIn({
                                ...formLogIn,
                                name: event.target.value
                            })
                        }}
                        type="text"
                        placeholder="Имя"/>
                    <div className={cx('login-form_passContainer')}>
                        <input
                            className={cx({'error': error.password})}
                            value={formLogIn.password}
                            onChange={(event) => {
                                setFormLogIn({
                                    ...formLogIn,
                                    password: event.target.value
                                })
                            }}
                            type={(passVisible) ? "text" : "password"}
                            placeholder="Пароль"/>
                        <button className={cx('pass-visible-switch')} onClick={() => setPassVisible(!passVisible)}>
                            {(passVisible) ? <Eye/> : <EyeHidden/>}
                        </button>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className={cx('form-button')}>Войти
                    </button>
                    <p className={cx("message")}>
                        Нет аккаунта?
                        <button onClick={() => {
                            setFormLogIn(FORM_LOGIN)
                            setFormRegistration(FORM_REGISTRATION)
                            setIsLoginVisible(!isLoginVisible)
                        }}>Зарегестрироваться</button>
                    </p>
                </div>
                <button
                    className={cx('zachem')}
                    onClick={() => {setZachemVisible(true)}}
                >
                    Зачем регистрироваться?
                </button>

            </div>

            <div className={cx('zachem-text',{
                'zachem-text_visible':zachemVisible
            })}>
                <button
                    onClick={()=>{setZachemVisible(false)}}
                ><Close/></button>
                    <div className={cx('zachem-text_title')}>Зарегестрированные пользователи получают возможность:</div>
                    <div className={cx('zachem-text_content')}>видеть статистику решения экзаменационных билетов</div>
                    <div className={cx('zachem-text_content')}>добавлять вопросы в избранное</div>
                    {/*<div className={cx('zachem-text_content')}>марафон</div>*/}
                    <div className={cx('zachem-text_content')}>вопросы в которых были допущены ошибки будут сохраняться для последующего повторения</div>
                    <div className={cx('zachem-text_content')}>входить в свою учетную запись с разных устройств</div>
                    <div className={cx('zachem-text_content_cookie')}>Предупреждине мелким шрифтом: на сайте используются файлы cookie. Они используются исключительно для обеспечения базового функционала сайта. Мы не осуществляем сбор аналитической информации о действиях пользователей на сайте</div>

                </div>

        </div>
    )
}

export default LogIn