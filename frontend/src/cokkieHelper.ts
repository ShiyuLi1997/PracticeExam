export function cookieSetter(name: String, value: String) {
	document.cookie = `${name}=${value}; path=/`;
}
export function cookieGetter(name: String) {
	return document.cookie
		.split("; ")
		.find((row) => row.startsWith(`${name}=`))
		?.split("=")[1];
}
