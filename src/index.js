import {choice} from "./create.js";
import {
	create_primitive_operator,
	create_var_assigning,
	create_var_declaration,
	create_var_using
} from "./generator.js";
import {random_generator} from "./random_generator.js";

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
const clone_obj6 = create_var_assigning("b", create_primitive_operator(
	"-", create_var_using("b"), 3
))

const obj7 = create_var_declaration("int", "c", 	create_primitive_operator(
	"+", 4,	create_var_using(
		"a"
	)))

// console.log(choice(obj))
// console.log(choice(obj2))
// console.log(choice(obj4))
// console.log(choice(obj5))
// console.log(choice(obj6))
// console.log(choice(clone_obj6))
// console.log(choice(obj7))
const lst = random_generator()
for (let i = 0; i < lst.length; i++) {
	console.log(choice(lst[i]));
}
