import {
	directive, func,
	manipulator_and_keywords,
	output, primitive_operator,
	ret,
	var_declaration,
	var_using
} from "./generator.js";


const nextChar = (ch) => {
	return String.fromCharCode(ch.charCodeAt(0) + 1);
}

const random_var_declaration = (count_of_variables, lst) => {
	let symbol = 'a'
	for (let i = 0; i < count_of_variables; i++) {
		lst.push(
			var_declaration("int", symbol, Math.floor(Math.random()*200-100))
		)
		symbol = nextChar(symbol);
	}
	return lst
}

const cout_declarations = (count_of_variables, lst) => {
	let symbol = 'a'
	for (let i = 0; i < count_of_variables; i++) {
		lst.push(
			output("std::cout", [var_using(symbol), manipulator_and_keywords("std::endl")])
		)
		symbol = nextChar(symbol);
	}
	return lst;
}

export const random_generator = () => {
	const count_of_variables = Math.ceil(Math.random()*5)
	// console.log(count_of_variables)
	let lst = random_var_declaration(count_of_variables, [])
	lst = cout_declarations(count_of_variables, lst)
	lst.push(ret(0))
	return lst
}

export const division_by_zero_simple = () => {
	let main = []
	main.push(var_declaration("int", "a", 6))
	main.push(var_declaration("int", "b", 0))
	main.push(output("std::cout", [
		primitive_operator("/", var_using("a"), var_using("b")),
		manipulator_and_keywords("std::endl")
	]))
	main.push(ret(0))

	let main2 = []


	let lst = []
	lst.push(directive("include", "<iostream>"))
	lst.push(func("main", [], "int", main))
	return lst
}

