type validatorFunction = (value: string, $?: string) => boolean;

type ValidationRules = {
  [key: string]: {
    validator: validatorFunction,
    errorMessage: string,
    priority: number
  }
};
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const Rules: ValidationRules = {
  "required": {
    validator: (val: string) => val !== "",
    errorMessage: "This field cannot be left empty. Please provide a value.",
    priority: 1,
  },
  "length": {
    validator: (value, $) => $ ? value.length === parseInt($) : false,
    errorMessage: "This field must be exactly $ characters long.",
    priority: 3,
  },
  "minLength": {
    validator: (value, $) => $ ? value.length >= parseInt($) : false,
    errorMessage: "This field must be at least $ characters long.",
    priority: 3,
  },
  "maxLength": {
    validator: (value, $) => $ ? value.length <= parseInt($) : false,
    errorMessage: "This field must not exceed $ characters in length.",
    priority: 3,
  },
  "number": {
    validator: (value) => /^[0-9]+$/.test(value),
    errorMessage: "Only numeric values are allowed in this field.",
    priority: 2,
  },
  "letter": {
    validator: (value) => /^[a-zA-Z]+$/.test(value),
    errorMessage: "Only alphabetic characters (A-Z, a-z) are allowed in this field.",
    priority: 2,
  },
  "pattern": {
    validator: (value, $) => $ ? new RegExp($).test(value) : false,
    errorMessage: "The value does not match the required format.",
    priority: 2,
  },
  "illegal": {
    validator: (value, $) => $ ? !new RegExp(`[${$}]`).test(value) : false,
    errorMessage: "The following characters are not allowed: $",
    priority: 2,
  },
  "email": {
    validator: (value) => EMAIL_REGEX.test(value),
    errorMessage: "Please provide a valid email address.",
    priority: 4,
  },
};

export default Rules;
