import {
	array_declaration, call_func,
	condition_if,
	delete_operator,
	directive,
	func, loop_for, manipulator_and_keywords,
	new_operator, output, primitive_operator, ret,
	unary_operator,
	var_assigning,
	var_declaration,
	var_using
} from "../generator.js";
import {charNumber, find_func, nextChar} from "./utils.js";

const null_pointer_function = () => {
	const find_function = find_func

	const array_length = Math.floor(Math.random()*5+3)
	let body_array = []

	for (let i = 0; i < array_length; i++) {
		body_array.push(Math.floor(Math.random()*200-100))
	}

	let random_number = Math.floor(Math.random()*200-100)
	if (body_array.includes(random_number)) random_number = Math.floor(Math.random()*101+100)

	let array = array_declaration("int", "data", -1, body_array)

	let main = [array]

	let count = 0
	let random_digit;
	let random_position = Math.floor(Math.random()*array_length)
	if (random_position >= array_length) random_position--
	for (let i = 0; i < array_length; i++) {
		if (i === random_position) {
			main.push(
				output("std::cout", [
					unary_operator("*",	call_func("find", [
							var_using("data"), array_length, random_number
						]),
					)
					, manipulator_and_keywords("std::endl")
				])
			)
			continue
		}
		if (count === 0 || Math.random() < 0.25){
			random_digit = Math.floor(Math.random()*array_length)
			if (random_digit >= array_length) random_digit = array_length-1;
			main.push(
				output("std::cout", [
					unary_operator("*",	call_func("find", [
							var_using("data"), array_length, body_array[random_digit]
						]),
					)
					, manipulator_and_keywords("std::endl")
				])
			)
			count++
		}

	}
	main.push(ret(0))

	let lst = []
	lst.push(directive("include", "<iostream>"))
	lst.push(find_function)
	lst.push(func("main", [], "int", main))
	return lst
}

const use_pointer_after_delete = () => {
	const count_of_pointers = Math.floor(Math.random()*5+2);
	let number_of_deleting = Math.floor(Math.random()*count_of_pointers+1)

	if (number_of_deleting > count_of_pointers) number_of_deleting = count_of_pointers;
	let symbol = 'a'
	let pointers = []
	let couts = []
	for (let i = 0; i < count_of_pointers; i++) {
		pointers.push(
			var_declaration("int*", "p" + symbol,
				new_operator("int", Math.floor(Math.random()*2000-1000))
			)
		)
		symbol = nextChar(symbol);
	}

	let main = pointers

	if (Math.random() < 0.6) {
		let second_number = Math.floor(Math.random()*count_of_pointers+1)
		if (second_number === number_of_deleting) {
			if (number_of_deleting + 1 > count_of_pointers){
				second_number--
			}else {
				second_number++
			}
		}
		main.push(
			var_assigning("p" + charNumber(second_number), var_using("p" + charNumber(number_of_deleting)))
		)
		couts.push(output("std::cout", [
			unary_operator("*", var_using("p" + charNumber(second_number))),
			manipulator_and_keywords("std::endl")
		]))

	}else {
		couts.push(output("std::cout", [
			unary_operator("*", var_using("p" + charNumber(number_of_deleting))),
			manipulator_and_keywords("std::endl")
		]))
	}
	couts.push(output("std::cout", [
		unary_operator("*", var_using("p" + charNumber(Math.floor(Math.random()*(count_of_pointers-1)+1)))),
		manipulator_and_keywords("std::endl")
	]))
	if (Math.random() < 0.5) {
		couts.push(output("std::cout", [
			unary_operator("*", var_using("p" + charNumber(Math.floor(Math.random()*(count_of_pointers-1)+1)))),
			manipulator_and_keywords("std::endl")
		]))
	}
	main.push(
		delete_operator(false,
			var_using("p" + String.fromCharCode('a'.charCodeAt(0) + (number_of_deleting-1)))
		)
	)

	main = [...main, ...couts]
	main.push(ret(0))

	let lst = []
	lst.push(directive("include", "<iostream>"))
	lst.push(func("main", [], "int", main))
	return lst
}

const not_initialize = () => {
	const count_of_pointers = Math.floor(Math.random()*5+1)
	let number_of_not_initialize = Math.floor(Math.random()*count_of_pointers+1)
	if (number_of_not_initialize > count_of_pointers) number_of_not_initialize = count_of_pointers;
	let symbol = 'a'
	let pointers = []
	let deletes = []
	for (let i = 0; i < count_of_pointers; i++) {
		if (i === number_of_not_initialize-1 || Math.random() < 0.3){
			pointers.push(
				var_declaration("int*", "p" + symbol)
			)
		}else {
			pointers.push(
				var_declaration("int*", "p" + symbol,
					new_operator("int", Math.floor(Math.random()*2000-1000))
				)
			)
			deletes.push(delete_operator(false, var_using("p" + symbol)))
		}
		symbol = nextChar(symbol);
	}
	let main = pointers
	main.push(var_assigning(
		"*p" +  charNumber(number_of_not_initialize),
		Math.floor(Math.random()*2000-1000)
	))
	main.push(output("std::cout", [
		var_using("*p" +  charNumber(number_of_not_initialize))
	]))
	main = [...main, ...deletes]
	main.push(ret(0))
	let lst = []
	lst.push(directive("include", "<iostream>"))
	lst.push(func("main", [], "int", main))
	return lst
}

export const choice_deref_null_pointer = (num) => {
	if (num === 1) {
		return not_initialize()
	}else if (num === 2) {
		return use_pointer_after_delete()
	}else if (num === 3) {
		return null_pointer_function()
	}else {
		const random = Math.random();
		if (random < 0.25){
			return not_initialize()
		}else if (random < 0.55){
			return use_pointer_after_delete()
		}else {
			return null_pointer_function()
		}
	}
}