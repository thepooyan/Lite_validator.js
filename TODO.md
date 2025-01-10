- validate section should return result
- create config file
- fix negate msgs
- "no-error" "no-validation" classname
- "show" and "hide" classname for error element
- custom msg for pattern 
- add: (range, filetype checker)

```js
"fileType": {
  validator: (value, $) => {
    if (!value || !$) return false;
    const fileType = value.split('.').pop().toLowerCase();
    return $.includes(fileType);
  },
  errorMessage: "This file type is not allowed.",
  priority: 3,
}
```
