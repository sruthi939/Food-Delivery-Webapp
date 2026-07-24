import React, { useState } from 'react'
import { Cross } from 'lucide-react'

const Login = ({ setShowLogin }) => {

    const [currState, setCurrState] = useState("Sign Up")

    return (
        <div className='login-popup'>
            <form className='login-popup-container'>
                <div className='login-popup-title'>
                    <h2>{currState}</h2>
                    <Cross />
                </div>
                <div className='login-popup-inputs'>
                    {currState === "Login" ? <></> : <input type="text" placeholder='Enter your Name' required />}
                    <input type="email" placeholder='Email' required />
                    <input type="password" placeholder='Password' required />
                </div>
                <button>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className='login-popup-condition'>
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                <p>Create a new account?<span>Click Here</span></p>
                <p>Already have an account? <span>Login here</span></p>
            </form>
        </div>
    )
}

export default Login