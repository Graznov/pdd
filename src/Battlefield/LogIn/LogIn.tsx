import styles from "./login.module.css";
import classNames from "classnames/bind";
import {useEffect, useState} from "react";
import Eye from '/src/assets/eye.svg?react'
import EyeHidden from '/src/assets/eye-hidden.svg?react'

const cx = classNames.bind(styles);

const FORM_LOGIN = {
    userName:'',
    password:''
}

const FORM_REGISTRATION = {
    userName:'',
    userEmail:'',
    password_1:'',
    password_2:'',
}

const ERROR = {
    name:false,
    email:false,
    password:false,
}

function LogIn() {

    const [isLoginVisible, setIsLoginVisible] = useState(true);
    const [passVisible, setPassVisible] = useState(false);

    const [formLogIn, setFormLogIn] = useState(FORM_LOGIN);

    const [formRegistration, setFormRegistration] = useState(FORM_REGISTRATION);

    const [error, setError] = useState(ERROR);

    useEffect(()=>{

    },[error])

    function validateEmail(email:string) {
        if (!email) return false; // Проверка на пустую строку

        // Более строгое регулярное выражение
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(String(email).toLowerCase());
    }

    // console.log(validateEmail(formRegistration.userEmail))


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(isLoginVisible ? "Login form submitted" : "Register form submitted");
        // Здесь можно добавить логику отправки данных на сервер
        if(!isLoginVisible){

            if(formRegistration.userName.length
                && formRegistration.userEmail.length
                && formRegistration.password_1
                && formRegistration.password_1===formRegistration.password_2){
                
                console.log(`formRegistration: ${JSON.stringify(formRegistration)}`);

                console.log(validateEmail(formRegistration.userEmail))


                //отправка на сервер

            } else {
                alert('Не все поля заполнены')
            }


            setTimeout(()=>{
                setError(ERROR)
            },1000)

        } else{
            if(formLogIn.userName.length && formLogIn.password.length){
                console.log(`formLogIn: ${JSON.stringify(formLogIn)}`);

                //отправка на сервер
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
                        className={cx({'error':error.name})}
                        onChange={(event)=>{
                            setFormRegistration({
                                ...formRegistration,
                                userName: event.target.value
                            })
                        }}
                        value={formRegistration.userName}
                        type="text"
                        placeholder="name"/>

                    <input
                        className={cx({'error':error.email})}
                        onChange={(event)=>{
                            setFormRegistration({
                                ...formRegistration,
                                userEmail: event.target.value
                            })
                        }}
                        value={formRegistration.userEmail}
                        type="text"
                        placeholder="email address"/>

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
                            placeholder="password"/>

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
                            placeholder="confirm password"/>
                    </div>


                    <button
                        onClick={handleSubmit}
                        className={cx('form-button')}>
                        create
                    </button>
                    <p className={cx("message")}>
                        Already registered?
                        <button onClick={() => {
                            setFormLogIn(FORM_LOGIN)
                            setFormRegistration(FORM_REGISTRATION)
                            setIsLoginVisible(!isLoginVisible)

                        }}>Sign In</button>
                    </p>
                </div>
                <div className={cx("login-form", {
                    'login-form_none': !isLoginVisible
                })}>

                    <input
                        className={cx({'error':error.name})}
                        value={formLogIn.userName}
                        onChange={(event)=>{setFormLogIn({
                            ...formLogIn,
                            userName: event.target.value
                        })}}
                        type="text"
                        placeholder="username"/>
                    <div className={cx('login-form_passContainer')}>
                        <input
                            className={cx({'error':error.password})}
                            value={formLogIn.password}
                            onChange={(event)=>{setFormLogIn({
                                ...formLogIn,
                                password: event.target.value
                            })}}
                            type={(passVisible) ? "text" : "password"}
                            placeholder="password"/>
                        <button className={cx('pass-visible-switch')} onClick={() => setPassVisible(!passVisible)}>
                            {(passVisible)?<Eye/>:<EyeHidden/>}
                        </button>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className={cx('form-button')}>login</button>
                    <p className={cx("message")}>
                        Not registered?
                        <button onClick={() => {
                            setFormLogIn(FORM_LOGIN)
                            setFormRegistration(FORM_REGISTRATION)
                            setIsLoginVisible(!isLoginVisible)
                        }}>Create an account</button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LogIn