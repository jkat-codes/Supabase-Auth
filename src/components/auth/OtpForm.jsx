import { useState } from "react";
import { useAuth } from "../../hooks/UseAuth";

export function OtpForm({setCurrentView}) {
    const { sendOtp, verifyOtp } = useAuth(); 
    const [ emailValue, setEmailValue ] = useState(''); 
    const [emailError, setEmailError] = useState('');  

    const isButtonDisabled = emailValue.length === 0; 


    // Handles email text input change
    const handleEmailChange = (e => {
        const newValue = e.target.value; 
        setEmailValue(newValue); 
        setEmailError(validateEmailInput(newValue)); 
    })

    // Validates text input, returns error if invalid
    const validateEmailInput = (text => {
        if (text.trim() === "") {
            return 'Email cannot be empty.'; 
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
            return 'Enter a valid email.'
        }

        return ''; 
    })

    // Handles click for already existing account
    const handleCreateNewAccount = () => {
        setCurrentView('signup'); 
    }

    // Handles click for already existing account
    const handleExistingAccount = () => {
        setCurrentView('signin'); 
    }

    // Handles email submittion for email otp
    async function handleSubmitEmail() {

        document.getElementById("otp-container").classList.remove("hidden"); 

        // const {error} = await sendOtp(emailValue);

        // if (error) {
        //     setEmailError(error.message); 
        //     return; 
        // }
    }

    return (
       <div className="form-container">
            <h1 className="login-header">Welcome <span>back.</span></h1>
            <p className="input-header">Sign in to your account.</p>
            <input type="email" name="" id="" placeholder="Email" className="input-field" value={emailValue} onChange={handleEmailChange}/>
            <div id="otp-container" className="otp-container hidden">

            </div>
            <button className="confirm-btn" id="signin-btn" onClick={handleSubmitEmail} disabled={isButtonDisabled}>Send Code</button>
            <div className="error-container">
                <p className="error-msg">{emailError}</p>
            </div>
            <div className="choice-container">
               <button onClick={handleExistingAccount}>Already have an account? Sign in here</button> 
               <button onClick={handleCreateNewAccount}>Don't have an account? Sign up here</button> 
            </div>
       </div> 
    )
}