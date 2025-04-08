import {choice} from "./create.js";



const obj = {type: 'var_declaration', value_type: "int", name: "a", body: 5};
const variable = {type: "var_using", name: "a"}
const obj3 = {type: 'primitive_operator', operator: "+", first: -12, second: {type: "var_using", name: "a"}};
const obj2 = {type: 'var_declaration', value_type: "int", name: "b", body: obj3};


console.log(choice(obj))
console.log(choice(obj2))