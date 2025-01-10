import rules from "./default-rules.ts";
type supportedTypes = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
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

export function validateSection(section: Element) {
  (section.querySelectorAll(selectTargetElements()) as NodeListOf<supportedTypes>)
    .forEach((i) => validateItem(i));
}

type errorDescription = {msg: string, proirity: number}
function validateItem(item: supportedTypes) {
  let success = true;
  let errors: errorDescription[] = [];
  let validations = findValidations(item);
  if (validations.length == 0) return true;
  for (const v of validations) {
    let valiResult = executeValidation(v, item)
    if (valiResult[0] !== "") {
      success = false;
      errors.push({msg: valiResult[0], proirity: valiResult[1]})
    };
  }
  if (success === false) validationFailed(item, errors);
  return success;
}

function executeValidation(validationTag: string, element: supportedTypes): [string, number] {
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
  if (result === false) return [rule.errorMessage, rule.priority]
  return ["", 0]
}

function findValidations(item: supportedTypes) {
  return (item.dataset[config.TRIGGER_KEYWORD] || "").trim().split(" ");
}

function validationFailed(item: supportedTypes,errors: errorDescription[]) {
  console.log(errors, item)
  const errorDisplay = findErrorElement(item);
  for (const err of errors) {
    errorDisplay.innerHTML = err.msg
  }
}

function findErrorElement(item: supportedTypes) {
  let element = item.nextElementSibling;
  if (element !== null) {
    if (element.classList.contains(config.ERROR_CLASSNAME))
      return element;
  }
  console.log(item);
  throw new Error(`above logged input has no validation box. please add an element with "${config.ERROR_CLASSNAME}" classname next to it!`)
}
