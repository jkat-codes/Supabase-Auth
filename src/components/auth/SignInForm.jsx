import { useState } from "react";
import { useAuth } from "../../hooks/UseAuth";
import './TextInputForm.css'; 

export function SignInForm({setCurrentView}) {
    const { signIn } = useAuth(); 
    const [emailValue, setEmailValue] = useState(''); 
    const [passwordValue, setPasswordValue] = useState(''); 
    const [error, setError] = useState(''); 
    
    const isButtonDisabled = (emailValue.length === 0 || passwordValue.length === 0) 

    /**
     * Handles sign in submission by authenticating the user with Supabase.
     * 
     * @param {*} e Form submission event
     */
    async function handleSignIn(e) {
        e.preventDefault(); 

        const { error } = await signIn(emailValue, passwordValue, null); 
        
        // Handle error here
        if (error) {
            setError(error.message); 
        }
    }

    /**
     * Handles the email input value changes
     * 
     * @param {*} e Text input field event
     */
    const handleEmailChange = (e => {
        const newValue = e.target.value; 
        setEmailValue(newValue); 
    })
    
    /**
     * Handles the password input value changing 
     * 
     * @param {*} e the event within the input field that is changing
     */
    const handlePasswordChange = (e => {
        const newValue = e.target.value; 
        setPasswordValue(newValue); 
    })

    /**
     * Handles changing the current view to the signup view
     */
    const handleCreateNewAccount = () => {
        setCurrentView('signup'); 
    }

    /**
     * Handles changing the current view to the otp view
     */
    const handleSignInWithSSO = () => {
        setCurrentView('otp'); 
    }

    return (
        <div className="form-container">
            <h1 className="login-header">Welcome <span>back.</span></h1>
            <p className="input-header">Sign in to your account.</p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
            <input type="email" name="" id="" placeholder="Email" className="input-field" value={emailValue} onChange={handleEmailChange}/>
            <input type="password" name="" id="" className='input-field' placeholder='Password' value={passwordValue} onChange={handlePasswordChange}/>
            <button className="confirm-btn" id="signin-btn" onClick={handleSignIn} disabled={isButtonDisabled}>Sign In</button>
            <div className="error-container">
                <p className="error-msg">{error}</p>
            </div>
            <div className="choice-container">
               <button onClick={handleSignInWithSSO}>Sign in with SSO.</button> 
               <button onClick={handleCreateNewAccount}>Don't have an account? Sign up here.</button> 
            </div>
        </div>
    )
}