import {create_output, create_return, create_var_declaration, create_var_using} from "./generator.js";


const nextChar = (ch) => {
	return String.fromCharCode(ch.charCodeAt(0) + 1);
}

const random_var_declaration = (count_of_variables, lst) => {
	let symbol = 'a'
	for (let i = 0; i < count_of_variables; i++) {
		lst.push(
			create_var_declaration("int", symbol, Math.floor(Math.random()*200-100))
		)
		symbol = nextChar(symbol);
	}
	return lst
}

const cout_declarations = (count_of_variables, lst) => {
	let symbol = 'a'
	for (let i = 0; i < count_of_variables; i++) {
		lst.push(
			create_output("std::cout", [create_var_using(symbol)])
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
	lst.push(create_return(0))
	return lst
}
