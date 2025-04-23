import {
	call_func,
	delete_operator,
	directive,
	func, manipulator_and_keywords,
	new_operator,
	output, ret,
	unary_operator,
	var_declaration,
	var_using
} from "../generator.js";
import {charNumber, nextChar} from "./utils.js";

const delete_copy = () => {
	const count_of_pointers = Math.floor(Math.random()*4+2);
	let number_of_copy = Math.floor(Math.random()*(count_of_pointers-1)+1)


	if (number_of_copy > count_of_pointers) number_of_copy = count_of_pointers;
	let symbol = 'a'
	let pointers = []
	let couts = []
	let deletes = []

	for (let i = 0; i < count_of_pointers; i++) {
		if (i === number_of_copy){
			pointers.push(
				var_declaration("int*", "p" + symbol,
					var_using("p" + charNumber(i))
				)
			)
		}else {
			pointers.push(
				var_declaration("int*", "p" + symbol,
					new_operator("int", Math.floor(Math.random()*2000-1000))
				)
			)
		}

		couts.push(
			output("std::cout", [
				unary_operator("*", var_using("p" + symbol)),
				manipulator_and_keywords("std::endl")
			])
		)
		deletes.push(
			delete_operator(false, var_using("p" + symbol))
		)
		symbol = nextChar(symbol);
	}

	let main = [...pointers, ...couts, ...deletes]

	main.push(ret(0))

	let lst = []
	lst.push(directive("include", "<iostream>"))
	lst.push(func("main", [], "int", main))
	return lst
}

const static_pointer = () => {
	const count_of_vars = Math.floor(Math.random()*4+2);
	let num_copy = Math.floor(Math.random()*(count_of_vars-1)+1)
	if (num_copy > count_of_vars) num_copy--;
	let vars = []
	let couts = []
	let symbol = 'a'
	let deletes = []
	for (let i = 0; i < count_of_vars; i++) {
		vars.push(
			var_declaration("int", symbol,
				Math.floor(Math.random()*2000-1000)
			)
		)
		couts.push(output("std::cout", [
			var_using(charNumber(i+1)),
			manipulator_and_keywords("std::endl")
		]))
		if (i === num_copy) {
			vars.push(
				var_declaration("int*", "p" + symbol,
					unary_operator("&", var_using(symbol))
				)
			)
			couts.push(output("std::cout", [
				unary_operator("*", var_using("p" + symbol)),
				manipulator_and_keywords("std::endl")
			]))
			deletes.push(
				delete_operator(false, var_using("p" + symbol))
			)
		}
		symbol = nextChar(symbol);
	}


	let main = [...vars, ...couts, ...deletes]

	main.push(ret(0))

	let lst = []
	lst.push(directive("include", "<iostream>"))
	lst.push(func("main", [], "int", main))
	return lst
}

const double_delete = () => {
	
	const count_of_pointers = Math.floor(Math.random()*4+1);
	let number_of_deleting = Math.floor(Math.random()*count_of_pointers+1)

	let funcs = []

	if (number_of_deleting > count_of_pointers) number_of_deleting = count_of_pointers;
	let symbol = 'a'
	let pointers = []
	let calls = []
	let deletes = []
	for (let i = 0; i < count_of_pointers; i++) {
		if (i === number_of_deleting-1){
			funcs.push(func(`func${i+1}`, {
				"pointer": "int*"
			}, "void", [
				output("std::cout", [
					unary_operator("*", var_using("pointer")),
					manipulator_and_keywords("std::endl")
				]),
				delete_operator(false, var_using("pointer"))
			]))
		}else {
			funcs.push(func(`func${i+1}`, {
				"pointer": "int*"
			}, "void", [
				output("std::cout", [
					unary_operator("*", var_using("pointer")),
					manipulator_and_keywords("std::endl")
				])
			]))
		}
		calls.push(call_func(`func${i+1}`, [var_using("p" + symbol)], true))

		pointers.push(
			var_declaration("int*", "p" + symbol,
				new_operator("int", Math.floor(Math.random()*2000-1000))
			)
		)
		deletes.push(delete_operator(false, var_using("p" + symbol)))
		symbol = nextChar(symbol);
	}

	let main = [...pointers, ...calls, ...deletes]

	main.push(ret(0))

	let lst = []
	lst.push(directive("include", "<iostream>"))
	lst = [...lst, ...funcs]
	lst.push(func("main", [], "int", main))
	return lst
}

export const choice_delete_error = (num) => {
	if (num === 1) {
		return double_delete()
	}else if (num === 2){
		return static_pointer()
	}else if (num === 3) {
		return delete_copy()
	}
}