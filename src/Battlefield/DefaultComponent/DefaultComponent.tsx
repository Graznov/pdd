import classNames from "classnames/bind";
import styles from "./defaultComponent.module.css";

const cx = classNames.bind(styles);

function DefaultComponent(){

    return(
        <div className={cx('defaultComponent')}>
            DefaultComponent
        </div>
    )
}

export default DefaultComponent