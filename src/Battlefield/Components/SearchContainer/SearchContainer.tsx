import classNames from 'classnames/bind';
import styles from './searchContainer.module.css';
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import Star from "/src/assets/star.svg?react";
import {pushSelectedQuestion, resetUserData} from "../../../store/userDataSlice.ts";
import {STORAGE_KEYS} from "../../../store/constants.ts";

const cx = classNames.bind(styles);

function SearchContainer({id, question, image, answers}: {id:string, question:string,image:string, answers:{is_correct:boolean, answer_text:string}[]}) {
    const dispatch = useAppDispatch()

    const UserData = useAppSelector(state => state.userDataSlice)

    console.log(JSON.stringify(UserData))

    const wind = useAppSelector(state => state.styleSlice.wind)

    let textCorrectAnsw = ''
        answers.forEach((a) => {
            if(a.is_correct) textCorrectAnsw = a.answer_text
        })
    console.log(answers)
    const pathToImg = `../../../pdd_russia${image.substr(1)}`

    const delStar = () => {
        dispatch(pushSelectedQuestion(id))

            fetch(`http://localhost:3000/user/redactstar/${UserData.id}`, {
                method: 'PATCH', // Указываем метод запроса
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json', // Устанавливаем заголовок Content-Type для указания типа данных
                    // 'Authorization': localStorage.getItem('PDD_accessToken')!, // Токен передаётся в заголовке
                    'Authorization': localStorage.getItem(STORAGE_KEYS.PDD_ACCESSTOKEN)!, // Токен передаётся в заголовке
                },
                body: JSON.stringify({id:id})
            })
                .then((response) => {

                    console.log("%c" + `Mission.tsx\nresponse.status: ${response.status}`, "color:#559D4CFF;font-size:17px;");

                    if (!response.ok) {
                        console.log("%c" + `Mission.tsx\nresponse.status: ${response.status}`, "color:#559D4CFF;font-size:17px;");

                        if(response.status === 400){
                            console.log('TOKENS ERROR')
                            // localStorage.removeItem('PDD_accessToken')
                            // localStorage.removeItem('PDD_id')
                            localStorage.removeItem(STORAGE_KEYS.PDD_ACCESSTOKEN)
                            localStorage.removeItem(STORAGE_KEYS.PDD_ID)
                            dispatch(resetUserData())
                        }
                        throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`)
                    }

                    // console.log(response.status)

                    return response.json()
                })

                .then((data) => {
                    console.log('Данные получены', data)
                    // localStorage.setItem('PDD_accessToken', data.accessToken)
                    localStorage.setItem(STORAGE_KEYS.PDD_ACCESSTOKEN, data.accessToken)
                })
                .catch((err) => {
                    console.log('Произошла ошибка', err.message, err.status)
                })


        console.log('DELETE STAR')
    }

    return(
        <div className={cx('searchContainer')}>

            {
                (UserData.starQuestions.includes(id))?<button
                onClick={delStar}
                className={cx('searchContainer_star', {
                    'searchContainer_star_VISIBLE': wind === 'star',
                })}>

                <Star/>

            </button>:''}

            <div className={cx('searchContainer_question')}>
                {question}
            </div>
            <img
                className={cx('image')}
                src={pathToImg}
                alt={`photo: ${pathToImg}`}/>
            <div className={cx('searchContainer_question_text')}>
                {textCorrectAnsw}
            </div>
        </div>
    )
}

export default SearchContainer;