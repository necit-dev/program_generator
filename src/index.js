import {choice, program} from "./create.js";

import {division_by_zero_simple, random_generator} from "./random_generator.js";
import {
	create_array_declaration,
	create_directive, create_function,
	create_loop_for, create_manipulator_and_keywords, create_output, create_primitive_operator, create_return,
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
// console.log(choice(for_example))
// console.log(choice(0))


// console.log(choice(create_var_declaration("int", "i", 0, true)));

// console.log(choice(create_array_declaration("int", "arr", -1, [4, 6, 2, 8])))
// console.log(choice(create_array_declaration("int", "arr2", 5)))

const prog_example = [
	create_directive("include", "<iostream>"),
	create_function("main", [], "int", [
		create_var_declaration("int", "N", 5),
		create_var_declaration("int", "sum", 0),
		create_loop_for(
			create_var_declaration("int", "i", 0, true),
			create_primitive_operator("<", create_var_using("i"), create_var_using("N")),
			create_unary_operator("post++", create_var_using("i")),
			[
				create_primitive_operator("+=",
					create_var_using("sum"),
					create_primitive_operator("+",
						create_var_using("i"), 1,
						false
					),
					false,
					true
				)
			],
			1
		),
		create_output("std::cout", [create_var_using("sum"), create_manipulator_and_keywords("std::endl")]),
		create_return(0)
	])
]

// console.log(program(prog_example))
console.log(program(division_by_zero_simple()))