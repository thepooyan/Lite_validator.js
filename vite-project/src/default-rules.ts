type ValidationRules = {
  [key: string]: (value: string, arg?: string) => Boolean | undefined
}
const Rules:ValidationRules = {
  "req": (value, _) => value !== "",
}

export default Rules
