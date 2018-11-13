// let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13];
// let array2 = [1, 2, 3, 4];

export default function page(array) {
	if (array.length < 10) {
		return [array];
	}
	return [array.slice(0, 10), ...page(array.slice(11, array.length))];
}
