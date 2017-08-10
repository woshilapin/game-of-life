#[no_mangle]
pub extern "C" fn gol(width: usize, height: usize, array: *mut bool) -> *mut bool {
	unsafe {
		let mut vec_array = vec![false; width*height];
		for y in 0..height {
			for x in 0..width {
				let mut living_neighbours = 0;
				// North neighbour
				if y > 0 && *array.offset(((y-1) * width + x) as isize) {
					living_neighbours = living_neighbours + 1;
				}
				// North-East neighbour
				if y > 0 && x < width - 1 && *array.offset(((y-1) * width + (x+1)) as isize) {
					living_neighbours = living_neighbours + 1;
				}
				// East neighbour
				if x < width - 1 && *array.offset((y * width + x + 1) as isize) {
					living_neighbours = living_neighbours + 1;
				}
				// South-East neighbour
				if y < height - 1 && x < width - 1 && *array.offset(((y+1) * width + (x+1)) as isize) {
					living_neighbours = living_neighbours + 1;
				}
				// South neighbour
				if y < height - 1 && *array.offset(((y+1) * width + x) as isize) {
					living_neighbours = living_neighbours + 1;
				}
				// South-West neighbour
				if y < height - 1 && x > 0 && *array.offset(((y+1) * width + (x-1)) as isize) {
					living_neighbours = living_neighbours + 1;
				}
				// West neighbour
				if x > 0 && *array.offset((y * width + (x-1)) as isize) {
					living_neighbours = living_neighbours + 1;
				}
				// North-West neighbour
				if y > 0 && x > 0 && *array.offset(((y-1) * width + (x-1)) as isize) {
					living_neighbours = living_neighbours + 1;
				}
				// Resolution of the cell
				if *array.offset((y * width + x) as isize) && living_neighbours >= 2 && living_neighbours <= 3 {
					vec_array[y*width + x] = true;
				} else if !*array.offset((y * width + x) as isize) && living_neighbours == 3 {
					vec_array[y*width + x] = true;
				} else {
					vec_array[y*width + x] = false;
				}
			}
		}
		for index in 0..(width*height) {
			*array.offset(index as isize) = vec_array[index];
		}
		array
	}
}

fn main() {}
