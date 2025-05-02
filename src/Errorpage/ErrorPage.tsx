import styles from './errorpage.module.css'
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function ErrorPage() {

    return (
        <div className={cx('errorpage')}>
            <h1>404</h1>
            <h2>Error: 404 page not found</h2>
            <p>Sorry, the page you're looking for cannot be accessed</p>
        </div>
    )
}

export default ErrorPage;