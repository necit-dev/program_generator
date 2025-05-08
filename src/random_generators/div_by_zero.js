import {
	call_func,
	directive,
	func,
	manipulator_and_keywords,
	output,
	binary_operator,
	ret,
	var_declaration,
	var_using
} from "./../generator.js";

import {
	random_var_declaration
} from "./utils.js"


export const random_function = (number) => {
	const random = Math.random()*7;
	let random_parameter;
	if (Math.random() < 0.5) {
		random_parameter = var_using("a")
	}else {
		random_parameter = Math.floor(Math.random()*1000+1)
	}
	const var_b = var_declaration("int", "b", Math.floor(Math.random()*1000+1))

	let str_ret
	if (random < 1){
		str_ret = ret(binary_operator("+", var_using("b"), random_parameter))
	}else if (random < 2) {
		str_ret = ret(binary_operator("-", var_using("b"), random_parameter))
	}else if (random < 3){
		str_ret = ret(binary_operator("*", var_using("b"), random_parameter))
	}else if (random < 4){
		str_ret = ret(binary_operator("/", random_parameter, var_using("b")))
	}else if (random < 5){
		str_ret = ret(binary_operator("+", random_parameter, var_using("b")))
	}else if (random < 6){
		str_ret = ret(binary_operator("-", random_parameter, var_using("b")))
	}else {
		str_ret = ret(binary_operator("*", random_parameter, var_using("b")))
	}

	return func("func" + number, typeof random_parameter === "number" ? {} : {"a": "int"}, "int", [
		var_b,
		str_ret
	])
}

export const random_func_div_0 = (number) => {
	const random = Math.random()
	const var_b = var_declaration("int", "b", 0)
	if (random < 0.1){
		return func("func" + number, {"a": "int"}, "int", [
			var_b,
			ret(binary_operator("/", var_using("a"), var_using("b")))
		])
	}else {
		return func("func" + number, {}, "int", [
			var_b,
			ret(binary_operator("/", Math.floor(Math.random()*2000-500), var_using("b")))
		])
	}
}

export const div_by_zero_with_functions = () => {
	const count_of_funcs = Math.floor(Math.random()*5+2)
	const number_exception_func = Math.floor(Math.random()*(count_of_funcs-1) + 1)

	let functions = []
	for (let i = 1; i <= count_of_funcs; i++) {
		if (i === number_exception_func) {
			functions.push(random_func_div_0(i))
		}else {
			functions.push(random_function(i))
		}
	}

	let main = []
	const count_of_variables = Math.ceil(Math.random()*5+1)
	main = random_var_declaration(count_of_variables, main)

	for (let i = 0; i < functions.length; i++) {
		// console.log(functions[i].params.a)
		if (functions[i].params.a) {
			let number_var_using = Math.floor(Math.random()*count_of_variables)
			if (number_var_using === count_of_variables) number_var_using -= 1
			main.push(
				output("std::cout", [
					call_func("func" + (i+1), [var_using(
						String.fromCharCode('a'.charCodeAt(0) + number_var_using)
					)]),
					manipulator_and_keywords("std::endl")
				])
			)
		}else {
			main.push(
				output("std::cout", [
					call_func("func" + (i+1), []),
					manipulator_and_keywords("std::endl")
				])
			)
		}
	}

	main.push(ret(0))

	let lst = []
	lst.push(directive("include", "<iostream>"))
	lst = [...lst,...functions]
	lst.push(func("main", [], "int", main))
	return lst
}


export const division_by_zero_simple = () => {
	let main = []
	const count_of_variables = Math.ceil(Math.random()*5+1)
	let new_symbol = Math.ceil(Math.random()*(count_of_variables)-1)
	if (new_symbol < 0) new_symbol = 0

	main = random_var_declaration(count_of_variables, main)
	main.push(var_declaration("int", "z", 0))
	main.push(output("std::cout", [
		binary_operator("/", var_using(
			String.fromCharCode('a'.charCodeAt(0) + new_symbol)
		), var_using("z")),
		manipulator_and_keywords("std::endl")
	]))
	main.push(ret(0))


	let lst = []
	lst.push(directive("include", "<iostream>"))
	lst.push(func("main", [], "int", main))
	return lst
}

export const choice_div_zero_variant = (num = 0) => {
	if (num === 1){
		return division_by_zero_simple()
	}else if (num === 2) {
		return div_by_zero_with_functions()
	}else if (Math.random() < 0.3){
		return division_by_zero_simple()
	}else {
		return div_by_zero_with_functions()
	}
}

