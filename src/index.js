import {choice, program} from "./create.js";

import {random_generator} from "./random_generator.js";
import {
	create_directive,
	create_loop_for, create_primitive_operator,
	create_unary_operator, create_var_assigning,
	create_var_declaration,
	create_var_using
} from "./generator.js";

const obj_func = {
	type: 'func',
	name: "main",
	params: {
		"argc": "int",
		"argv": "char**"
	},
	return_type: "int",
	body: random_generator()
}


const obj_program = [
	create_directive("include", "<iostream>"),
	// {type: "directive", keyword: "include", name: "iostream"},
	obj_func
]


// console.log(program(obj_program))

const unary_example = create_unary_operator(
	"post++",
	create_var_using("i"),
	true
)

// console.log(choice(unary_example));

const for_example = create_loop_for(
	create_var_declaration("int", "i", 0, true),
	create_primitive_operator("<", create_var_using("i"), 10),
	create_unary_operator("post++", create_var_using("i")),
	[
		create_unary_operator("post++", create_var_using("a"), false, true),
	]
)
console.log(choice(for_example))
// console.log(choice(0))


// console.log(choice(create_var_declaration("int", "i", 0, true)));