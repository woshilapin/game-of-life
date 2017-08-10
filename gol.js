// To know how to give and get back arrays, see the following link
// https://kapadia.github.io/emscripten/2013/09/13/emscripten-pointers-and-pointers.html
let gol = function(array) {
	let size = array.length * array.BYTES_PER_ELEMENT;
	let pointer = Module._malloc(size);
	let heap = new Uint8Array(Module.HEAPU8.buffer, pointer, size);
	heap.set(new Uint8Array(array.buffer, array.byteOffset, size));

	Module.ccall('gol', 'number', ['number', 'number', 'number'], [5, 5, heap.byteOffset]);

	let result = new Uint8Array(heap.buffer, heap.byteOffset, size);
	Module._free(heap.byteOffset);
	return result;
}

jQuery(function ($) {
	let windowWidth = window.innerWidth;
	let windowHeight = window.innerHeight;
	let width = $('#width').val();
	let height = $('#height').val();
	let offsetx = 0.0;
	let offsety = 0.0;
	let unit = 1;
	let draw = function(array) {
		windowWidth = window.innerWidth;
		windowHeight = window.innerHeight;
		width = $('#width').val();
		height = $('#height').val();
		offsetx = 0.0;
		offsety = 0.0;
		if (width / height < windowWidth / windowHeight) {
			unit = windowHeight / height;
			offsetx = (windowWidth - width * unit) / 2.0;
		} else {
			unit = windowWidth / width;
			offsety = (windowHeight - height * unit) / 2.0;
		}

		$('#soup').css({
			width: windowWidth - 2.0 * offsetx,
			height: windowHeight - 2.0 * offsety,
			"margin-top": offsety,
			"margin-left": offsetx
		});
		let canvas = document.getElementById('soup');
		let ctx = canvas.getContext('2d');
		ctx.canvas.width = width * unit;
		ctx.canvas.height = height * unit;

		ctx.lineWidth = unit / 1000;
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				let ox = x * unit;
				let oy = y * unit;
				if (array[y*height + x]) {
					ctx.fillRect(ox, oy, unit, unit);
				} else {
					ctx.strokeRect(ox, oy, unit, unit);
				}
			}
		}
	};

	let array = new Uint8Array([
		true, false, true, false, true,
		false, true, false, true, false,
		true, true, false, false, true,
		false, false, true, true, false,
		true, true, true, false, false
	]);
	let framerate = $('#framerate').val();
	let step = function() {
		array = gol(array);
		draw(array);
	}
	$('#step').on('click', function() {
		step();
	});
	$('#start').on('click', function() {
		$(this).hide();
		$('#stop').show();
		let started = true;
		$('#stop').on('click', function() {
			started = false;
			$('#start').show();
			$('#stop').hide();
		})
		let run = function() {
			step();
			if (started) {
				setTimeout(run, 1000 / framerate);
			}
		}
		run();
	});
	$('#soup').on('click', function(event) {
		let clickx = event.clientX - offsetx;
		let clicky = event.clientY - offsety;
		let x = Math.floor(clickx / unit);
		let y = Math.floor(clicky / unit);
		array[y * height + x] = !array[y * height + x];
		draw(array);
	});
	draw(array);
});
