import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
    const currentPage = useLocation().pathname;

    return (
        <div className='row'>
            <h1 className='col justify-content-start'>
                Saving Throw
            </h1>

            <ul className='nav col justify-content-end'>

                {/* Link to homepage */}
                <li className='nav-item'>
                    <Link
                        to='/'
                        className={`${currentPage === '/' ? 'nav-link active-link' : 'nav-link'} link-item`}
                    >Home</Link>
                </li>

                {/* Link to login page */}
                <li className='nav-item'>
                    <Link
                        to='/login'
                        className={`${currentPage === '/' ? 'nav-link active-link' : 'nav-link'} link-item`}
                    >Login</Link>
                </li>

                {/* Link to signup page */}
                <li className='nav-item'>
                    <Link
                    to='/signup'
                    className={`${currentPage === '/' ? 'nav-link active-link' : 'nav-link'} link-item`}
                    >Signup</Link>
                </li>

                {/* Link to weather search page */}
                <li className='nav-item'>
                    <Link
                    to='/weather/search'
                    className={`${currentPage === '/' ? 'nav-link active-link' : 'nav-link'} link-item`}
                    >Weather Search</Link>
                </li>

                <li className='nav-item'>
                <Link
                to='/weather/display'
                className={`${currentPage === '/' ? 'nav-link active-link' : 'nav-link'} link-item`}
                >Weather Display</Link>
                </li>
            </ul>
        </div>
    )
}