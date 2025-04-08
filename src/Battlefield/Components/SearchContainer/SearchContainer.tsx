import classNames from 'classnames/bind';
import styles from './searchContainer.module.css';

const cx = classNames.bind(styles);

function SearchContainer({question, image, answers}: {question:string,image:string,correct_answer:string, answers:object[]}) {

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
            {/*<div className={cx('searchContainer_question_correct')}>*/}
            {/*    {correct_answer}*/}
            {/*</div>*/}
            <div className={cx('searchContainer_question_text')}>
                {textCorrectAnsw}
            </div>
        </div>
    )
}

export default SearchContainer;