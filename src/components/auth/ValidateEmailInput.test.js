import { describe, test, expect } from "vitest"; 


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

describe('validateEmailInput', () => {
    test('should return error for empty string', () => {
        expect(validateEmailInput("")).toBe('Email cannot be empty.'); 
    })

    test('should return error for empty padded string', () => {
        expect(validateEmailInput('      ')).toBe('Email cannot be empty.'); 
    })

    test('should return error for missing domain', () => {
        expect(validateEmailInput("johndoe@")).toBe("Enter a valid email."); 
    })

    test('should return error for missing name', () => {
        expect(validateEmailInput("@gmail.com")).toBe("Enter a valid email."); 
    })

    test('should return error for missing .(domain)', () => {
        expect(validateEmailInput("johndoe@gmail")).toBe("Enter a valid email."); 
    })

    test('should be valid email', () => {
        expect(validateEmailInput("johndoe@gmail.com")).toBe(""); 
    })


    test('should be valid email with padding', () => {
        expect(validateEmailInput("  johndoe@gmail.com  ")).toBe(""); 
    })
})