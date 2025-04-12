
export const program = (program) => {
	/** Обработка всей программы:
	 *  Представляет собой обработку массива программы. В него входят:
	 *  1) Директивы
	 *  2) Функции (в том числе, main)
	 *  3) using (пока еще не реализовано)
	 * */
	let string = "";
	for (let i = 0; i < program.length; i++) {
		string += choice(program[i]) + "\n\n";
	}
	return string;
}

const directive = (elem) => {
	/** Обработка директивы, т.е. его названия и "тела" (параметр "name") */
	return "#" + elem.keyword + " " + elem.value;
}

const func = (elem) => {
	/** Обработка функции, т.е. возвращаемое значение, параметры, тело функции */
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
	/** Обработка присваивания значений переменных */
	return elem.name + " = " + choice(elem.body) + ";"
}

const manipulator = (elem) => {
	/** Обработка манипуляторов, таких как std::endl */
	return elem.name;
}

const output = (elem) => {
	/** Обработка потока вывода, в том числе std::cout */
	let string = elem.name
	elem.body.forEach((element) => {
		string += " << " + choice(element)
	})
	return string + ";"
}

const primitive_operator = (elem) => {
	/** Обработка примитивных бинарных арифметических и логических операций (возможно, побитовых)
	* Полный перечень (хотя сейчас это не контролируется):
	* 1) арифметические: + - * / %
	* 2) логические < > <= >= == && || */
	 return choice(elem.first) + " " + elem.operator + " " + choice(elem.second)
}

const returning = (elem) => {
	/** Обработка return */
	return "return " + choice(elem.body) + ";";
}

const var_declaration = (elem) => {
	/** Обработка объявления переменных как с присваиванием, так и без */
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