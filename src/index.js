import {choice} from "./create.js";

const obj = {type: 'var_declaration', value_type: "int", name: "a", body: 5};
const variable = {type: "var_using", name: "a"}
const obj3 = {type: 'primitive_operator', operator: "+", first: 2, second: {type: "var_using", name: "a"}};
const obj2 = {type: 'var_declaration', value_type: "int", name: "b", body: obj3};
const obj4 = {type: 'output', name: "cout", body: ["Hello ", "world!", "\\n"]}
const obj5 = {type: 'output', name: "cout", body: ["You clicked", obj3, "times!", {
	type: 'manipulator', name: "endl"
	}]}
const obj6 = {
	type: 'var_assigning',
	name: 'b',
	body: {
		type: 'primitive_operator',
		operator: "-",
		first: {
			type: "var_using",
			name: "b"
		},
		second: 3
	}
}

console.log(choice(obj))
console.log(choice(obj2))
console.log(choice(obj4))
console.log(choice(obj5))
console.log(choice(obj6))
