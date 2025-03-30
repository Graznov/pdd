import classNames from 'classnames/bind';
import styles from './bf.module.css';
import Mission from "./Mission/Mission.tsx";

const cx = classNames.bind(styles);

function Bf(){

    return (
        <div className={cx('container')}>

            <header>
                <div className={cx('content')}>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                    <button>5</button>
                </div>
            </header>

            <main>
                <div className={cx('content')}>
                    <Mission/>

                </div>
            </main>

            <footer>
                <div className={cx('content')}>

                </div>
            </footer>



        </div>
)
}

export default Bf