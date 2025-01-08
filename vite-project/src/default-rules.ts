type validatorFunction = (value: string, $?: string) => boolean;

type ValidationRules = {
  [key: string]: [validatorFunction, string] | undefined;
};
const Rules: ValidationRules = {
  "req": [
    (val: string) => val !== "",
    "This field is required",
  ],
  "len": [
    (value, $) => $ ? value.length === parseInt($) : false,
    "This field should be $ characters long",
  ],
};

export default Rules;
