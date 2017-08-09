#[no_mangle]
pub extern "C" fn gol(width: isize, height: isize, array: *const bool) -> bool {
	unsafe {
		//let new_array =
		//for offset in 0..(width*height) {
			//let mut living = 0;
			// North neighbour
			//if (offset)
		//}
		return *array.offset(2*width + 3) as bool;
	}
}

fn main() {}
