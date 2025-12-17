import { useState } from "react";
import { SignInForm } from "../components/auth/SignInForm";
import { SignUpForm } from "../components/auth/SignUpForm";
import { OtpForm } from "../components/auth/OtpForm"; 

/**
 * Creates the general login page
 * 
 * @returns whichever Login page is necessary in the form of a 'form' visible to the user
 */
export function LoginPage() {
    const [currentView, setCurrentView] = useState('otp'); 
    const forms = {
        signin: <SignInForm setCurrentView={setCurrentView} />, 
        signup: <SignUpForm setCurrentView={setCurrentView} />, 
        otp: <OtpForm setCurrentView={setCurrentView} />
    }

    return (
        <div>
            {forms[currentView]}
        </div>
    )
}