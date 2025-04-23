import swal from "sweetalert";
import { useSelector, useDispatch } from 'react-redux';
// import { setThisUser,addUser } from "./redux/Actions";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faPhone, faVoicemail } from '@fortawesome/free-solid-svg-icons';
import { register } from "../redux/api";
import { register1 } from "../redux/Actions";
export const Register = () => {
    const users = useSelector(store => store.users);
    const navigate = useNavigate();
    const dispatch=useDispatch()
    function isStringOnlyDigits(str) {
        return str.match(/^[0-9]{1,20}$/) != null ? true : false;
    }
    function isStringOnlyLetters(str) {
        return str.match(/^[א-תa-zA-Z]{1,20}$/) != null ? true : false;
    }
    const checkPhone = (phone) => {
        if (phone.length < 9 || phone.length > 10)
            return false;
        if (phone.charAt(0) != 0)
            return false;
        // בדיקה שכל המחרוזת מספרים
        return isStringOnlyDigits(phone) == true ? true : false;
    }
    const checkValidity = (validity) => {
        if (!isStringOnlyDigits(validity))
            return false;
        if (validity.length != 4)
            return false;
        let month = parseInt(validity.substring(0, 2));
        if (month < 1 || month > 12)
            return false;
        return true;
    }
    const checkCvv = (cvv) => {
        return cvv.length == 3 && isStringOnlyDigits(cvv) == true ? true : false;
    }
    const checkEmail = (value) => {
        let idRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
        return idRegex.test(value);
    };
    const send = async (event) => {
        event.preventDefault();
        debugger
        if (event.target[1].value != event.target[2].value) {
            swal('Oopss!', 'password is not correct... 😞😥😔 write the same password', 'error');
            return;
        }

        const user = {
            email: event.target[0].value,
            password: event.target[1].value,
            phone: event.target[3].value,
            anotherPhone: event.target[4].value,
        };

        if (checkEmail(user.email) && checkPhone(user.phone) && checkPhone(user.anotherPhone)) {
            try {
                let u=await dispatch(register1(user))
                if (u&&u.a == false) {
                    swal('Oopss!', 'Register failed... 😞😥😔' + u.m, 'error');
                    return;
                }
                debugger
                swal(`Hello ${user.email}`, 'register successfully! 😊😄😁😍', 'success');
                navigate('/apartments');
            }
            catch (error) {
                console.log(error);
                swal('Oopss!', 'Register failed... 😞😥😔' , 'error')
            }
        } 
        else
            swal('Oopss!', 'Register failed... The values ​​are not correct', 'error');
    };

    return (
        <>
            <section>
                <div className="login-container">
                    <h2 id='topic'>הרשמה</h2>
                    <form className="form" onSubmit={(e) => send(e)}>
                       
                        <div className="input-box inputR">
                            <FontAwesomeIcon icon={faVoicemail} className="icon" />
                            <input required type="email" id="email" />
                            <label htmlFor="email"> אימייל</label>
                        </div>
                        <div className="input-box inputR">
                            <FontAwesomeIcon icon={faKey} className="icon" /><input required type="password" id="pass" />
                            <label htmlFor="pass"> סיסמא</label>
                        </div>
                        <div className="input-box inputR">
                            <FontAwesomeIcon icon={faKey} className="icon" /><input required type="password" id="pass1" />
                            <label htmlFor="pass1">אימות סיסמא</label>
                        </div>
                        <div className="input-box inputR">
                            <FontAwesomeIcon icon={faPhone} className="icon" /><input required type="phone" id="phone" />
                            <label htmlFor="phone"> פלאפון</label>
                        </div>
                        <div className="input-box inputR">
                            <FontAwesomeIcon icon={faPhone} className="icon" /><input required type="text" id="anotherPhone" />
                            <label htmlFor="anotherPhone"> פלאפון נוסף</label>
                        </div>
                        <button type="submit">התחבר</button>
                    </form>

                    <div className="create-account">
                        <a onClick={() => {
                            navigate(`/login`);
                        }}>לקוח רשום? לכניסה</a>
                    </div>
                </div>
            </section>
        </>
    );
};