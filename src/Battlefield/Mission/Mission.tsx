import classNames from 'classnames/bind';
import styles from './mission.module.css';

const cx = classNames.bind(styles);

function Mission(){

    return(
        <div className={cx('mission')}>
            Mission
        </div>
    )
}

export default Mission;