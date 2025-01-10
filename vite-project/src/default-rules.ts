type validatorFunction = (value: string, $?: string) => boolean;

type ValidationRules = {
  [key: string]: {
    validator: validatorFunction,
    errorMessage: string,
    priority: number
  }
};
const Rules: ValidationRules = {
  "req": {
    validator: (val: string) => val !== "",
    errorMessage: "This field is required",
    priority: 1,
  },
  "len": {
    validator: (value, $) => $ ? value.length === parseInt($) : false,
    errorMessage: "This field should be $ characters long",
    priority: 3
  },
};

export default Rules;
