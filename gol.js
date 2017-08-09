let gol = Module.cwrap('gol', 'boolean', ['number', 'number', 'array']);
const width = 5;
let array = [
	true, false, true, false, true,
	false, true, false, true, false,
	true, true, false, false, true,
	false, false, true, true, false,
	true, true, true, false, false
];
let str = "";
// array = gol(5, 5, array);
// console.log('ARRAY', array);
for (let i = 0; i < array.length; i++) {
	if (array[i]) {
		str += "O";
	} else {
		str += "X";
	}
	if ((i+1) % width === 0) {
		str += "\n";
	}
}
console.log(str);
console.log(gol(5, 5, array));
