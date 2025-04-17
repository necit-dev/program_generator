// const obj = {type: 'var_declaration', value_type: "int", name: "a", body: 5};
export const create_function = (name, params, return_type, body) => {
	return {
		type: 'func',
		name,
		params,
		return_type,
		body
	}
}

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

export const create_manipulator_and_keywords = (name) => {
	return {
		type: 'manipulator_and_keywords',
		name
	}
}

export const create_primitive_operator = (operator, first, second, withBraces = false, semicolon_point = false) => {
	return {
		type: 'primitive_operator',
		operator,
		first,
		second,
		withBraces,
		semicolon_point
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

export const create_loop_for = (iterator, condition, increment, body, inner_curly_braces_count = 0) => {
	return {
		type: "for",
		iterator,
		condition,
		increment,
		body,
		inner_curly_braces_count,
	}
}

export const create_array_declaration = (value_type, name, count, body) => {
	return {
		type: 'array_declaration',
		value_type,
		name,
		count,
		body
	}
}

export const create_new_operator = (value_type, count = -1) => {
	return {
		value_type,
		count,
	}
}

export const create_delete_operator = (isArray, body) => {
	return {
		isArray,
		body
	}
}