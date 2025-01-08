import messages from "./default-messages.json";
import rules from "./default-rules.ts";
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
  ) as NodeListOf<HTMLElement>;
  SetValidationEvents(items);
}

export function SetValidationEvents(items: NodeListOf<HTMLElement>) {
  items.forEach((i) => {
    setValidationEvent(i);
  });
}

function setValidationEvent(item: HTMLElement) {
  item.addEventListener("blur", () => {
    validateItem(item);
  });
}

export function validateSection(section: HTMLElement) {
  (
    section.querySelectorAll(selectTargetElements()) as NodeListOf<HTMLElement>
  ).forEach((i) => validateItem(i));
}

function validateItem(item: HTMLElement) {
  let success = true;
  function checkErrorElement() {
    if (item.nextElementSibling?.classList.contains(config.ERROR_CLASSNAME))
      return;
    let el = document.createElement("div");
    el.classList.add(config.ERROR_CLASSNAME);
    item.insertAdjacentElement("afterend", el);
  }
  function findValidations() {
    return (item.dataset[config.TRIGGER_KEYWORD] || "").split(" ");
  }
  checkErrorElement();
  let validations = findValidations();
  if (validations.length == 0) return;
  validations.forEach((v) => {
    let read = rules[v];
    if (!read) throw new Error(`No rule defined for "${v}".`);
    let res = read(item.value);
    if (res === false) success = false;
  });
  return success;
}

function validationFailed() { }
