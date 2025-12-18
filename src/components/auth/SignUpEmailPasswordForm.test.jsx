import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, test, expect } from "vitest";"vitest"; 
import { SignUpForm } from "./SignUpForm";
import { AuthProvider } from "../../contexts/AuthProvider";

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
        renderWithProvider(<SignUpForm setCurrentView={'signup'}/>); 

        const emailInput = screen.getByTestId('email-input'); 
        await user.click(emailInput); 
        await user.tab(); 

        const submitButton = screen.getByTestId('submit-button'); 
        expect(submitButton).toBeDisabled(); 

        const errorMessage = screen.getByTestId('error-message');
        expect(errorMessage).toHaveTextContent('Email cannot be empty.');
    })

    test('diplay email error when email is invalid', async () => {
        const user = userEvent.setup(); 
        renderWithProvider(<SignUpForm setCurrentView={'signup'}/>); 

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
        renderWithProvider(<SignUpForm setCurrentView={'signup'}/>); 

        const emailInput = screen.getByTestId('email-input'); 
        await user.click(emailInput); 
        await user.type(emailInput, ' @gmail.com'); 

        const submitButton = screen.getByTestId('submit-button'); 
        expect(submitButton).toBeDisabled(); 

        const errorMessage = screen.getByTestId('error-message'); 
        expect(errorMessage).toHaveTextContent('Enter a valid email'); 
    })

    test('diplay password error when email is valid and pass is empty', async () => {
        const user = userEvent.setup(); 
        renderWithProvider(<SignUpForm setCurrentView={'signup'}/>); 

        const emailInput = screen.getByTestId('email-input'); 
        await user.click(emailInput); 
        await user.type(emailInput, 'test@gmail.com'); 

        const passwordInput = screen.getByTestId('password-input'); 
        await user.click(passwordInput); 
        await user.tab(); 
        
        const submitButton = screen.getByTestId('submit-button'); 
        expect(submitButton).toBeDisabled(); 

        const errorMessage = screen.getByTestId('error-message'); 
        expect(errorMessage).toHaveTextContent('Password cannot be empty.'); 
    })


    test('diplay password error when email is valid and pass is empty', async () => {
        const user = userEvent.setup(); 
        renderWithProvider(<SignUpForm setCurrentView={'signup'}/>); 

        const emailInput = screen.getByTestId('email-input'); 
        await user.click(emailInput); 
        await user.type(emailInput, 'test@gmail.com'); 

        const passwordInput = screen.getByTestId('password-input'); 
        await user.click(passwordInput); 
        await user.type(passwordInput, "      "); 

        const submitButton = screen.getByTestId('submit-button'); 
        expect(submitButton).toBeDisabled(); 

        const errorMessage = screen.getByTestId('error-message'); 
        expect(errorMessage).toHaveTextContent('Password cannot be empty.'); 
    })


    test('diplay password error when email is valid and pass is invalid', async () => {
        const user = userEvent.setup(); 
        renderWithProvider(<SignUpForm setCurrentView={'signup'}/>); 

        const emailInput = screen.getByTestId('email-input'); 
        await user.click(emailInput); 
        await user.type(emailInput, 'test@gmail.com'); 

        const passwordInput = screen.getByTestId('password-input'); 
        await user.click(passwordInput); 
        await user.type(passwordInput, "thisisaninvalidpassword"); 
        
        const submitButton = screen.getByTestId('submit-button'); 
        expect(submitButton).toBeDisabled(); 

        const errorMessage = screen.getByTestId('error-message'); 
        expect(errorMessage).toHaveTextContent('Password must be at least 8 characters long and contain at least one uppercase, lowercase, and special character.'); 
    })


    test('diplay password error when email is valid and pass is valid', async () => {
        const user = userEvent.setup(); 
        renderWithProvider(<SignUpForm setCurrentView={'signup'}/>); 

        const emailInput = screen.getByTestId('email-input'); 
        await user.click(emailInput); 
        await user.type(emailInput, 'test@gmail.com'); 

        const passwordInput = screen.getByTestId('password-input'); 
        await user.click(passwordInput); 
        await user.type(passwordInput, "Password123!"); 
        
        const submitButton = screen.getByTestId('submit-button'); 
        expect(submitButton).toBeEnabled(); 

        const errorMessage = screen.getByTestId('error-message'); 
        expect(errorMessage).toHaveTextContent(''); 
    })

})