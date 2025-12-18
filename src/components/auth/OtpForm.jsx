import { useState } from "react";
import { useAuth } from "../../hooks/UseAuth";
import { useRef } from "react";

export function OtpForm({setCurrentView}) {
    const { sendOtp, verifyOtp } = useAuth(); 
    const [emailValue, setEmailValue ] = useState(''); 
    const [emailError, setEmailError] = useState('');  
    const [submitButtonContent, setSubmitButtonContent] = useState('Send Code'); 
    const [otp, setOtp] = useState(['', '', '', '', '', '']); 
    const inputs = useRef([]); 

    const isButtonDisabled = emailValue.length === 0 || emailError !== '' || (submitButtonContent !== "Send Code" && hasBlankValues(otp)); 
    const length = 6; 


    // Handles email text input change
    const handleEmailChange = (e => {
        const newValue = e.target.value; 
        setEmailValue(newValue); 
        setEmailError(validateEmailInput(newValue)); 
    })

    // Validates text input, returns error if invalid
    const validateEmailInput = (text => {
        // Trim text
        text = text.trim(); 

        if (text === "") {
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

        if (submitButtonContent === "Send Code") {
            // Reveal the area where we ask for the code to be entered
            document.getElementById("otp-container").classList.remove("hidden"); 
            setSubmitButtonContent("Log In"); 

            const {error} = await sendOtp(emailValue);

            if (error) {
                if (error.message === "Signups not allowed for otp") {
                    setEmailError(''); 
                } else {
                    setEmailError(error.message); 
                }

                return; 
            }

        } else {
            const oneTimeCode = otp.join(''); 

            const {error} = await verifyOtp(emailValue, oneTimeCode); 

            if (error) {
                setEmailError(error.message); 
                return; 
            
            }
        }
    }

    const handleChange = (e, index) => {
        const { value } = e.target; 

        if (value.match(/^\d$/)) {
            const newOtp = [...otp]; 
            newOtp[index] = value; 
            setOtp(newOtp); 

            if (index < length - 1) {
                inputs.current[index + 1].focus(); 
            }
        }; 
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            const newOtp = [...otp]; 
            newOtp[index] = ''; 
            setOtp(newOtp); 

            if (index > 0) {
                inputs.current[index - 1].focus(); 
            }
        }
    }; 

    function hasBlankValues(arr) {
        return arr.some(element => element === "" || element === null || typeof element === 'undefined'); 
    }

    function hasNoBlankValues(arr) {
        return arr.some(element => element !== "" && element !== null && typeof element !== 'undefined'); 
    }

    return (
       <div className="form-container">
            <h1 className="login-header">Welcome <span>back.</span></h1>
            <p className="input-header">Sign in to your account.</p>
            <input data-testid="email-input" disabled={hasNoBlankValues(otp) ? true : false} type="email" name="" id="" placeholder="Email" className="input-field" value={emailValue} onChange={handleEmailChange}/>
            <div data-testid="otp-container" id="otp-container" className="otp-container hidden">
                <div className="inputs-container">
                    {otp.map((_, index) => (
                        <input
                            key={index}
                            data-testid={`otp-input-${index}`}
                            type="text"
                            maxLength="1"
                            value={otp[index]}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputs.current[index] = el)}
                            style={{
                                width: '40px',
                                height: '40px',
                                margin: '0 5px',
                                textAlign: 'center',
                                fontSize: '18px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                background: "#242424"
                            }}
                        />
                    ))}
                </div>
                <div className="choice-container">
                    <button>Resend Code?</button>
                </div>
            </div>
            <button data-testid="submit-button" className="confirm-btn" id="signin-btn" onClick={handleSubmitEmail} disabled={isButtonDisabled}>{submitButtonContent}</button>
            <div className="error-container">
                <p data-testid="error-message" className="error-msg">{emailError}</p>
            </div>
            <div className="choice-container">
               <button onClick={handleExistingAccount}>Already have an account? Sign in here.</button> 
               <button onClick={handleCreateNewAccount}>Don't have an account? Sign up here.</button> 
            </div>
       </div> 
    )
}