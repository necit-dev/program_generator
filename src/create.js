
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

const print_directive = (elem) => {
	/** Обработка директивы, т.е. его названия и "тела" (параметр "name") */
	return "#" + elem.keyword + " " + elem.value;
}

const print_func = (elem) => {
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

const print_var_assigning = (elem) => {
	/** Обработка присваивания значений переменных */
	return elem.name + " = " + choice(elem.body) + ";"
}

const print_array_declaration = (elem) => {
	const count = elem.count < 1 ? "": String(elem.count)
	let string = elem.value_type + " " + elem.name + "[" + (count) + "]"
	if (Array.isArray(elem.body) && elem.body.length > 0) {
		string += " = {"
		for (let i = 0; i < elem.body.length-1; i++) {
			string += choice(elem.body[i]) + ", ";
		}
		if (elem.body.length > 0) {
			string += choice(elem.body[elem.body.length-1]) + "}";
		}
	}else if (elem.body){
		string += " = " + choice(elem.body);
	}
	string += ";";
	return string;
}

const print_manipulator_and_keywords = (elem) => {
	/** Обработка манипуляторов, таких как std::endl
	 *  Также просто ключевые слова не в виде строки, типа nullptr,
	 *  макросов, если надо будет. */
	return elem.name;
}

const print_output = (elem) => {
	/** Обработка потока вывода, в том числе std::cout */
	let string = elem.name
	elem.body.forEach((element) => {
		string += " << " + choice(element)
	})
	return string + ";"
}

const print_primitive_operator = (elem) => {
	/** Обработка примитивных бинарных арифметических и логических операций (возможно, побитовых)
	* Полный перечень (хотя сейчас это не контролируется):
	* 1) арифметические: + - * / %
	* 2) логические < > <= >= == && || */
	if (elem.withBraces) {
		return "(" + choice(elem.first) + " "
			+ elem.operator + " " + choice(elem.second) + ")"
			+ (elem.semicolon_point? ";": "")
	}else {
		return choice(elem.first) + " " + elem.operator + " " + choice(elem.second)
			+ (elem.semicolon_point? ";": "")
	}
}

const print_returning = (elem) => {
	/** Обработка return */
	return "return " + choice(elem.body) + ";";
}

const print_unary_operator = (elem) => {
	/** Обработка унарных операций. Это:
	 * 1) Инкременты, декременты (++, --)
	 * 2) Унарный минус и логическое НЕ (!)
	 * 3) Взятие адреса (&) и разыменования (*)
	 */
	let pred = elem.operator
	let post = ""
	if (elem.operator === "post++"){
		post = "++"
		pred = ""
	}else if (elem.operator === "post--"){
		post = "--"
		pred = ""
	}
	if (elem.withBraces){
		return "(" + pred + choice(elem.body) + post + ")"
	}else {
		return pred + choice(elem.body) + post + (elem.semicolon_point? ';': '')
	}
}

const print_var_declaration = (elem) => {
	/** Обработка объявления переменных как с присваиванием, так и без */
	if (!elem.body && elem.body !== 0 && elem.body !== "") {
		return elem.value_type + " " + elem.name + (elem.no_semicolon_point? '': ';')
	}
	let string = elem.value_type + " " + elem.name + " = ";
	string += choice(elem.body) + (elem.no_semicolon_point? '': ';')
	return string;
}

const print_loop_for = (elem) => {
	let string = "for (" + choice(elem.iterator) + "; " + choice(elem.condition)
		+ "; " + choice(elem.increment) + ") { \n"
	let tabs = '';
	for (let i = 0; i < elem.inner_curly_braces_count; i++) {
		tabs += '\t'
	}
	for (let i = 0; i < elem.body.length; i++) {
		string += tabs + '\t' + choice(elem.body[i]) + "\n";
	}
	string += tabs + "}"
	return string;
}

const print_condition_if = (elem) => {
	let string = "if (" + choice(elem.condition) + ") { \n"
	let tabs = '';
	for (let i = 0; i < elem.inner_curly_braces_count; i++) {
		tabs += '\t'
	}
	for (let i = 0; i < elem.body.length; i++) {
		string += tabs + '\t' + choice(elem.body[i]) + "\n";
	}
	string += tabs + "}"
	return string;
}

const print_new_operator = (elem) => {
	if (typeof elem.value === "number") {
		return "new " + elem.value_type + "(" + elem.value + ")"
	}else if (Array.isArray(elem.value)) {
		return "new " + elem.value_type + "[" + elem.value[0] + "]"
	}else {
		return "new " + elem.value_type;
	}
}

const print_delete_operator = (elem) => {
	return "delete" + (elem.isArray? "[] ": " ") + choice(elem.body) + ";";
}

const call_func = (elem) => {
	let str = elem.name + "("
	const params = elem.params
	if (params.length > 0) {
		str += choice(params[0]);
	}
	for (let i = 1; i < params.length; i++) {
		str += ", " + choice(params[i]);
	}
	str += ")"
	if (elem.semicolon_point) str += ";"
	return str
}


export const choice = (elem) => {
	if (typeof (elem) === 'number' || typeof (elem) === 'boolean') {
		return elem;
	}else if (typeof elem === 'string') {
		return "\"" + elem + "\""
	}else if (typeof (elem) === 'object' && elem.hasOwnProperty('type')) {

		switch (elem.type){
			case 'directive':
				return print_directive(elem);

			case 'func':
				return print_func(elem)

			case 'call_func':
				return call_func(elem)

			case 'var_declaration':
				return print_var_declaration(elem);

			case 'var_assigning':
				return print_var_assigning(elem);

			case 'var_using':
				return elem.name;

			case 'primitive_operator':
				return print_primitive_operator(elem);

			case 'unary_operator':
				return print_unary_operator(elem);

			case 'output':
				return print_output(elem);

			case 'manipulator_and_keywords':
				return print_manipulator_and_keywords(elem);

			case 'return':
				return print_returning(elem);

			case 'for':
				return print_loop_for(elem);

			case 'if':
				return print_condition_if(elem)

			case 'array_declaration':
				return print_array_declaration(elem)

			case 'new_operator':
				return print_new_operator(elem)

			case 'delete_operator':
				return print_delete_operator(elem)

			default:
				return elem;
		}
	}else return "";
}