import classNames from 'classnames/bind';
import styles from './searchContainer.module.css';

const cx = classNames.bind(styles);

function SearchContainer({question, image, answers}: {question:string,image:string,correct_answer:string, answers:{is_correct:string, answer_text:string}[]}) {

    let textCorrectAnsw = ''
        answers.forEach((a) => {
            if(a.is_correct) textCorrectAnsw = a.answer_text
        })

    const pathToImg = `../../../pdd_russia${image.substr(1)}`

    return(
        <div className={cx('searchContainer')}>
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