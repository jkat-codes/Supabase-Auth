
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, test, expect } from "vitest";"vitest"; 
import { SignUpForm } from "./SignUpForm";
import { AuthProvider } from "../../contexts/AuthProvider";
import { OtpForm } from "./OtpForm";

const renderWithProvider = (component) => {
    return render(
        <AuthProvider>
            {component}
        </AuthProvider>
    )
}

describe('Error message rendering', () => {

    test('diplays email error when email is empty', async () => {
        const user = userEvent.setup(); 
        renderWithProvider(<OtpForm setCurrentView={'otp'}/>); 

        const emailInput = screen.getByTestId('email-input'); 
        await user.click(emailInput); 
        await user.type(emailInput, "hello"); 
        await user.clear(emailInput); 
        await user.tab(); 

        const submitButton = screen.getByTestId('submit-button'); 
        expect(submitButton).toBeDisabled(); 

        const errorMessage = screen.getByTestId('error-message');
        expect(errorMessage).toHaveTextContent('Email cannot be empty.');
    })

    test('diplay email error when email is invalid', async () => {
        const user = userEvent.setup(); 
        renderWithProvider(<OtpForm setCurrentView={'otp'}/>); 

        const emailInput = screen.getByTestId('email-input'); 
        await user.click(emailInput); 
        await user.type(emailInput, 'johndoe@'); 

        const submitButton = screen.getByTestId('submit-button'); 
        expect(submitButton).toBeDisabled(); 

        const errorMessage = screen.getByTestId('error-message'); 
        expect(errorMessage).toHaveTextContent('Enter a valid email'); 
    })

    test('diplay email error when email is invalid', async () => {
        const user = userEvent.setup(); 
        renderWithProvider(<OtpForm setCurrentView={'otp'}/>); 

        const emailInput = screen.getByTestId('email-input'); 
        await user.click(emailInput); 
        await user.type(emailInput, ' @gmail.com'); 

        const submitButton = screen.getByTestId('submit-button'); 
        expect(submitButton).toBeDisabled(); 

        const errorMessage = screen.getByTestId('error-message'); 
        expect(errorMessage).toHaveTextContent('Enter a valid email'); 
    })

    test('display no error when email is valid', async () => {
        const user = userEvent.setup(); 
        renderWithProvider(<OtpForm setCurrentView={'otp'}/>); 

        const emailInput = screen.getByTestId('email-input'); 
        await user.click(emailInput); 
        await user.type(emailInput, 'johndoe@gmail.com'); 

        const submitButton = screen.getByTestId('submit-button'); 
        expect(submitButton).toBeEnabled(); 

        const errorMessage = screen.getByTestId('error-message'); 
        expect(errorMessage).toHaveTextContent(''); 
    })
})