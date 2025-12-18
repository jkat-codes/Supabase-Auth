import { describe, test, expect } from "vitest"; 


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


describe('validateEmailInput', () => {
    test('should error if password is empty', () => {
      expect(validatePasswordInput("")).toBe("Password cannot be empty.")  ; 
    })

    test('should error if password is empty', () => {
      expect(validatePasswordInput("       ")).toBe("Password cannot be empty.")  ; 
    })

    test('should error if password does not contain 8 characters', () => {
      expect(validatePasswordInput(" . ello")).toBe("Password must be at least 8 characters long and contain at least one uppercase, lowercase, and special character.")  ; 
    })

    test('should error if password contains 8 characters but no uppercase and no special character', () => {
      expect(validatePasswordInput("thisismorethaneightcharacters")).toBe("Password must be at least 8 characters long and contain at least one uppercase, lowercase, and special character.")  ; 
    })

    test('should error if password contains 8 characters and uppercase but no special character', () => {
      expect(validatePasswordInput("ThisismoreThanEightcharacterS")).toBe("Password must be at least 8 characters long and contain at least one uppercase, lowercase, and special character.")  ; 
    })

    test('should error if password contains 8 characters but no uppercase and a special character', () => {
      expect(validatePasswordInput("slkdjfsklfjsd**&^*&^#)*#)(#*$")).toBe("Password must be at least 8 characters long and contain at least one uppercase, lowercase, and special character.")  ; 
    })

    test('should error if password contains less than 8 characters but has other requirements', () => {
      expect(validatePasswordInput("H*&#$(*")).toBe("Password must be at least 8 characters long and contain at least one uppercase, lowercase, and special character.")  ; 
    })


    test('should error if password contains ANY spaces', () => {
      expect(validatePasswordInput("H*&#$(*  091283234Hello")).toBe("Password must be at least 8 characters long and contain at least one uppercase, lowercase, and special character.")  ; 
    })

    test("should not error for valid password", () => {
        expect(validatePasswordInput("Password123!")).toBe(""); 
    })
})