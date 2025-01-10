type validatorFunction = (value: string, $?: string) => boolean;

type ValidationRules = {
  [key: string]: {
    validator: validatorFunction,
    errorMessage: string,
    priority: number
  }
};
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
  }
};

export default Rules;
