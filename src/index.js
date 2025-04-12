import {program} from "./create.js";

import {random_generator} from "./random_generator.js";

const obj_func = {
	type: 'func',
	name: "main",
	params: {
		"argc": "int",
		"argv": "char**"
	},
	return_type: "int",
	body: random_generator()
}


const obj_program = [
	{type: "directive", keyword: "include", name: "iostream"},
	obj_func
]


console.log(program(obj_program))

