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

        // <div id="error-404" className={cx("error-box")}>
        //     <ul>
        //         <li className="error-404">
        //             <div id="f404-1" className={cx("f404")}>4</div>
        //             <div id="f404-2" className={cx("f404")}>0</div>
        //             <div id="f404-3" className={cx("f404")}>4</div>
        //         </li>
        //         <li className={cx("error-text")}>
        //             <div className={cx("")}>
        //                 <h2>We're sorry.</h2>
        //                 <p>The page you're looking for can't found.</p>
        //             </div>
        //         </li>
        //     </ul>
        // </div>
    )
}

export default ErrorPage;