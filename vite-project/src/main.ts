import init, {validateSection} from "./LiteValidate"
init()

let a = document.getElementById("vv")
let c = document.getElementById("ff")
if (a && c)
a.onclick = () => {
    validateSection(c)
}
