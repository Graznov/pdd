import styles from "./login.module.css";
import classNames from "classnames/bind";
import {useEffect, useState} from "react";
import Eye from '/src/assets/eye.svg?react'
import EyeHidden from '/src/assets/eye-hidden.svg?react'
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {setUserName} from "../../store/userDataSlice.ts";

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

    const [error, setError] = useState(ERROR);

    useEffect(() => {
        if(UserData.entrance) navigate('/userdata')
    }, [UserData.entrance]);

    useEffect(()=>{
        console.log("%c" + `LogIn.tsx\nformRegistration: ${JSON.stringify(formRegistration)}`, "color:#559D4CFF;font-size:17px;");
    },[formRegistration])

    const [nameError, setNameError] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(isLoginVisible ? "Login form submitted" : "Register form submitted");
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
                    method: 'POST', // Указываем метод запроса
                    headers: {
                        'Content-Type': 'application/json' // Устанавливаем заголовок Content-Type для указания типа данных
                    },
                    body: JSON.stringify({
                        name:formRegistration.userName,
                        password:formRegistration.password_1,
                    })
                })
                    .then((response) => {
                        if (!response.ok) {

                            if(response.status === 409){
                                console.log('Имя занято')

                                setNameError(true)

                                setTimeout(()=>{
                                    setNameError(false)
                                },1000)
                            }
                            throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`)

                        }

                        return response.json()
                    })

                    .then((data) => {

                        console.log('Данные получены', data)

                        setFormLogIn({
                            ...formLogIn,
                            name: formRegistration.userName
                        })
                        setIsLoginVisible(!isLoginVisible);
                        setFormRegistration(FORM_REGISTRATION);

                    })
                    .catch((err) => {
                        alert('Что то пошло не так, попробуйте еще раз')
                        console.log('Произошла ошибка', err.message, err.status)
                    })

                // setFormRegistration(FORM_REGISTRATION);

            } else if(formRegistration.userName.length<=5){
                alert('Имя должно содержать более 5 символов')
            } else if(formRegistration.password_1.length<=7){
                alert('Пароль должен содержать ,больше 7 символов')
            }else if (formRegistration.password_1!==formRegistration.password_2){
                alert('Пароли не совпадают')
            } else {
                alert('Не все поля заполнены')
            }


            // setTimeout(()=>{
            //     setError(ERROR)
            // },1000)

        } else{
            if(formLogIn.name.length && formLogIn.password.length){
                console.log(`formLogIn: ${JSON.stringify(formLogIn)}`);

                //отправка на сервер

                fetch(`http://localhost:3000/user/login`, {
                    method: 'POST', // Указываем метод запроса
                    headers: {
                        'Content-Type': 'application/json' // Устанавливаем заголовок Content-Type для указания типа данных
                    },
                    credentials: "include",
                    body: JSON.stringify(formLogIn)
                })
                    .then((response) => {

                        if (!response.ok) {
                            if(response.status === 400) alert('Логин или(и) пароль неверны')
                            throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`)
                        }
                        return response.json()
                    })
                    .then((data) => {

                        console.log('Данные получены', data)

                        localStorage.setItem('PDD_accessToken', data.accessToken)
                        localStorage.setItem('PDD_id', data.id)

                        dispatch(setUserName(data))
                        // dispatch(setEmail(data.email))

                        navigate('/userdata')
                    })
                    .catch((err) => {
                        alert('Что то пошло не так, попробуйте еще раз')

                        console.log(err)
                        console.log('Произошла ошибка',err.status, err.message)
                    })

            } else{
                alert('Не все поля заполнены')
            }

        }

    };

    // console.log(`isLoginVisible: ${isLoginVisible}`);

    return (
        <div className={cx("login-page")}>
            <div className={cx("form")}>
                <div className={cx("register-form", {
                    'register-form_show': !isLoginVisible
                })}>

                    <input
                        className={cx('input',{'error-name':nameError})}
                        onChange={(event)=>{
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
                            onChange={(event)=>{
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
                                'passTwo-red':formRegistration.password_1!==formRegistration.password_2
                            })}
                            onChange={(event)=>{
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
                        className={cx({'error':error.name})}
                        value={formLogIn.name}
                        onChange={(event)=>{setFormLogIn({
                            ...formLogIn,
                            name: event.target.value
                        })}}
                        type="text"
                        placeholder="Имя"/>
                    <div className={cx('login-form_passContainer')}>
                        <input
                            className={cx({'error':error.password})}
                            value={formLogIn.password}
                            onChange={(event)=>{setFormLogIn({
                                ...formLogIn,
                                password: event.target.value
                            })}}
                            type={(passVisible) ? "text" : "password"}
                            placeholder="Пароль"/>
                        <button className={cx('pass-visible-switch')} onClick={() => setPassVisible(!passVisible)}>
                            {(passVisible)?<Eye/>:<EyeHidden/>}
                        </button>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className={cx('form-button')}>Войти</button>
                    <p className={cx("message")}>
                        Нет аккаунта?
                        <button onClick={() => {
                            setFormLogIn(FORM_LOGIN)
                            setFormRegistration(FORM_REGISTRATION)
                            setIsLoginVisible(!isLoginVisible)
                        }}>Зарегестрироваться</button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LogIn