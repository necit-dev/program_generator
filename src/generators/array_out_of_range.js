import {
	array_declaration, call_func, directive, func,
	loop_for, manipulator_and_keywords, new_operator, output,
	primitive_operator, ret,
	unary_operator, var_assigning,
	var_declaration,
	var_using
} from "../generator.js";
import {print_array} from "./utils.js";

const invalid_argument = () => {
	const print_function = print_array

	const array_length = Math.floor(Math.random()*5+3)
	let body_array = []
	for (let i = 0; i < array_length; i++) {
		body_array.push(Math.floor(Math.random()*200-100))
	}
	let array_lst = []
	if (Math.random() < 0.5) {
		array_lst.push(var_declaration("int*", "arr",
			new_operator("int", [array_length])
		))
		for (let i = 0; i < array_length; i++) {
			array_lst.push(var_assigning(`arr[${i}]`, body_array[i]))
		}
	}else {
		array_lst = array_declaration("int", "arr", -1, body_array)
	}
	let main = array_lst
	main.push(call_func("print_array", [var_using("arr"), array_length+1], true))
	main.push(ret(0))

	let lst = []
	lst.push(directive("include", "<iostream>"))
	lst.push(print_function)
	lst.push(func("main", [], "int", main))
	return lst

}

const loop_error = () => {
	const array_length = Math.floor(Math.random()*5+3)
	let body_array = []

	for (let i = 0; i < array_length; i++) {
		body_array.push(Math.floor(Math.random()*200-100))
	}

	let array = array_declaration("int", "arr", -1, body_array)
	let main = [array]

	let operator_in_loop = "<="
	let digit_in_loop = array_length
	let first_value_in_loop = Math.random() < 0.5 ? 0 : 1
	let operator = "post++"
	if (Math.random() < 0.35) {
		operator_in_loop = ">="
		digit_in_loop = 0
		first_value_in_loop = array_length
		operator = "post--"
	}else	if (Math.random() < 0.6) {
		operator_in_loop = "<"
		digit_in_loop++
		first_value_in_loop = 0
	}

	const loop = loop_for(
		var_declaration("int", "i", first_value_in_loop, true),
		primitive_operator(operator_in_loop, var_using("i"), digit_in_loop),
		unary_operator(operator, var_using("i")),[
			output("std::cout", [
				var_using("arr[i]"),
				manipulator_and_keywords("std::endl")
			])
		], 1
	);

	main = [...main, loop]
	main.push(ret(0))

	let lst = []
	lst.push(directive("include", "<iostream>"))
	lst.push(func("main", [], "int", main))
	return lst
}

export const choice_array_out_of_range = (num) => {
	if (num === 1) {
		return loop_error()
	} else if (num === 2){
		return invalid_argument()
	}
}