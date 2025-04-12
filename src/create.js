
export const program = (program) => {
	let string = "";
	for (let i = 0; i < program.length; i++) {
		string += choice(program[i]) + "\n\n";
	}
	return string;
}

const directive = (elem) => {
	return "#" + elem.keyword + " " + elem.name;
}

const func = (elem) => {
	/** Здесь происходит обработка функции, т.е. возвращаемое значение, параметры, тело функции */
	let string = elem.return_type + " " + elem.name + "("
	const params = Object.entries(elem.params)
	if (params.length > 0) {
		string += params[0][1] + " " + params[0][0];
	}
	for (let i = 1; i < params.length; i++) {
		string += ", " + params[i][1] + " " + params[i][0];
	}
	if (!Array.isArray(elem.body)){
		console.error("Body In function must be an array")
		return "Body In function must be an array";
	}
	string += ") {\n";
	for (let i = 0; i < elem.body.length; i++) {
		string += "\t" + choice(elem.body[i]) + "\n";
	}
	string +="}\n";
	return string;

}

const var_assigning = (elem) => {
	/** Здесь происходит обработка присваивания значений переменных */
	return elem.name + " = " + choice(elem.body) + ";"
}

const manipulator = (elem) => {
	/** Здесь происходит обработка манипуляторов, таких как endl */
	return elem.name;
}

const output = (elem) => {
	/** Здесь происходит обработка потока вывода, в том числе cout */
	let string = elem.name
	elem.body.forEach((element) => {
		string += " << " + choice(element)
	})
	return string + ";"
}

const primitive_operator = (elem) => {
	/** Здесь происходит обработка примитивных бинарных арифметических и логических операций (возможно, побитовых)
	* Полный перечень:
	* 1) арифметические: + - * / %
	* 2) логические < > <= >= == && || */
	 return choice(elem.first) + " " + elem.operator + " " + choice(elem.second)
}

const returning = (elem) => {
	return "return " + choice(elem.body) + ";";
}

// const var_using = (body) => {
// 	return body.name
// }

const var_declaration = (elem) => {
	/** Здесь происходит обработка объявления переменных как с присваиванием, так и без */
	if (!elem.body && elem.body !== 0 && elem.body !== "") {
		return elem.value_type + " " + elem.name + ";"
	}
	let string = elem.value_type + " " + elem.name + " = ";
	string += choice(elem.body) + ";"
	return string;
}

export const choice = (elem) => {
	if (typeof (elem) === 'number' || typeof (elem) === 'boolean') {
		return elem;
	}else if (typeof elem === 'string') {
		return "\"" + elem + "\""
	}else if (typeof (elem) === 'object' && elem.hasOwnProperty('type')) {

		switch (elem.type){
			case 'directive':
				return directive(elem);

			case 'func':
				return func(elem)

			case 'var_declaration':
				return var_declaration(elem);

			case 'var_assigning':
				return var_assigning(elem);

			case 'var_using':
				return elem.name;

			case 'primitive_operator':
				return primitive_operator(elem);

			case 'output':
				return output(elem);

			case 'manipulator':
				return manipulator(elem);

			case 'return':
				return returning(elem);

			default:
				return elem;
		}

	}
}