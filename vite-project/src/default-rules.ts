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
    errorMessage: "This field is required",
    priority: 1,
  },
  "length": {
    validator: (value, $) => $ ? value.length === parseInt($) : false,
    errorMessage: "This field should be $ characters long",
    priority: 3
  },
  "minLength": {
    validator: (value, $) => $ ? value.length >= parseInt($) : false,
    errorMessage: "This field should be at least $ characters long",
    priority: 3
  },
  "maxLength": {
    validator: (value, $) => $ ? value.length <= parseInt($) : false,
    errorMessage: "This field can't be more than $ characters long",
    priority: 3
  },
  "number": {
    validator: (value) => /^[0-9]+$/.test(value) ,
    errorMessage: "This field should be only numbers",
    priority: 2
  },
  "letter": {
    validator: (value) => /^[a-zA-Z]+$/.test(value) ,
    errorMessage: "This field should be only alphabet",
    priority: 2
  },
  "pattern": {
    validator: (value, $) => $ ? new RegExp($).test(value) : false ,
    errorMessage: "This format is not allowed",
    priority: 2
  },
  "illegal": {
    validator: (value, $) => $ ? !new RegExp(`[${$}]`).test(value) : false ,
    errorMessage: "Please do not use these characters: $",
    priority: 2
  },
  "email": {
    validator: (value) => EMAIL_REGEX.test(value),
    errorMessage: "Email format not correct",
    priority: 4
  }
};

export default Rules;
