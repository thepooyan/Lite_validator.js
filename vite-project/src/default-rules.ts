type validatorFunction = (value: string, $?: string) => boolean;

type ValidationRules = {
  [key: string]: {
    validator: validatorFunction,
    errorMessage: string,
    priority: number
  }
};
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_NUMBER_REGEX = /^[+]?[0-9\s()-]{7,15}$/;
const PASSWORD_MIN_LENGTH = 9;
const PASSWORD_SPECIAL_CHAR = /[!@#$%^&*(),.?":{}|<>]/;


const Rules: ValidationRules = {
  "required": {
    validator: (val: string) => val !== "",
    errorMessage: "This field cannot be left empty. Please provide a value.",
    priority: 1,
  },
  "email": {
    validator: (value) => EMAIL_REGEX.test(value),
    errorMessage: "Please provide a valid email address.",
    priority: 2,
  },
  "pattern": {
    validator: (value, $) => $ ? new RegExp($).test(value) : false,
    errorMessage: "The value does not match the required format.",
    priority: 2,
  },
  "number": {
    validator: (value) => /^[0-9]+$/.test(value),
    errorMessage: "Only numeric values are allowed in this field.",
    priority: 3,
  },
  "letter": {
    validator: (value) => /^[a-zA-Z]+$/.test(value),
    errorMessage: "Only alphabetic characters (A-Z, a-z) are allowed in this field.",
    priority: 3,
  },
  "alphanumeric": {
    validator: (value) => /^[a-zA-Z0-9]+$/.test(value),
    errorMessage: "This field must contain only letters and numbers.",
    priority: 3,
  },
  "phoneNumber": {
    validator: (value) => PHONE_NUMBER_REGEX.test(value),
    errorMessage: "This field must be a valid phone number.",
    priority: 3,
  },
  "passwordStrength": {
    validator: (value) => {
      const lengthCheck = value.length >= PASSWORD_MIN_LENGTH;
      const specialCharCheck = PASSWORD_SPECIAL_CHAR.test(value);
      return lengthCheck && specialCharCheck;
    },
    errorMessage: `This password must be at least ${PASSWORD_MIN_LENGTH} characters long and contain at least one special character.`,
    priority: 3,
  },
  "length": {
    validator: (value, $) => $ ? value.length === parseInt($) : false,
    errorMessage: "This field must be exactly $ characters long.",
    priority: 4,
  },
  "minLength": {
    validator: (value, $) => $ ? value.length >= parseInt($) : false,
    errorMessage: "This field must be at least $ characters long.",
    priority: 4,
  },
  "maxLength": {
    validator: (value, $) => $ ? value.length <= parseInt($) : false,
    errorMessage: "This field must not exceed $ characters in length.",
    priority: 4,
  },
  "url": {
    validator: (value) => {
      try {
        new URL(value);
        return true;
      } catch (e) {
        return false;
      }
    },
    errorMessage: "This field must be a valid URL.",
    priority: 4,
  },
  "date": {
    validator: (value) => !isNaN(Date.parse(value)),
    errorMessage: "This field must be a valid date.",
    priority: 4,
  },
  "creditCard": {
    validator: (value) => {
      const cleanedValue = value.replace(/[\s-]/g, '');
      let sum = 0;
      let shouldDouble = false;

      for (let i = cleanedValue.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanedValue[i], 10);

        if (shouldDouble) {
          digit *= 2;
          if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
      }

      return sum % 10 === 0;
    },
    errorMessage: "This field must be a valid credit card number.",
    priority: 4,
  },
  "illegal": {
    validator: (value, $) => $ ? !new RegExp(`[${$}]`).test(value) : false,
    errorMessage: "The following characters are not allowed: $",
    priority: 5,
  },
};

export default Rules;
