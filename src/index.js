import {program} from "./output.js";

import yargs from "yargs";
import {hideBin} from "yargs/helpers"

import {choice_div_zero_variant} from "./random_generators/div_by_zero.js";
import {choice_deref_null_pointer} from "./random_generators/deref_null_pointer.js";
import {choice_array_out_of_range} from "./random_generators/array_out_of_range.js";
import {choice_delete_error} from "./random_generators/delete_error.js";

// const t0 = performance.now();

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


switch (argv.n) {
	case 1:
		// const t1 = performance.now()
		console.log(program(choice_div_zero_variant(argv.v)));
		// const t2 = performance.now()
		// console.log(t2-t0, "ms");
		// console.log(t2-t1, "ms");
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

// const t1 = performance.now()
// console.log(t1, "ms");

