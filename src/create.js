
const output = (body) => {
	let string = body.name
	body.body.forEach((element) => {
		string += " << " + choice(element)
	})
	return string + ";"
}

const primitive_operator = (body) => {
	/** Здесь происходит обработка примитивных бинарных арифметических и логических операций (возможно, побитовых)
	* Полный перечень:
	* 1) арифметические: + - * / %
	* 2) логические < > <= >= == && || */
	 return choice(body.first) + " " + body.operator + " " + choice(body.second)
}

// const var_using = (body) => {
// 	return body.name
// }

const var_declaration = (body) => {
	/** Здесь происходит обработка объявления переменных как с присваиванием, так и без */
	if (!body.body) {
		return body.value_type + " " + body.name + ";"
	}
	let string = body.value_type + " " + body.name + " = ";
	string += choice(body.body) + ";"
	return string;
}

export const choice = (body) => {
	if (typeof (body) === 'number' || typeof (body) === 'boolean') {
		return body;
	}else if (typeof body === 'string') {
		return "\"" + body + "\""
	}else if (typeof (body) === 'object' && body.hasOwnProperty('type')) {

		switch (body.type){
			case 'var_declaration':
				return var_declaration(body);

			case "var_using":
				return body.name;

			case "primitive_operator":
				return primitive_operator(body);

			case "output":
				return output(body);

			default:
				return body;
		}

	}
}