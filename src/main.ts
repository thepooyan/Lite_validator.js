import init, {validateSection} from "./LiteValidate"
init()

let btn = document.getElementById("subbutton")
let form = document.getElementById("mainform")
if (btn && form)
btn.onclick = () => {
    let result = validateSection(form)
    console.log(result)
}
