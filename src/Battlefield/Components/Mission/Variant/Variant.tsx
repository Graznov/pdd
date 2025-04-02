import classNames from 'classnames';
import styles from './variant.module.css';

const cx = classNames.bind(styles);

function Variant({text}) {

    return(

        <button
            // key={text}
            className={cx('btn_answer')}>
            {text}
        </button>

    )
}

export default Variant