var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const getPrettyDate = (date: string) => {
	date = date.split(' ')[0];
	const newDate = date.split('-');
	const month = months[0];
	return `${month} ${newDate[2]}, ${newDate[0]}`;
}

// Remove the seconds from the time
export const getPrettyTime = (date: string) => {
	const time = date.split(' ')[1].split(':');
	return `${time[0]}:${time[1]}`;
}