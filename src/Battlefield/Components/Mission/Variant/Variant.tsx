import classNames from 'classnames';
import styles from './variant.module.css';

const cx = classNames.bind(styles);

interface IProps {
    text: string,
    onClick?: () => void,
    key:string,

}

function Variant({text, onClick}:IProps) {

    return(

        <button
            key={text}
            onClick={onClick}
            className={cx('btn_answer')}>
            {text}
        </button>

    )
}

export default Variant