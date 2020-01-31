module.exports = function parseStringAsArray(arrayAsString){
	return arrayAsString.split(',').map(technologies => technologies.trim());
}