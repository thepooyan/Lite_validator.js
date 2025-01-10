const config = {
  TRIGGER_KEYWORD: "validate",
  ERROR_CLASSNAME: "validation-error",
  SUPPORTED_ELEMENTS: ["input", "textarea", "select"],
  CONCATER: ", and ",
  EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE_NUMBER_REGEX: /^[+]?[0-9\s()-]{7,15}$/,
  PASSWORD_MIN_LENGTH: 9,
  PASSWORD_SPECIAL_CHAR: /[!@#$%^&*(),.?":{}|<>]/,
};

export default config;
