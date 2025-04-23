import { useState } from 'react';
import './login.css';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faVoicemail } from '@fortawesome/free-solid-svg-icons';
import {  login1, setCurrentUser } from '../redux/Actions';
import { useDispatch } from 'react-redux';

export const Login = () => {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();
    const checkEmail = (value) => {
        let idRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
        if (!idRegex.test(value)) {
            setErrors(({ ...errors, id: 'אימייל לא תקין!' }));
        } else {
            setErrors(({ ...errors, id: '' }));
        }
    };
    const send = async (e) => {

        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        let token=localStorage.getItem('token')
        try {
            let a = await dispatch(login1(email, password))
            
            let token1=localStorage.getItem('token')
            debugger
            if(a!=false){
                swal(`היי משתמש: ${email}!`, 'ברוכ/ה הבא/ה!!! 😊😄😁😍 :', 'success')
                navigate('/apartments')
             }
            else{
                swal('Oopss!', `ההתחברות נכשלה: ... 😞😥😔`, 'error');
                navigate('/register');
            }
        }
        catch (error) {
            swal('Oopss!', error + '... 😞😥😔', 'error');
            navigate('/register');
        }
    };
    return (
        <section id='loginDIv'>
            <div className="login-container">

                <h2 id='topic'>התחברות</h2>
                <form className="form" onSubmit={(e) => send(e)}>
                    <div className="input-box">
                        <FontAwesomeIcon icon={faVoicemail} className="icon" />
                        <input required type="email" id="email" onChange={(e) => checkEmail(e.target.value)} />
                        <label htmlFor="email">אימייל</label>
                        <p style={{ color: 'red' }}>{errors.id}</p>
                    </div>

                    <div className="input-box">
                        <FontAwesomeIcon icon={faKey} className="icon" />
                        <input required type="password" id='pass' />
                        <label htmlFor="pass"> סיסמא</label>
                        <p style={{ color: 'red' }}>{errors.password}</p>
                    </div>

                    <div className="remember-forgot">
                        <a href="#">שכחת סיסמא?</a>
                    </div>

                    <button type="submit">התחבר</button>
                </form>

                <div className="create-account">
                    <a onClick={() => {
                        navigate(`/Register`)
                    }}>אינך רשום במערכת? הרשם כאן...</a>
                </div>
            </div>
        </section>

    )
}
