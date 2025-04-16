// const obj = {type: 'var_declaration', value_type: "int", name: "a", body: 5};
export const create_return = (body) => {
	return {
		type: 'return',
		body
	}
}

export const create_directive = (keyword, value) => {
	return {
		type: 'directive',
		keyword,
		value
	}
}

export const create_var_declaration = (value_type, name, body, no_semicolon_point = false) => {
	return {
		type: 'var_declaration',
		value_type,
		name,
		body,
		no_semicolon_point
	}
}

export const create_var_assigning = (name, body) => {
	return {
		type: 'var_assigning',
		name,
		body,
	}
}

export const create_var_using = (name) => {
	return {
		type: 'var_using',
		name,
	}
}

export const create_output = (name, body) => {
	return {
		type: 'output',
		name,
		body
	}
}

export const create_manipulator = (name) => {
	return {
		type: 'manipulator',
		name
	}
}

export const create_primitive_operator = (operator, first, second, withBraces = false) => {
	return {
		type: 'primitive_operator',
		operator,
		first,
		second,
		withBraces,
	}
}

export const create_unary_operator = (operator, body, withBraces = false, semicolon_point = false) => {
	return {
		type: 'unary_operator',
		operator,
		body,
		withBraces,
		semicolon_point
	}
}

export const create_loop_for = (iterator, condition, increment, body) => {
	return {
		type: "for",
		iterator,
		condition,
		increment,
		body,
	}
}