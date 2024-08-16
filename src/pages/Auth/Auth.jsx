import React, { useState } from 'react'
import { signUp, login } from "../../api/authRequest";
import { useInfoContext } from "../../context/infoContext"
import './Auth.scss'
import { Link } from 'react-router-dom';
import { toast } from '../../components/Message/ToastContainer';
import PhoneInput from '../../components/PhoneInput/PhoneInput';


const Auth = ({reset}) => {
    const [isSignup, setIsSignup] = useState(true);
    const [code, setCode] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setCurrentUser } = useInfoContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        toast('Please wait...', 'info')
        setLoading(true)
        try {
            let res;
            if (!isSignup) {
                const password = formData.get('password')
                // signUp
                if (password) {
                    res = await signUp(formData)
                }
            } else {
                // login
                res = await login(formData)
            }
            console.log(res);
            toast(res?.data?.message, 'success')
            localStorage.setItem("profile", JSON.stringify(res?.data?.user[0] || res?.data?.user))
            localStorage.setItem("token", JSON.stringify(res?.data?.token))
            setCurrentUser(res?.data?.user[0] || res?.data?.user);
            setLoading(false)
            reset(false)
            !isSignup ? toast('Вы успешно зарегистрировали свой аккаунт', 'success') : toast('Вы успешно вошли в свой аккаунт', 'success')
        } catch (error) {
            setLoading(false)
            toast(error?.response?.data.message, 'error')
            console.error(error?.response?.data.message)
        }

        
    }
    
    return (
        <div className='signup'>
            <div className="signup-page">
                <form onSubmit={handleSubmit} action="" className="auth-form">
                    <div className='input'>
                        <div className='typeAuth'>
                            <h5 style={isSignup ? { cursor: "pointer", borderBottom: '3px solid #FF7010', padding: '10px'} : {cursor: "pointer"}} onClick={() => setIsSignup(true)}>Войти</h5>
                            <h5 style={!isSignup ? { cursor: "pointer", borderBottom: '3px solid #FF7010', padding: '10px'} : {cursor: "pointer"}} onClick={() => setIsSignup(false)}>Зарегистрироваться</h5>
                        </div>
                        {!isSignup && <label htmlFor="" className='label'>
                            Имя*
                            <input disabled={loading} type="name" name='name' className="info-input" required/>
                        </label>}
                        {!isSignup && <label htmlFor="" className='label'>
                            Номер телефона*
                            <PhoneInput/>
                        </label>}
                        <label htmlFor="" className='label'>
                            Электронная почта или телефон*
                            <input disabled={loading} type="email" name='email' className="info-input" required/>
                        </label>
                        <label htmlFor="" className='password'>
                            Пароль*
                            <input disabled={loading} type={!code ? "password" : 'text'} name='password' className="info-input" required />
                            <span onClick={() => setCode(!code)}>{!code ? <i className="fa-regular fa-eye"></i> : <i className="fa-regular fa-eye-slash"></i>}</span>
                        </label>
                    </div>
                    {isSignup && <Link className='forget'>Забыли пароль?</Link>}
                    <button disabled={loading} className='btn'>{isSignup ? "Войти" : "Зарегистрироваться"}</button>
                </form>
            </div>
        </div>
    )
}

export default Auth;