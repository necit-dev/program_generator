
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

// const var_using = (body) => {
// 	return body.name
// }

const var_declaration = (elem) => {
	/** Здесь происходит обработка объявления переменных как с присваиванием, так и без */
	if (!elem.body) {
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

			default:
				return elem;
		}

	}
}