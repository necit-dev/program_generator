import {choice, program} from "./create.js";

import {
 	choice_div_zero_variant
} from "./generators/div_by_zero.js";
import {
	array_declaration,
	directive, func,
	loop_for, manipulator_and_keywords, new_operator, output, primitive_operator, ret,
	unary_operator, var_assigning,
	var_declaration,
	var_using
} from "./generator.js";
import {isEmpty, print_array} from "./generators/utils.js";
import {choice_deref_null_pointer} from "./generators/deref_null_pointer.js";
import {choice_array_out_of_range} from "./generators/array_out_of_range.js";

// const obj_func = {
// 	type: 'func',
// 	name: "main",
// 	params: {
// 		"argc": "int",
// 		"argv": "char**"
// 	},
// 	return_type: "int",
// 	body: random_generator()
// }
//
//
// const obj_program = [
// 	directive("include", "<iostream>"),
// 	// {type: "directive", keyword: "include", name: "iostream"},
// 	obj_func
// ]


// console.log(program(obj_program))

// const unary_example = unary_operator(
// 	"post++",
// 	var_using("i"),
// 	true
// )
//
// // console.log(choice(unary_example));
//
// const for_example = loop_for(
// 	var_declaration("int", "i", 0, true),
// 	primitive_operator("<", var_using("i"), 10),
// 	unary_operator("post++", var_using("i")),
// 	[
// 		unary_operator("post++", var_using("a"), false, true),
// 	]
// )
// console.log(choice(for_example))
// console.log(choice(0))


// console.log(choice(var_declaration("int", "i", 0, true)));

// console.log(choice(array_declaration("int", "arr", -1, [4, 6, 2, 8])))
// console.log(choice(array_declaration("int", "arr2", 5)))

// const prog_example = [
// 	directive("include", "<iostream>"),
// 	func("main", [], "int", [
// 		var_declaration("int", "N", 5),
// 		var_declaration("int", "sum", 0),
// 		loop_for(
// 			var_declaration("int", "i", 0, true),
// 			primitive_operator("<", var_using("i"), var_using("N")),
// 			unary_operator("post++", var_using("i")),
// 			[
// 				primitive_operator("+=",
// 					var_using("sum"),
// 					primitive_operator("+",
// 						var_using("i"), 1,
// 						false
// 					),
// 					false,
// 					true
// 				)
// 			],
// 			1
// 		),
// 		output("std::cout", [var_using("sum"), manipulator_and_keywords("std::endl")]),
// 		ret(0)
// 	])
// ]

// console.log(program(prog_example))
// console.log(program(division_by_zero_simple()))
// const a = random_func_div_0(1)
// console.log(a)
// console.log(choice(a))

// console.log(program(choice_div_zero_variant()));
// console.log(choice(new_operator("int", [10])))
// console.log(isEmpty())
// console.log(program(choice_deref_null_pointer(1)))
console.log(program(choice_array_out_of_range(3)))
// console.log(choice(print_array))