

# idea:

tailwind-like for html validation
package to install with vite (for react)
script to add to normal html

concept:
```html
<input type="email" placeholder="Email:" data-validation="number length-[9] req"/>
```


# items:
- req min-length-2 max-length-2 length-3 pattern-[some_regex] 
- number letter illegal-[.,*]
- ! to negate any of them


# library should have:
- custom rules 
- custom error msgs
- easy easy easy
- support everyone (react, next, vanilla, vite, solid, svelte)
- optional error massage span
- error massage animate option

# challanges to consider:

- compatibility
- performance (scanning the whole doc?)
- error handling
- simplicity and efficient
hi
