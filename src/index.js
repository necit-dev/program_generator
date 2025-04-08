
const var_declaration = (body) => {
	let string = body.value_type + " " + body.name + " = ";
	string += choice(body.body) + ";"
	return string;
}

const choice = (body) => {
	if (typeof (body) === 'number' || typeof (body) === 'string' || typeof (body) === 'boolean') {
		return body;
	}else if (typeof (body) === 'object' && body.hasOwnProperty('type')) {
		switch (body.type){
			case 'var_declaration':
				return var_declaration(body);

			default:
				return body;
		}
	}
}

const obj = {type: 'var_declaration', value_type: "int", name: "a", body: 5};
const obj2 = {type: 'var_declaration', value_type: "int", name: "b", body: 10};

console.log(choice(obj))
console.log(choice(obj2))