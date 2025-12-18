import { useState } from "react";
import { useAuth } from "../../hooks/UseAuth";

export function SignUpForm({setCurrentView}) {
    const { signUp } = useAuth(); 
    const [emailValue, setEmailValue] = useState(''); 
    const [emailError, setEmailError] = useState(''); 
    const [passwordValue, setPasswordValue] = useState(''); 
    const [passwordError, setPasswordError] = useState(''); 

    const isButtonDisabled = ((emailValue.length === 0 || passwordValue.length === 0 || emailError !== '' || passwordError !== '')); 

    /**
     * Handles sign up submission by adding the user to Supabase.
     * 
     * @param {*} e Form submission event
     */
    async function handleSignUp(e) {
        e.preventDefault(); 

        const { error } = await signUp(emailValue, passwordValue, null); 
        
        if (error) {
            setPasswordError(error.message); 
        }

    }

    /**
     * Handles email input value changes
     * 
     * @param {*} e Text input field event
     */
    const handleEmailChange = (e => {
        const newValue = e.target.value; 
        setEmailValue(newValue); 
        setEmailError(validateEmailInput(newValue)); 
    })

    /**
     * Validates email input against email regex
     * 
     * @param {*} text input text we want to validate
     * @returns '' if valid input, 'Error' if invalid input
     */
    const validateEmailInput = (text)  => {
        // Trim text 
        text = text.trim(); 

        if (text === "") {
            return 'Email cannot be empty.'; 
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
            return 'Enter a valid email.'
        }

        return ''; 
    }; 
    
    /**
     * Handles passowrd input value changes
     * 
     * @param {*} e Text input field event
     */
    const handlePasswordChange = (e => {
        const newValue = e.target.value; 
        setPasswordValue(newValue); 
        setPasswordError(validatePasswordInput(newValue)); 
    })

    /**
     * Validates password input against password regex (> 8 characters, different character types)
     *  
     * @param {*} text input text we want to validate
     * @returns  '' if valid input, 'Error' if invalid input
     */
    const validatePasswordInput = (text => {
        if (text.trim() === "") {
            return 'Password cannot be empty.'; 
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(text)) {
            return 'Password must be at least 8 characters long and contain at least one uppercase, lowercase, and special character.'; 
        }

        return ''; 
    })

    /**
     * Handles switch to exisiting account current view
     */
    const handleExistingAccount = () => {
        setCurrentView('signin'); 
    }


    return (
        <div className="form-container">
            <h1 className="login-header">Create <span>Your</span> Account.</h1>
            <p className="input-header"></p>
            <input type="email" name="" id="" placeholder="Email" className="input-field" value={emailValue} onChange={handleEmailChange} onBlur={() => setEmailError(validateEmailInput(emailValue))}/>
            <input type="password" name="" id="" className='input-field' placeholder='Password' value={passwordValue} onChange={handlePasswordChange} onBlur={() => setPasswordError(validatePasswordInput(passwordValue))}/>
            <button className="confirm-btn" id="signin-btn" onClick={handleSignUp} disabled={isButtonDisabled}>Sign Up</button>
            <div className="error-container">
                <p className="error-msg">{passwordError}</p>
            </div>
            <div className="choice-container">
               <button onClick={handleExistingAccount}>Already have an account? Sign in here.</button> 
            </div>
        </div>
    ); 
}