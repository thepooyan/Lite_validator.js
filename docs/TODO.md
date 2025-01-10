- validate section should return result
- fix negate msgs
- "no-error" "no-validation" classname
- "show" and "hide" classname for error element
- custom msg for pattern 
- add: (filetype checker, select?, nospace)
- if theres no msg box, dont show the error
- dash in regex
- default success and fail classname

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
