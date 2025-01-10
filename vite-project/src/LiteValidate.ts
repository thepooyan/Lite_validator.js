import rules from "./default-rules.ts";
type supportedTypes = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
type extendedTypes = supportedTypes & {errorMessages: string[]}
const config = {
  TRIGGER_KEYWORD: "validate",
  ERROR_CLASSNAME: "validation-error",
  SUPPORTED_ELEMENTS: ["input", "textarea", "select"],
};

function selectTargetElements() {
  let selection = ``;
  for (let s of config.SUPPORTED_ELEMENTS) {
    selection += `${s}[data-${config.TRIGGER_KEYWORD}],`;
  }
  return selection.substring(0, selection.length - 1);
}

export default function init() {
  let items = document.querySelectorAll(
    selectTargetElements(),
  ) as NodeListOf<supportedTypes>;
  SetValidationEvents(items);
}

export function SetValidationEvents(items: NodeListOf<supportedTypes>) {
  items.forEach((i) => {
    setValidationEvent(i);
  });
}

function setValidationEvent(item: supportedTypes) {
  item.addEventListener("blur", () => {
    validateItem(item);
  });
}

export function validateSection(section: supportedTypes) {
  (section.querySelectorAll(selectTargetElements()) as NodeListOf<supportedTypes>)
    .forEach((i) => validateItem(i));
}

function extendElementWithErrorMsgs(element: supportedTypes):extendedTypes {
  return {...element, errorMessages: []}
}

function validateItem(item: supportedTypes) {
  let success = true;
  let validations = findValidations(item);
  if (validations.length == 0) return true;
  let item2 = extendElementWithErrorMsgs(item)
  for (const v of validations) {
    let errorMsg = executeValidation(v, item)
    if (errorMsg !== "") {
      success = false;
      item2.errorMessages.push(errorMsg)
    };
  }
  if (success === false) validationFailed(item);
  return success;
}

function executeValidation(validationTag: string, element: supportedTypes): string {
  let base = validationTag;
  let arg: string | undefined;

  if (validationTag.includes("-")) {
    let split = validationTag.split("-");
    base = split[0];
    arg = split[1];
    if (base === "" || arg === "") throw new Error(`Deformed validation tag: ${validationTag}`)
  }

  let rule = rules[base];
  if (rule === undefined) throw new Error(`No rule defined for "${base}".`);

  let result = rule.validator(element.value, arg);
  if (result === false) return rule.errorMessage
  return ""
}

function findValidations(item: supportedTypes) {
  return (item.dataset[config.TRIGGER_KEYWORD] || "").trim().split(" ");
}

function validationFailed(item: supportedTypes) {
  checkErrorElement(item);
  const errorDisplay = item.nextElementSibling;
  errorDisplay?.innerHTML
}

function checkErrorElement(item: supportedTypes) {
  if (item.nextElementSibling?.classList.contains(config.ERROR_CLASSNAME))
    return;
  let el = document.createElement("div");
  el.classList.add(config.ERROR_CLASSNAME);
  item.insertAdjacentElement("afterend", el);
}
