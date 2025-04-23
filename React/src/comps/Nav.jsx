import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export const Nav = () => {
    const thisUser = useSelector(x => x.currentUser);
    return (<>
        <div className='nav'>

            <NavLink to={'home'} className='link'>דף הבית</NavLink>
            <NavLink to={'login'} className='link'>התחברות</NavLink>
            <NavLink to={'apartments'} className='link'>דירות נופש</NavLink>
        </div>
        {thisUser&&thisUser.email!=undefined && 
        <div id='profil'>{thisUser.email.charAt(0)}</div>
        }
    </>
    );
};