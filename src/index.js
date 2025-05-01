import {choice, program} from "./create.js";

import yargs from "yargs";
import {hideBin} from "yargs/helpers"

import {
 	choice_div_zero_variant
} from "./generators/div_by_zero.js";
import {
	array_declaration,
	directive, func,
	loop_for, manipulator_and_keywords, new_operator, output, binary_operator, ret,
	unary_operator, var_assigning,
	var_declaration,
	var_using
} from "./generator.js";
import {isEmpty, print_array} from "./generators/utils.js";
import {choice_deref_null_pointer} from "./generators/deref_null_pointer.js";
import {choice_array_out_of_range} from "./generators/array_out_of_range.js";
import {choice_delete_error} from "./generators/delete_error.js";

// console.log(program(choice_deref_null_pointer(4)))
// console.log(choice(print_array))

const argv = yargs(hideBin(process.argv))
	.wrap(null)
	.option('num', {
		alias: 'n',
		type: 'number',
		description: "Номер генерации программы:\n" +
			"1 - Ошибка, связанная с делением на 0\n" +
			"2 - Ошибка, связанная с \"висячим\" указателем\n\t(не инициализирован, очищена память)\n" +
			"3 - Ошибка, связанная с выходом за границы массива\n" +
			"4 - Ошибка, связанная с неправильным использованием\n\tоператора \"delete\"\n" +
			"Любое другое число (или не указан параметр)\n\t- выберется случайным образом",
		default: 0
	})
	.option('variant',{
		alias: 'v',
		type: 'number',
		description: "Вариант используемой генерации. В каждом номере\n\tесть несколько вариантов генерации:\n" +
			"num=1:\n\t1 - Ошибка возникает в main\n" +
			"\t2 - Ошибка возникает в другой функции\n" +
			"num=2:\n\t1 - Не инициализирован указатель\n" +
			"\t2 - Использование указателя после \"delete\"\n" +
			"\t3 - Разыменование nullptr\n" +
			"num=3:\n\t1 - Ошибка в цикле\n" +
			"\t2 - Ошибка в функции из-за неверного аргумента\n\t(длины массива)\n" +
			"num=4:\n\t1 - Использование \"delete\" в main после\n\t\"delete\" в другой функции\n" +
			"\t2 - Использование \"delete\" с указателем\n\tна статическую переменную (область памяти)\n" +
			"\t3 - Повторное использование \"delete\" с указателем\n\tна тот же объект\n" +
			"По умолчанию, выбирается случайно",
		default: 0
	})
	.option('max_vars',{
		type: 'number',
		description: "Максимальное количество переменных, функций, указателей\n\tв случайной генерации" +
			" (минимально можно указать 2,\n\tмаксимально - 10)",
		default: 5
	})
	.option('min_vars',{
		type: 'number',
		description: "Максимальное количество переменных, функций, указателей\n\tв случайной генерации" +
			" (минимально можно указать 1,\n\tмаксимально - 10)",
		default: 2
	})

	.help('help')
	.alias('help', ['h', '?'])
	.argv;


// console.log(argv)
// console.log(argv.n)
// console.log(argv.v)

switch (argv.n) {
	case 1:
		console.log(program(choice_div_zero_variant(argv.v)));
		break;
	case 2:
		console.log(program(choice_deref_null_pointer(argv.v)));
		break;
	case 3:
		console.log(program(choice_array_out_of_range(argv.v)));
		break;
	case 4:
		console.log(program(choice_delete_error(argv.v)));
		break;
	default:
		const rand = Math.random();
		if (rand < 0.25) {
			console.log(program(choice_div_zero_variant(argv.v)));
		}else if (rand < 0.5) {
			console.log(program(choice_deref_null_pointer(argv.v)));
		}else if (rand < 0.75) {
			console.log(program(choice_array_out_of_range(argv.v)));
		}else {
			console.log(program(choice_delete_error(argv.v)));
		}
}

