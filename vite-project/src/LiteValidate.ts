import messages from "./default-messages.json"
const TRIGGER_KEYWORD = "validate";
const ERROR_CLASSNAME = "validation-error";

export default function init() {
  let items = document.querySelectorAll(`[data-${TRIGGER_KEYWORD}]`);
  SetValidationEvents(items);
}

export function SetValidationEvents(items: NodeListOf<Element>) {
  items.forEach(i => {
    setValidationEvent(i);
  })
}

function setValidationEvent(item: Element) {
  item.addEventListener("blur", () => {
    validateItem(item);
  })
}

export function validateSection(section: Element) {
  section.querySelectorAll(`[data-${TRIGGER_KEYWORD}]`).forEach(i => validateItem(i));
}

function validateItem(item: Element) {
  function checkErrorElement() {
    if (item.nextElementSibling?.classList.contains(ERROR_CLASSNAME)) return
    let el = document.createElement("div");
    el.classList.add(ERROR_CLASSNAME);
    item.insertAdjacentElement("afterend", el);
  }
  checkErrorElement();

}
