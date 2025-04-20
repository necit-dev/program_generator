import {var_declaration} from "../generator.js";

export const nextChar = (ch) => {
	return String.fromCharCode(ch.charCodeAt(0) + 1);
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