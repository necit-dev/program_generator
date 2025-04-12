// const obj = {type: 'var_declaration', value_type: "int", name: "a", body: 5};
export const create_return = (body) => {
	return {
		type: 'return',
		body: body
	}
}

export const create_directive = (keyword, value) => {
	return {
		type: 'directive',
		keyword: keyword,
		value: value
	}
}

export const create_var_declaration = (value_type, name, body) => {
	return {
		type: 'var_declaration',
		value_type: value_type,
		name: name,
		body: body,
	}
}

export const create_var_assigning = (name, body) => {
	return {
		type: 'var_assigning',
		name: name,
		body: body,
	}
}

export const create_var_using = (name) => {
	return {
		type: 'var_using',
		name: name,
	}
}

export const create_output = (name, body) => {
	return {
		type: 'output',
		name: name,
		body: body
	}
}

export const create_manipulator = (name) => {
	return {
		type: 'manipulator',
		name: name
	}
}

export const create_primitive_operator = (operator, first, second) => {
	return {
		type: 'primitive_operator',
		operator: operator,
		first: first,
		second: second
	}
}