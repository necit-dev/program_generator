import {
	condition_if,
	func,
	loop_for, manipulator_and_keywords, output,
	binary_operator, ret,
	unary_operator,
	var_declaration,
	var_using
} from "../generator.js";

export const nextChar = (ch) => {
	return String.fromCharCode(ch.charCodeAt(0) + 1);
}

export const charNumber = (num) => {
	return String.fromCharCode("a".charCodeAt(0) + (num-1));
}

export const random_var_declaration = (count_of_variables, lst) => {
	let symbol = 'a'
	for (let i = 0; i < count_of_variables; i++) {
		lst.push(
			var_declaration("int", symbol, Math.floor(Math.random()*200-100))
		)
		symbol = nextChar(symbol);
	}
	return lst
}

export const isEmpty = (obj) => {
	return (obj || obj === 0 || obj === "") ? true : false

}

export const random_pointers_declaration = (count_of_pointers, lst) => {

}

export const find_func = func("find", {
		"arr": "int*",
		"size": "int",
		"target": "int",
	}, "int*", [
		loop_for(
			var_declaration("int", "i", 0, true),
			binary_operator("<", var_using("i"), var_using("size")),
			unary_operator("post++", var_using("i")),
			[
				condition_if(
					binary_operator("==", var_using("arr[i]"), var_using("target")),
					[
						ret(unary_operator("&", var_using("arr[i]")))
					],
					2
				)
			],
			1
		),
		ret(manipulator_and_keywords("nullptr"))
	],
)

export const print_array = func("print_array", {
		"arr": "int*",
		"size": "int",
	}, "void", [
		loop_for(
			var_declaration("int", "i", 0, true),
			binary_operator("<", var_using("i"), var_using("size")),
			unary_operator("post++", var_using("i")),
			[
				output("std::cout", [
					var_using("arr[i]"),
					manipulator_and_keywords("std::endl")
				])
			],
			1
		)
	]
)